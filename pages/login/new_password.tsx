import { usePostRecoveryLinkMutation } from "assets/api/password_recovery_api";
import NewPasswordForm from "components/Forms/NewPasswodForm";
import { Modal } from "components/Modal";
import { withFormik } from "formik"
import { useState } from "react";
import * as Yup from 'yup'; 


const NewPassword = () => {

    const [newPassword, setNewPassword] = useState('')
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [trigger, result] = usePostRecoveryLinkMutation()

    const recoveryCode = 'gdhd5swtsy8'

    const handleModalClose = () => {
        setIsModalOpen(false)
    }

    const handleCreateNewPassword = () => {
        console.log(newPassword, recoveryCode);
        trigger(newPassword, recoveryCode);
        console.log(result)
          // !!! нужно переопределить условие по данным, получаемым от сервера
        if (true) { // открытие информационного модального окна
          setIsModalOpen(true);
        }
    }

    return <div>
        <div>Create New password</div>
        <NewPasswordFormWithFormik handleCreateNewPassword={handleCreateNewPassword} setNewPassword={setNewPassword}/>
        {isModalOpen && (
        <Modal
          title="Email Sent"
          bodyText={`Email veritication link is invalid`}
          handleModalClose={handleModalClose}
        ></Modal>
      )}

    </div>
}

export default NewPassword

const NewPasswordFormWithFormik  = withFormik<MyFormPropsType & OtherPropsType, FormValuesType> ({
    mapPropsToValues ({newPassword, passwordConfirm}) {
        return {
            newPassword: newPassword || '',
            passwordConfirm: passwordConfirm || '',
        }
    },
    validationSchema: Yup.object().shape({
        newPassword: Yup.string().required('Password is required'),
        passwordConfirm: Yup.string().required('Password confirmation is required').oneOf([Yup.ref('password')], 'Passwords must match')
    }),
    handleSubmit (values: FormValuesType, {props, setStatus, setSubmitting, ...actions}) {
      props.setNewPassword(values.newPassword)
      setSubmitting(false);       
    }
  })(NewPasswordForm)
  
  // Types for the form
  
  export type FormValuesType = {    // all the values that we’re going to have in our form
    newPassword: string
    passwordConfirm: string
  }
  type MyFormPropsType = {  // to define some properties for our initial values
    newPassword?: string | undefined
    passwordConfirm?: string | undefined
  }
  export type OtherPropsType = {    // to pass other props to our component
    // isMessageSent: boolean
    // email: string
    handleCreateNewPassword: () => void
    setNewPassword: (newPassword: string) => void
  }