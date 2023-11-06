import { useState } from 'react'
import {
  Avatar,
  BlockName,
  CellU,
  HeadingTextU,
  SortTable,
  TableHeadingU,
  TableRowU,
  TableU,
  TitleTable,
} from './UnibersalTable.styled'
import { ArrowsSort } from './ArrowsSort'
import { EmptyBlockAdmin, MenuCellAdmin, TextAdmin } from '../../../../features/admin/Admin.styled'
import avatar from '../../../../public/img/icons/avatar.svg'
import block from '../../../../public/img/icons/block_outline.svg'
import { dateParser } from '../../../utils/dateParser'
import { MenuUserTable } from '../../../../features/admin/UserTable/MenuUserTable'

type FormatDataTablePropsType = {
  // formatTableData: TableAdminItemType[] | TableAdminItemType[] | undefined
  formatTableData: unknown[] | undefined
  key: string
  selectedSort: (sortType: string) => void
  tableHeadingData: TableHeaderType[]
}

export type TableHeaderType = {
  avatar?: string
  back: string
  sort: boolean
  tableTitle: string
  text?: string
}
export const UniversalTable = ({
  key,
  formatTableData,
  selectedSort,
  tableHeadingData,
}: FormatDataTablePropsType) => {
  const [sortDirection, setSortDirection] = useState<boolean | undefined>()
  const [sortName, setSortName] = useState<string>()
  const handleClick = (name: TableHeaderType) => {
    selectedSort(name.back)
    setSortName(name.tableTitle)
    setSortDirection(sortDirection === undefined ? true : !sortDirection)
  }

  return (
    <TableU>
      <TableHeadingU>
        {tableHeadingData.map(name => {
          return (
            <HeadingTextU
              key={name.tableTitle}
              onClick={name.sort ? () => handleClick(name) : undefined}
            >
              <TitleTable>
                <p>{name.tableTitle}</p>
                {name.sort && (
                  <SortTable>
                    <ArrowsSort
                      sortDirection={sortName === name.tableTitle ? sortDirection : undefined}
                    />
                  </SortTable>
                )}
              </TitleTable>
            </HeadingTextU>
          )
        })}
      </TableHeadingU>
      {formatTableData &&
        formatTableData.map(pay => (
          <TableRowU key={pay[`${key}`]}>
            {tableHeadingData.map(name =>
              name.back === '' ? (
                <CellU key={pay[`${name}`]}>
                  <BlockName>
                    {name.avatar === 'ban' ? (
                      pay[`${name.avatar}`] ? (
                        <Avatar alt="picture" height={24} src={block} width={24} />
                      ) : (
                        <EmptyBlockAdmin />
                      )
                    ) : (
                      <Avatar
                        alt="picture"
                        height={24}
                        src={pay[`${name.avatar}`] ? pay[`${name.avatar}`] : avatar}
                        width={24}
                      />
                    )}
                    <TextAdmin>{pay[`${name.text}`]}</TextAdmin>
                  </BlockName>
                </CellU>
              ) : name.tableTitle !== '' ? (
                <CellU key={pay[`${name}`]}>
                  {name.tableTitle === 'Date Added'
                    ? dateParser(pay[`${name.back}`])
                    : pay[`${name.back}`]}
                </CellU>
              ) : (
                <MenuCellAdmin>
                  <MenuUserTable ban={pay['ban']} id={pay['id']} userName={pay['login']} />
                </MenuCellAdmin>
              )
            )}
          </TableRowU>
        ))}
    </TableU>
  )
}
