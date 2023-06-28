import { Button } from "components/Button/Button";
import { Form, Field, FormikProps } from "formik";
import { OtherPropsType,  FormValuesType} from "pages/login/recovery";
import styled from "styled-components";

const EmailForm = ({ errors, ...props }: OtherPropsType & FormikProps<FormValuesType>) => {
    return (
        <Form>
        <div>
            <Field name='email' type='text' placeholder='email' />
            {errors.email && <div>{errors.email}</div>}
        </div>
      {props.isMessageSent && (
        <StyledText>We have sent a link to confirm your email to {props.email}</StyledText>
      )}

      <Button type='submit' onClick={props.handleEmailSend}>
        {props.isMessageSent ? "Send Link Again" : "Send Link"}
      </Button>
      </Form>
    ) 
}

export default EmailForm;

const StyledText = styled.div`
  color: #fff;
  font-size: 14px;
  font-family: Inter;
  line-height: 24px;
  margin-bottom: 18px;
`;