import { useState } from 'react'
import { PaymentsTableType } from 'features/admin/types'
import {
  Cell,
  HeadingText,
  Table,
  TableHeading,
  TableRow,
} from 'styles/styledComponents/payments/payments.styled'

import { SortAdmin, TextAdmin } from '../../../features/admin/Admin.styled'
import { ArrowsAdmin } from '../../../features/admin/UserTable/ArrowsAdmin'
import { dateParser } from '../../utils/dateParser'

const PaymentsTable = ({ payments, selectedSort }: PaymentsTableType) => {
  const tableHeadingData = ['Username', 'Date Added', 'Amount, $', 'Subscription', 'Payment Method']
  const [sortDirection, setSortDirection] = useState<boolean | undefined>()
  const [sortName, setSortName] = useState<string>()

  const handleClick = (name: string) => {
    selectedSort(name)
    setSortName(name)
    setSortDirection(sortDirection === undefined ? true : !sortDirection)
  }

  return (
    <Table style={{ maxWidth: '1024px', width: '100%' }}>
      <TableHeading>
        {tableHeadingData.map(name => {
          return (
            <HeadingText key={name} onClick={() => handleClick(name)}>
              <p>{name}</p>
              <SortAdmin>
                <ArrowsAdmin sortDirection={sortName === name ? sortDirection : undefined} />
              </SortAdmin>
            </HeadingText>
          )
        })}
      </TableHeading>
      {payments?.allPayments.map(pay => (
        <TableRow key={pay.user?.profiles?.login} style={{ padding: '0px' }}>
          <Cell style={{ paddingLeft: '24px' }} title={pay.user?.profiles?.login}>
            <TextAdmin>{pay.user?.profiles?.login}</TextAdmin>
          </Cell>
          <Cell>{dateParser(pay.createdAt)}</Cell>
          <Cell>{pay.price}</Cell>
          <Cell>{pay.subscriptionType}</Cell>
          <Cell>{pay.paymentSystem}</Cell>
        </TableRow>
      ))}
    </Table>
  )
}

export default PaymentsTable
