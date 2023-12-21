import { AllPaymentsResponse } from 'assets/store/api/payments/types'
import { convertCentsToDollars } from 'common/utils/convertCentsToDollars'
import { dateParser } from 'common/utils/dateParser'
import { getSubscriptionType } from 'common/utils/getSubscriptionType'
import { textTransform } from 'common/utils/textTransform'
import { TFunction } from 'i18next'
import {
  Cell,
  HeadingText,
  Table,
  TableHeading,
  TableRow,
} from 'styles/styledComponents/payments/payments.styled'

type TableProps = {
  language: string
  payments: AllPaymentsResponse | undefined
  t: TFunction<'translation', undefined>
}

const PaymentsTable = ({ t, payments, language }: TableProps) => {
  const tableHeadingData = [
    t('date_of_payment'),
    t('end_of_subscription'),
    t('price'),
    t('subscription_type'),
    t('payment_type'),
  ]

  return (
    <Table>
      <TableHeading>
        {tableHeadingData.map((name, index) => (
          <HeadingText key={name} style={{ paddingLeft: index === 0 ? '24px' : '0' }}>
            {name}
          </HeadingText>
        ))}
      </TableHeading>
      {payments &&
        payments?.map(payment => (
          <TableRow key={payment.subscriptionId}>
            <Cell style={{ paddingLeft: '24px' }}>
              {payment.dateOfPayment ? dateParser(payment.dateOfPayment) : '-'}
            </Cell>
            <Cell>
              {payment.endDateOfSubscription ? dateParser(payment.endDateOfSubscription) : '-'}
            </Cell>
            <Cell>{convertCentsToDollars(payment.subscriptionType)}</Cell>
            <Cell>{getSubscriptionType(payment.subscriptionType, language)}</Cell>
            <Cell>{textTransform(payment.paymentType)}</Cell>
          </TableRow>
        ))}
    </Table>
  )
}

export default PaymentsTable
