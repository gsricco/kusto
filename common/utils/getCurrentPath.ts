export const getCurrentPath = (path: string): string => {
  if (path.includes('profile')) {
    return 'profile'
  }
  if (path.includes('search')) {
    return 'search'
  }
  if (path.includes('messenger')) {
    return 'messenger'
  }

  return 'home'
}
