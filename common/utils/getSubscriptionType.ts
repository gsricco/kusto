export const getSubscriptionType = (price: number): string => {
  switch (price) {
    case 200: {
      return '1 Day'
    }
    case 550: {
      return '3 Days'
    }
    case 1000: {
      return '7 Days'
    }
    default: {
      return '1 Month'
    }
  }
}
