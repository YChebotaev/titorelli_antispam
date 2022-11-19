import { Axios } from 'axios'

export class AntispamClient extends Axios {
  private tenantId?: number
  private modelId?: number
  private token?: string

  constructor({
    baseURL,
    tenantId,
    modelId,
    token
  }: {
    baseURL: string
    tenantId?: number
    modelId?: number
    token?: string
  }) {
    super({ baseURL })
    this.tenantId = tenantId
    this.modelId = modelId
    this.token = token
  }

  async predict(
    example: string,
    {
      withConfidence = false,
      withClassifications = false
    }: Partial<{
      withConfidence: boolean,
      withClassifications: boolean
    }> = {},
    tenantId = this.tenantId,
    modelId = this.modelId
  ) {
    const { data } = await this.post<string>(`/tenants/${tenantId}/models/${modelId}/predict`, example, {
      params: {
        withConfidence: withConfidence ? 'true' : undefined,
        withClassifications: withClassifications ? 'true' : undefined
      },
      headers: {
        'Content-type': 'text/plain',
        'Authorization': `Bearer ${this.token}`
      },
    })

    console.log('data =', data)

    return JSON.parse(data) as {
      label: 'spam' | 'ham'
      confidence?: number
      classifications?: {
        label: 'spam' | 'ham'
        value: number
      }[]
    }

    // const { data } = await this.post<{
    //   label: 'spam' | 'ham'
    //   confidence?: number
    //   classifications?: {
    //     label: 'spam' | 'ham'
    //     value: number
    //   }[]
    // }>(`/tenants/${tenantId}/models/${modelId}/predict`, example, {
    //   params: {
    //     withConfidence: withConfidence ? 'true' : undefined,
    //     withClassifications: withClassifications ? 'true' : undefined
    //   },
    //   headers: {
    //     Authorization: `Bearer ${this.token}`
    //   }
    // })

    // return data
  }

  async train(
    {
      text,
      label,
      authorId,
      grantTotem
    }: {
      text: string
      label: 'spam' | 'ham'
      authorId?: number,
      grantTotem?: boolean
    },
    tenantId = this.tenantId,
    modelId = this.modelId
  ) {
    const { data } = await this.post<boolean>(`/tenants/${tenantId}/models/${modelId}/update`, {
      text,
      label,
      authorId,
      grantTotem
    }, {
      headers: {
        'Authorization': `Bearer ${this.token}`
      }
    })

    return data
  }

  async grantTotem(
    authorId: number,
    tenantId = this.tenantId,
    modelId = this.modelId
  ) {
    const { data } = await this.post<boolean>(`/teants/${tenantId}/models/${modelId}/authors/${authorId}/grant_totem`, null, {
      headers: {
        'Authorization': `Bearer ${this.token}`
      }
    })

    return data
  }
}
