export const convertCentsToDollars = (type: string): string => {
  switch (type) {
    case 'DAY': {
      return '$10'
    }
    case 'WEEKLY': {
      return '$50'
    }
    default: {
      return '$100'
    }
  }
}
