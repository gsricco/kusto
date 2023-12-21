export type StripeResponse = {
  url: string
}

export type PaypalResponse = StripeResponse

export type CommonType = {
  productId: string
  quantity: number
}

export type PaypalRequest = CommonType[]
export type StripeRequest = CommonType[]

export type AllSubscriptionsResponse = {
  idProduct: string
  nameSubscription: string
  price: number
}

export type CurrentSubscription = {
  data: Pick<Payment, 'dateOfPayment' | 'endDateOfSubscription' | 'subscriptionId' | 'userId'>[]
  hasAutoRenewal: boolean
}

export type Payment = {
  dateOfPayment: string
  endDateOfSubscription: string
  paymentType: string
  price: number
  subscriptionId: string
  subscriptionType: string
  userId: number
}

export type AllPaymentsResponse = Payment[]

export type ItemsType = {
  dateOfPayments?: string | null | undefined
  endDateOfSubscription?: string | null | undefined
  paymentType: string
  price: number
  subscriptionType: string
}

export type GetUserPaymentsRequest = {
  page: number
  pageSize: number
}

export type SubscribeResponse = {
  url: string
}

export type SubscribeRequest = {
  amount: number
  baseUrl: string
  paymentType: string
  typeSubscription: string
}
