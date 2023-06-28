import React from 'react';
import {getLayout} from "../../components/Layout/BaseLayout/BaseLayout";
import {Button, ThemeButton} from "../../components/Button/ui/Button";
import {WrapperContainerAuth} from "../../components/Wrappers/Auth/WrapperContainerAuth";
import {Formik} from "formik";
import {validateLogin} from "../../utils/validateLogin";
import {LoginType} from "@/types/FormikTypes";
import LoginForm from "../../components/LoginForm/LoginForm";
import AuthIcons from "../../components/Wrappers/Auth/AuthIcons";
import {StyledContainerAuth} from "../../styles/styledComponents/auth/ContainerAuth.styled";


const Login = () => {

  return (
    <StyledContainerAuth>
      <WrapperContainerAuth title={'Sing In'}>
        <AuthIcons/>
        <Formik
          initialValues={{loginOrEmail: '', password: ''} as LoginType}
          validationSchema={validateLogin}
          onSubmit={values => alert('submit')}
        >
          {formik => <LoginForm formik={formik}/>}
        </Formik>
        <div>
          <Button theme={ThemeButton.PRIMARY} type={'submit'}>Log In</Button>
        </div>
      </WrapperContainerAuth>
    </StyledContainerAuth>
  );
};

Login.getLayout = getLayout
export default Login;




