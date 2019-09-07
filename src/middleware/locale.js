import store from '@/store'
import { loadPageMessages } from '@/lang'

export default async (to, from, next) => {
  await loadPageMessages(store.getters['lang/locale'], to)
  next()
}
