import { Trie } from '../Trie'
import { Model } from './Model'

class PoolItem {
  constructor(private model: Model) { }

  get() {
    return this.model
  }
}

export class Pool {
  private items = new Trie<[number, number], PoolItem>

  async get<Identity extends [number, number]>(...identity: Identity) {
    const item = this.items.find(identity)

    if (item) return item.get()

    return this.create(identity[0], identity[1]).get()
  }

  private create(tenantId: number, modelId: number) {
    const model = new Model({ tenantId, modelId })
    const item = new PoolItem(model)

    this.items.insert([tenantId, modelId], item)

    return item
  }
}
