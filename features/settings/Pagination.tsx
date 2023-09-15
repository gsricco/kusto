/* eslint-disable no-magic-numbers */
import { FC, useState } from 'react'

import { ThemeProvider } from '@emotion/react'
import { FormControl, Select, MenuItem, SelectChangeEvent } from '@mui/material'
import Image from 'next/image'
import { styled } from 'styled-components'
import { baseTheme } from 'styles/styledComponents/theme'

import next from '../../public/img/icons/nextOut.svg'
import prev from '../../public/img/icons/prevOut.svg'

import { theme } from './themeSelect'

// Creating a bar of page numbers with limits from the left and right sides
const PagesNavigation: FC<PropsType> = ({
  pagesCount,
  pageNumber,
  pageSize,
  onPageChange,
  onPageSizeChange,
}) => {
  const [isLast, setIsLast] = useState(false)
  const [isFirst, setIsFirst] = useState(true)

  const [firstPageInLine, setFirstPageInLine] = useState(1)

  const handleChange = (event: SelectChangeEvent) => {
    onPageSizeChange(Number(event.target.value))
  }

  const pages: Array<number> = []

  if (pagesCount <= 6 && !isLast) {
    setIsLast(true)
  }

  const onPageNext = (firstPage: number) => {
    setIsFirst(false)
    if (firstPage + 5 >= pagesCount) {
      setIsLast(true)
    }
    if (firstPage < pagesCount) {
      setFirstPageInLine(firstPage)
    }
  }
  const onPagePrev = (firstPage: number) => {
    setIsLast(false)
    setFirstPageInLine(firstPage)

    if (firstPage === 1) {
      setIsFirst(true)
    }
  }

  for (let i = firstPageInLine; i < pagesCount && i <= firstPageInLine + 4; i++) {
    pages.push(i)
  }

  return (
    <StyledPagination>
      <StyledArrow
        alt="prev"
        isHidden={isFirst}
        src={prev}
        style={{ height: 16, width: 16 }}
        onClick={() => {
          onPagePrev(firstPageInLine - 4)
        }}
      />
      {pages.map(p => {
        return (
          <StyledPageNumber
            key={p}
            isActive={p === pageNumber}
            onClick={() => {
              onPageChange(p)
            }}
          >
            {p}
          </StyledPageNumber>
        )
      })}
      {!isLast && <StyledText>...</StyledText>}
      <StyledPageNumber
        isActive={pagesCount === pageNumber}
        onClick={() => {
          onPageChange(pagesCount)
        }}
      >
        {pagesCount}
      </StyledPageNumber>

      <StyledArrow
        alt="next"
        isHidden={isLast}
        src={next}
        style={{ height: 16, width: 16 }}
        onClick={() => {
          onPageNext(firstPageInLine + 4)
        }}
      />
      <StyledText>Show</StyledText>
      <ThemeProvider theme={theme}>
        <FormControl size="small" sx={{ m: 1 }}>
          <Select id="pageSize" value={pageSize.toString()} onChange={handleChange}>
            <MenuItem value={10}>10</MenuItem>
            <MenuItem value={20}>20</MenuItem>
            <MenuItem value={30}>30</MenuItem>
          </Select>
        </FormControl>
      </ThemeProvider>

      <StyledText>on page</StyledText>
    </StyledPagination>
  )
}

export default PagesNavigation

// Types

type PropsType = {
  onPageChange: (pageNum: number) => void
  onPageSizeChange: (pageSize: number) => void
  pageNumber: number
  pageSize: number
  pagesCount: number
}

type DivPropsType = {
  isActive: boolean
}

type ImagePropsType = {
  isHidden: boolean
}

// Style
const StyledPageNumber = styled.div<DivPropsType>`
  width: 22px;
  height: 22px;

  margin: 6px;
  border: 1px solid ${baseTheme.colors.light['100']};

  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
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
  align-items: center;
`
const StyledText = styled.div`
  margin: 6px;
`
const StyledArrow = styled(Image)<ImagePropsType>`
  cursor: pointer;
  margin: auto 0px;
  z-index: 10;
  visibility: ${props => (props.isHidden ? 'hidden' : '')};
`
