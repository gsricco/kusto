import { ChangeEvent } from 'react'

import { StyledTextArea } from './Formik.styled'
import { TextAreaPropsType } from './types'

export const FieldTextarea = (props: TextAreaPropsType) => {
  return (
    <StyledTextArea
      value={props.value}
      width={props.width}
      onChange={(e: ChangeEvent<HTMLTextAreaElement>) => props.onChange(e)}
    />
  )
}
