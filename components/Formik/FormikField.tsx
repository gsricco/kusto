import { Field } from "formik"
import styled from "styled-components"
import {baseTheme} from "../../styles/styledComponents/theme";
import {ChangeEvent} from "react";

type FiledProps = {
  id?:string
  type?: string
  border?: string
  name?: string
  value:string
  onChange:(value:string)=>void
}



export const FormikField = (props: FiledProps) => {
  return <StyledField {...props} onChange={(e: ChangeEvent<HTMLInputElement>)=>props.onChange(e.target.value)}/>
}

export const StyledField = styled(Field)
  `
    width: 100%;
    height: 36px;
    padding-left: 8px;
    position: relative;
        
  font-size: 14px;
  
  outline: none;
  border: ${(props) =>
    props.border === "red"
      ? `1px solid ${baseTheme.colors.danger[500]}`
      : `1px solid ${baseTheme.colors.dark[100]}`};
  background: ${baseTheme.colors.dark[500]};
  color: ${baseTheme.colors.light[100]};
  box-shadow: inset 0 0 0 50px ${baseTheme.colors.dark[500]};
  -webkit-text-fill-color: ${baseTheme.colors.light[900]};
 
`