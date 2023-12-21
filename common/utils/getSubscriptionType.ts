export const getSubscriptionType = (type: string, language: string): string => {
  switch (type) {
    case 'DAY': {
      return language === 'en' ? '1 Day' : '1 День'
    }
    case 'WEEKLY': {
      return language === 'en' ? '7 Days' : '7 Дней'
    }
    default: {
      return language === 'en' ? '1 Month' : '1 Месяц'
    }
  }
}
