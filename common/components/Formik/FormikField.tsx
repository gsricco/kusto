import { ChangeEvent } from 'react'

import { FieldTextarea } from './FieldTextarea'
import { StyledField } from './Formik.styled'
import { FiledProps } from './types'

export const FormikField = (props: FiledProps) => {
  return props.type !== 'textarea' ? (
    <StyledField
      {...props}
      width={props.width}
      onChange={(e: ChangeEvent<HTMLInputElement>) => props.onChange(e.target.value)}
    />
  ) : (
    <FieldTextarea
      {...props}
      value={props.value}
      width={props.width}
      onChange={e => props.onChange(e.target.value)}
    />
  )
}
