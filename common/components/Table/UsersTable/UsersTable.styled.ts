import { Cell, HeadingText } from '../../../../styles/styledComponents/payments/payments.styled'
import Image from 'next/image'
import { styled } from 'styled-components'

export const HeadingWithSort = styled(HeadingText)`
  display: flex;
  align-items: center;
  gap: 5px;
`

export const Sort = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`
export const SelectSortDirection = styled(Image)`
  cursor: pointer;
`

export const MenuCell = styled(Cell)`
  min-width: 30px;
  display: flex;
  justify-content: center;
`
export const EmptyBlock = styled.span`
  width: 24px;
  height: 24px;
  display: inline-block;
`

export const UserMenu = styled.div`
  position: relative;
  color: white;
`
export const MenuItemWrapper = styled.span`
  width: 178px;
  display: flex;
  padding: 0 12px;
  cursor: pointer;
`

export const More = styled(Image)`
  cursor: pointer;
`
export const Block = styled(Image)`
  margin-bottom: -6px;
`

export const Text = styled.span`
  font-size: 14px;
  font-weight: 400;
  position: relative;
  left: 10px;
`

export const MenuItems = styled.div`
  position: absolute;
  padding: 12px 10px 12px 0;
  right: 0;
  z-index: 10;
  background: #171717;
  border: 1px solid #4c4c4c;
  display: flex;
  flex-direction: column;
  gap: 12px;
`

export const MenuIcon = styled(Image)``
