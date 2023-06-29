import { Button } from "components/Button/Button";
import { StyledWrap } from "components/Container";
import { Input } from "components/Input/Input";
import { ChangeEvent, useEffect, useState } from "react";
import styled from "styled-components";
import { useSendRecoveryLinkMutation } from "assets/api/password_recovery_api";
import { Modal } from "components/Modal";
import { withFormik } from "formik";
import EmailForm from "components/Forms/EmailForm";
import * as Yup from "yup";

// ///                                           ///   //
// страница восстановления пароля. Пользователь вводит email,
// отправляется запрос на сервер, отображается сообщение
// об отправке ссылки на почту
// ///                                           ///   //

const RecoveryPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isMessageSent, setIsMessageSent] = useState(false);
  const [sendRecoveryLink, result] = useSendRecoveryLinkMutation();

  useEffect(() => {
    console.log(result);
    if (result.data && result.data.status === 204) { // перепроверить правильно работающий ответ от сервера status code
      // нужно будет заменить условие
      setIsModalOpen(true);
      setIsMessageSent(true);
    }
  }, [result]);

  // обработчик нажатия кнопки отправки сообщения на почту
  const handleEmailSend = ({ email }: { email: string }) => {
    sendRecoveryLink(email);
  };

  // обработчик закрытия модального окна
  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  return (
    <StyledPageConatiner>
      <StyledRecoveryPageContainer>
        <StyledTitle>Forgot Password</StyledTitle>
        <EmailForm
          isMessageSent={isMessageSent}
          handleEmailSend={handleEmailSend}
          isModalOpen={isModalOpen}
          handleModalClose={handleModalClose}
        />
        <StyledButtonSecondary onClick={() => null} variant="secondary">
          Back to Sign In
        </StyledButtonSecondary>
      </StyledRecoveryPageContainer>
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




