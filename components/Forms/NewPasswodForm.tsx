import { Button } from "components/Button/Button";
import { Field, Form, FormikProps } from "formik";
import { FormValuesType, OtherPropsType } from "pages/login/new_password";
import styled from "styled-components";

const NewPasswordForm = ({ errors, ...props }: OtherPropsType & FormikProps<FormValuesType>) => {
    return (
        <Form>
            <div>
                <Field name='newPassword' type='text' placeholder='New Password' />
            </div>
            <div>
                <Field name='passwordConfirm' type='text' placeholder='Password Confirmation' />
                {errors.passwordConfirm && <div>{errors.passwordConfirm}</div>}
            </div>
                <Button type='submit' onClick={props.handleCreateNewPassword}>
                    Create new password
                </Button>
        </Form>
    ) 
}

export default NewPasswordForm;

const StyledText = styled.div`
  color: #fff;
  font-size: 14px;
  font-family: Inter;
  line-height: 24px;
  margin-bottom: 18px;
`;