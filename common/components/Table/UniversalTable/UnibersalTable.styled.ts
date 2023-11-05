import { styled } from 'styled-components'
import Image from 'next/image'

export const TableU = styled.table`
  maxwidth: 1024px;
  width: 100%;
  border-collapse: collapse;
  padding: 0 24px;
`
export const TableHeadingU = styled.tr`
  background: #171717;
`
export const HeadingTextU = styled.td`
  padding: 12px 0;
  font-weight: 600;
  margin: auto;
`
export const SortTable = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`
export const SelectSortDirection = styled(Image)`
  cursor: pointer;
`
export const TitleTable = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  & p {
    margin-right: 5px;
  }
`
export const TableRowU = styled.tr`
  border: 1px solid #171717;
`
export const Avatar = styled(Image)`
  border-radius: 50%;
`
export const BlockName = styled.div`
  display: flex;
  justify-content: flex-start;
  padding: 0 24px;
  max-width: 300px;
  white-space: nowrap; /* Запрещаем перенос строк */
  overflow: hidden; /* Обрезаем все, что не помещается в область */
  text-overflow: ellipsis; /* Добавляем многоточие */
`
export const CellU = styled.td`
  text-align: center;
  min-width: 60px;
  height: 60px;
  padding: 12px 0;
  font-weight: 400;
`
