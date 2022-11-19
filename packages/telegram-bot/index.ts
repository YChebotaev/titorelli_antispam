import { Telegraf } from 'telegraf'
import { createClient } from '@titorelli_antispam/antispam-client'
import { createCallbackData, updateCallbackDataById, getCallbackDataById } from './lib/repositories'
import type { User } from 'telegraf/types'

export type CallbackDataJSON = {
  orig_message_id: number,
  orig_message_text: string,
  orig_message_from: User,
  text_label: 'spam' | 'ham',
  ensure_spam_message_id?: number
}

const botToken = process.env['BOT_TOKEN']
const bot = new Telegraf(botToken!)
const titorelliClient = createClient('http://localhost:3000', 0, 0, '--dummy-token--')

bot.use(async (ctx) => {
  if ('message' in ctx.update && 'text' in ctx.update.message) {
    const { text, message_id, from } = ctx.update.message

    const { label, confidence } = await titorelliClient.predict(text, {
      withConfidence: true
    })

    // console.table({ text, label, confidence })

    if (label === 'spam') {
      if (confidence! < 0.5) {
        const spamCallbackDataId = await createCallbackData<CallbackDataJSON>({
          orig_message_id: message_id,
          orig_message_from: from,
          orig_message_text: text,
          text_label: 'spam',
        })
        const hamCallbackDataId = await createCallbackData<CallbackDataJSON>({
          orig_message_id: message_id,
          orig_message_text: text,
          orig_message_from: from,
          text_label: 'ham'
        })

        const { message_id: ensure_spam_message_id } = await ctx.reply(
          'Это спам?',
          {
            reply_to_message_id: message_id,
            reply_markup: {
              inline_keyboard: [
                [
                  {
                    text: 'Да, это спам',
                    callback_data: spamCallbackDataId.toString()
                  },
                  {
                    text: 'Нет, это не спам',
                    callback_data: hamCallbackDataId.toString()
                  }
                ]
              ]
            }
          }
        )

        await updateCallbackDataById<CallbackDataJSON>(spamCallbackDataId, { ensure_spam_message_id })
        await updateCallbackDataById<CallbackDataJSON>(hamCallbackDataId, { ensure_spam_message_id })
      }

      await ctx.deleteMessage(message_id)
    } else {
      titorelliClient.grantTotem(from.id)
    }
  } else if ('callback_query' in ctx.update) {
    const { data } = ctx.update.callback_query
    const {
      orig_message_id,
      orig_message_text,
      text_label,
      orig_message_from,
      ensure_spam_message_id
    } = await getCallbackDataById<CallbackDataJSON>(Number(data))

    if (orig_message_from.id === ctx.update.callback_query.from.id) return // Spammers cannot vote for themselves

    await ctx.deleteMessage(ensure_spam_message_id!)

    await titorelliClient.train({
      text: orig_message_text,
      label: text_label,
      authorId: orig_message_from.id,
      grantTotem: true
    })

    if (text_label === 'spam') {
      await ctx.deleteMessage(orig_message_id)
    }
  }
})

bot.launch()
