export const dateParser = (str: number | string | 'UserModel' | null | undefined): string => {
  if (str === null || str === undefined) {
    return '-'
  }
  const date = new Date(str)

  return date.toLocaleString().split(',')[0]
}
