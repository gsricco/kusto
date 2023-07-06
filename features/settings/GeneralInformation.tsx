import React from 'react';
import {Button, ThemeButton} from '../../common/components/Button/Button';
import {Formik} from 'formik';
import {validateProfile} from '../../common/utils/validateProfile';
import {FormikLabel} from '../../common/components/Formik/FormikLabel';
import styled from 'styled-components';
import {baseTheme} from '../../styles/styledComponents/theme';
import {StyledAuthForm} from '../../styles/styledComponents/auth/FormikAuth.styled';
import {useRouter} from 'next/router';
import {useSetProfileMutation} from '../../assets/store/api/auth/authApi';
import {FormValueProfile, ResetForm} from '../../common/components/Formik/types';

export const GeneralInformation = () => {

  // const serverAvatar:string = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSk4kkpSJ586hYNP7WOnZ9eQ3_KrPh2GLMBOg&usqp=CAU'
  const serverAvatar: string = ''
  const avatar = serverAvatar !== '' ? serverAvatar : '/icons/avatar.svg'

  const router = useRouter()
  const {login} = router.query


  const initialAuthValues = {
    username: login as string,
    firstname: '',
    lastname: '',
    birthday: '',
    city: '',
    aboutMe: ''
  }

  const [setProfileHandler] = useSetProfileMutation()


  const handleSubmit = async (values: FormValueProfile, {resetForm}: ResetForm) => {
    const data = {
      username: values.username,
      firstname: values.firstname,
      lastname: values.lastname,
      birthday: values.birthday,
      city: values.city,
      aboutMe: values.aboutMe
    }
    try {
      console.log(values.aboutMe)

      await setProfileHandler(data)
      resetForm()
    } catch (error) {
    }
  }

  return (
    <StyledContent>
      <StyledAvatarBlock>
        <img src={avatar} alt="Avatar"/>
        <Button theme={ThemeButton.OUTLINED}>
          Add a Profile Photo
        </Button>
      </StyledAvatarBlock>
      <Formik
        initialValues={initialAuthValues}
        validationSchema={validateProfile}
        onSubmit={handleSubmit}
      >
        {({errors, touched, values, setFieldValue}) => (
          <StyledProfileForm width={'40vw'}>
            <FormikLabel
              name="username"
              onChange={(e) => setFieldValue('username', e)}
              value={values.username}
              type={'text'}
              title={'Username'}
              border={errors.username?.length && touched.username ? 'red' : 'white'}
              errors={errors}
              touched={touched}
              width={'40vw'}
            />
            <FormikLabel
              name="firstname"
              onChange={(e) => setFieldValue('firstname', e)}
              value={values.firstname}
              type={'text'}
              title={'First Name'}
              border={errors.firstname?.length && touched.firstname ? 'red' : 'white'}
              errors={errors}
              touched={touched}
              width={'40vw'}
            />
            <FormikLabel
              name="city"
              onChange={(e) => setFieldValue('city', e)}
              value={values.city}
              type={'text'}
              title={'City'}
              border={errors.city?.length && touched.city ? 'red' : 'white'}
              errors={errors}
              touched={touched}
              width={'40vw'}
            />
            <FormikLabel
              name="birthday"
              onChange={(e) => setFieldValue('birthday', e)}
              value={values.birthday}
              type={'date'}
              title={'Date of birthday'}
              border={errors.birthday?.length && touched.birthday ? 'red' : 'white'}
              errors={errors}
              touched={touched}
              width={'150px'}
            />
            <FormikLabel
              name="aboutMe"
              onChange={(e) => setFieldValue('aboutMe', e)}
              value={values.aboutMe}
              type={'textarea'}
              title={'About Me'}
              border={errors.aboutMe?.length && touched.aboutMe ? 'red' : 'white'}
              errors={errors}
              touched={touched}
              width={'40vw'}
            />

            <Button theme={ThemeButton.PRIMARY} type="submit" width={'159px'}>
              Save Change
            </Button>
          </StyledProfileForm>
        )}
      </Formik>
    </StyledContent>
  )
}

const StyledContent = styled.div
  `
    width: 100%;
    margin-top: 40px;

    display: flex;
    gap: 40px;

    @media (max-width: 790px ) {
      flex-direction: column;
      align-items: center;
    }
  `

const StyledAvatarBlock = styled.div
  `
    width: 27%;

    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    //align-items: flex-start;
    align-content: flex-start;
    gap: 20px;

    background: ${baseTheme.colors.dark[700]};
    //border: 2px solid darkred;
    color: ${baseTheme.colors.dark[100]};

    & img {
      width: 13.5vw;
      height: 13.5vw;
      border-radius: 50%;

      //& Image {
      //  width: 13.5vw;
      //  height: 13.5vw;
      //  border-radius: 50%;

      @media (max-width: 790px ) {
        width: 40vw;
        height: 40vw;
      }
    }

    @media (max-width: 790px ) {
      width: 60%;
    }
  `

const StyledProfileForm = styled(StyledAuthForm)
  `
    align-items: flex-end;
  `
