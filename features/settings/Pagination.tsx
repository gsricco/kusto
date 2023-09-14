/* eslint-disable no-magic-numbers */
import { FC, useState } from 'react'

import { styled } from 'styled-components'
import { baseTheme } from 'styles/styledComponents/theme'

// Creating a bar of page numbers with limits from the left and right sides
const PagesNavigation: FC<PropsType> = ({ pagesCount, pageNumber, onPageChange }) => {
  const [isLast, setIsLast] = useState(false)
  const [firstPageInLine, setFirstPageInLine] = useState(1)
  // calculat and round the total amount of pages and create an array of all page numbers
  //   const pagesCount = Math.ceil(totalPaymentsCount / pageSize)
  const pages: Array<number> = []

  //   for (let i = 1; i <= pagesCount; i++) {
  //     pages.push(i)
  //   }

  // show 9 page numbers in the bar in accordance to the current one (+/- 4)
  //   const curPage = pageNumber
  //   const curPageFirst = curPage - 5 < 0 ? 0 : curPage - 5 // first number of the bar
  //   const curPageLast = curPage + 4 // last number of the bar
  //   const slicedPages = pages.slice(curPageFirst, curPageLast)

  const onPageNext = (firstPage: number) => {
    setFirstPageInLine(firstPage)
    if (firstPage + 5 >= pagesCount) {
      setIsLast(true)
    }
  }
  const onPagePrev = (firstPage: number) => {
    setIsLast(false)
    if (!(firstPage < 1)) {
      setFirstPageInLine(firstPage)
    }
  }

  for (let i = firstPageInLine; i < pagesCount && i <= firstPageInLine + 4; i++) {
    pages.push(i)
  }

  //   const slicedPages = pages.slice(curPageFirst, curPageLast)

  return (
    <StyledPagination>
      <StyledArrows
        onClick={() => {
          onPagePrev(firstPageInLine - 4)
        }}
      >
        prev
      </StyledArrows>
      {pages.map(p => {
        return (
          <StyledPageNumber
            key={p}
            isActive={p === pageNumber}
            // className={p === pageNumber ? s.selectedPage : s.ordinaryPage}
            onClick={() => {
              onPageChange(p)
            }}
          >
            {p}
          </StyledPageNumber>
        )
      })}
      {!isLast && <StyledDots>...</StyledDots>}
      <StyledPageNumber
        isActive={pagesCount === pageNumber}
        onClick={() => {
          onPageChange(pagesCount)
        }}
      >
        {pagesCount}
      </StyledPageNumber>

      <StyledArrows
        onClick={() => {
          onPageNext(firstPageInLine + 4)
        }}
      >
        next
      </StyledArrows>
    </StyledPagination>
  )
}

export default PagesNavigation

// Types

type PropsType = {
  onPageChange: (pageNum: number) => void
  pageNumber: number
  pagesCount: number
}

type DivPropsType = {
  isActive: boolean
}

const StyledPageNumber = styled.div<DivPropsType>`
  width: 22px;
  height: 22px;

  margin: 6px;
  border: 1px solid ${baseTheme.colors.light['100']};
  display: flex;
  justify-content: center;
  align-items: center;

  color: ${baseTheme.colors.light['100']};
  ${props =>
    props.isActive &&
    `
    background: ${baseTheme.colors.light['100']};
    color: ${baseTheme.colors.dark['900']}
  
  `}
`
const StyledPagination = styled.div`
  padding: 10px;
  display: flex;
`
const StyledDots = styled.div`
  margin: 6px;
`
const StyledArrows = styled.div`
  margin: 6px;
`
