import { useSessionStorage } from './useSessionStorage'

export const useIsAdmin = () => {
  const { getItem } = useSessionStorage()

  const token = getItem('adminToken')

  if (token === 'admin') {
    return true
  }

  return false
}
