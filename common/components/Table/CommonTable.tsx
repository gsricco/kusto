import React from 'react'
import { AllPaymentsResponse } from 'assets/store/api/payments/types'
import { convertCentsToDollars } from 'common/utils/convertCentsToDollars'
import { dateParser } from 'common/utils/dateParser'
import { getSubscriptionType } from 'common/utils/getSubscriptionType'
import { TFunction } from 'i18next'
import {
  Cell,
  HeadingText,
  Table,
  TableHeading,
  TableRow,
} from 'styles/styledComponents/payments/payments.styled'

type TableProps = {
  cellParses: CellParsers
  tableData: TableRow[]
  tableHeadingData: Array<string> | []
}

interface TableRow {
  [key: string]: string
}

interface CellParsers {
  [key: string]: (value: string) => React.ReactNode
}

const CommonTable = ({ cellParses, tableData, tableHeadingData }: TableProps) => {
  return (
    <Table>
      <TableHeading>
        {tableHeadingData.map((name, index) => (
          <HeadingText key={name} style={{ paddingLeft: index === 0 ? '24px' : '0' }}>
            {name}
          </HeadingText>
        ))}
      </TableHeading>
      <tbody>
        {tableData.map((item, index) => (
          <TableRow key={item.id}>
            {(Object.keys(item) as Array<keyof typeof item>).map(key => (
              <Cell key={key} style={{ paddingLeft: '24px' }}>
                {cellParses[key](item[key])}
              </Cell>
            ))}
          </TableRow>
        ))}
      </tbody>
    </Table>
  )
}

export default CommonTable
