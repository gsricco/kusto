import React from 'react'

import { ThemeProvider } from '@emotion/react'
import { DatePicker } from '@mui/x-date-pickers'
import { theme } from 'common/components/Calendar/theme'
import dayjs from 'dayjs'
import customParseFormat from 'dayjs/plugin/customParseFormat'
import { Field, FormikErrors } from 'formik'
import { TFunction } from 'next-i18next'

import { StyledErrorMsg, StyledTitle } from '../Formik/Formik.styled'
import { FormikAllValuesType } from '../Formik/types'

import { themeError } from './themeError'

export type CalendarProps = {
  date: string
  errors?: string | undefined
  setFieldValue: (field: string, value: unknown) => void
  t: TFunction
  touched?: boolean | undefined
}

const Calendar = ({ date, setFieldValue, errors, touched, t }: CalendarProps) => {
  dayjs.extend(customParseFormat)
  let birthDate = dayjs()

  if (date) {
    birthDate = dayjs(date, 'DD-MM-YYYY')
  }

  return (
    <>
      <StyledTitle>
        <span>{t('date_of_birthday')}</span>
      </StyledTitle>
      <ThemeProvider theme={errors && touched ? themeError : theme}>
        <DatePicker
          disableFuture
          format="DD/MM/YYYY"
          value={birthDate}
          onChange={newValue => {
            const date = newValue?.format('DD/MM/YYYY')

            setFieldValue('birthday', date)
          }}
        />
      </ThemeProvider>
    </>
  )
}

export default Calendar
