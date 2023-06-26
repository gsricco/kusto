import { Button } from "components/Button/Button";
import { StyledWrap } from "components/Container";
import { Input } from "components/Input/Input";
import { ChangeEvent, useEffect, useState } from "react";
import styled from "styled-components";
import {
  passwordRecoveryApi,
  useGetIsEmailMutation,
} from "assets/api/password_recovery_api";
import { Modal } from "components/Modal";
import { withFormik } from "formik";
import EmailForm from "components/Forms/EmailForm";
import * as Yup from 'yup'; 


// ///                                           ///   //
// страница восстановления пароля. Пользователь вводит email, 
// отправляется запрос на сервер, отображается сообщение 
// об отправке ссылки на почту
// ///                                           ///   //

const RecoveryPage = () => {
  const [email, setEmail] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isMessageSent, setIsMessageSent] = useState(false);
  const [trigger, result] = useGetIsEmailMutation()
  
  // useEffect(() => {
  //   if (result.status = 'rejected') { // нужно будет заменить условие
  //     setIsModalOpen(true);
  //     setIsMessageSent(true);
  //   }
  // }, [result]);

  // обработчик ввода данных в поле email
  const handleEmailChange = (event: ChangeEvent<HTMLInputElement>) => {
    setEmail(event.currentTarget.value);
  };

  // обработчик нажатия кнопки отправки сообщения на почту
  const handleEmailSend = () => {
    trigger(email);
    console.log(result)
      // !!! нужно переопределить условие
    if (result.status == "rejected") { // открытие информационного модального окна
      setIsModalOpen(true);
      setIsMessageSent(true);
    }
  };

  // обработчик закрытия модального окна
  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  return (
    <StyledPageConatiner>
      <StyledRecoveryPageContainer>
        <StyledTitle>Forgot Password</StyledTitle>
        <EmailFormFormik setEmail={setEmail} isMessageSent={isMessageSent} email={email} handleEmailSend={handleEmailSend}/>
   
        {/* <Input
          onChange={handleEmailChange}
          labelText="Email"
          hintText="Enter your email address and we will send you further instructions"
          value={email}
          type="email"
        /> */}
        {/* {isMessageSent && (
          <StyledText>We have sent a link to confirm your email to {email}</StyledText>
        )}

        <Button onClick={handleEmailSend}>
          <button type='submit'>{isMessageSent ? "Send Link Again" : "Send Link"}</button>
        </Button> */}

        <StyledButtonSecondary onClick={() => null} variant="secondary">
          Back to Sign In
        </StyledButtonSecondary>
      </StyledRecoveryPageContainer>
      {isModalOpen && (
        <Modal
          title="Email Sent"
          bodyText={`We have sent a link to confirm your email to ${email}`}
          handleModalClose={handleModalClose}
        ></Modal>
      )}
    </StyledPageConatiner>
  );
};

export default RecoveryPage;

// стили
const StyledPageConatiner = styled(StyledWrap)`
  background: #000;
`;

const StyledRecoveryPageContainer = styled.div`
  background: #171717;
  width: 378px;
  height: 456px;
  display: flex;
  flex-direction: column;
  align-items: center;
  flex-shrink: 0;
  padding: 24px;
  border: 2px solid #333333;
  border-radius: 2px;
`;

const StyledButtonSecondary = styled(Button)`
  margin-top: 24px;
`;

const StyledTitle = styled.h1`
  color: #fff;
  font-size: 20px;
  font-family: Inter;
  font-weight: 700;
  line-height: 36px;
  margin-bottom: 37px;
`;

// const StyledText = styled.div`
//   color: #fff;
//   font-size: 14px;
//   font-family: Inter;
//   line-height: 24px;
//   margin-bottom: 18px;
// `;



const EmailFormFormik  = withFormik<MyFormPropsType & OtherPropsType, FormValuesType> ({
  mapPropsToValues ({email}) {
      return {
          email: email || '',
      }
  },
  validationSchema: Yup.object().shape({
      email: Yup.string().email().max(50, 'Max length is 50 simbols.').required('Required'),
  }),
  handleSubmit (values: FormValuesType, {props, setStatus, setSubmitting, ...actions}) {
    props.setEmail(values.email)
      // props.login(values.email, values.password, values.rememberMe, values.captcha, setStatus)
      setSubmitting(false);       
  }
})(EmailForm)

// Types for the form

export type FormValuesType = {    // all the values that we’re going to have in our form
  email: string
}
type MyFormPropsType = {  // to define some properties for our initial values
  email?: string | undefined
}
export type OtherPropsType = {    // to pass other props to our component
  isMessageSent: boolean
  email: string
  handleEmailSend: () => void
  setEmail: (email: string) => void
}