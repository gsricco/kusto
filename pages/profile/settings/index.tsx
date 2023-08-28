import React, { useEffect, useState } from 'react'

import { Field, Formik } from 'formik'

import { FormValueProfile } from '../../../common/components/Formik/types'

import type {} from '@mui/x-date-pickers/themeAugmentation'
import { getLayout } from '../../../common/components/Layout/PageLayout/PageLayout'
import { useRouter } from 'next/router'
import { Path } from '../../../common/enums/path'
import Calendar from 'common/components/Calendar/Calendar'
import {
  BlockButton,
  IconBlock,
  StyledAvatarBlock,
  StyledContent,
  StyledLine,
  StyledProfileForm,
} from 'styles/styledComponents/profile/Settings.styled'
import FilterModal from 'features/posts/FilterModal'
import { isElementAccessExpression } from 'typescript'
import { StyledErrorMsg, StyledField } from 'common/components/Formik/Formik.styled'
import PhotoSelectModal from 'features/profile/PhotoSelectModal'
import ProfileCalendar from 'features/settings/ProfileCalendar'
import { GetStaticPropsContext } from 'next'
import Image from 'next/image'
import config from 'next-i18next.config.js'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

import {
  useLazyAuthMeQuery,
  useLazyProfileQuery,
  useSaveProfileInfoMutation,
} from '../../../assets/store/api/profile/profileApi'
import { Button } from '../../../common/components/Button/Button'
import { FormikLabel } from '../../../common/components/Formik/FormikLabel'
import { Modal } from '../../../common/components/Modals/ModalPublic/Modal'
import { ThemeButton } from '../../../common/enums/themeButton'
import { useLocalStorage } from '../../../common/hooks/useLocalStorage'
import { validateProfile } from '../../../common/utils/validateProfile'
import { SettingsPageWrapper } from '../../../features/settings/SettingsPageWrapper'

// //// Отображение страницы редактирования профиля  //  ////
//      с возможностью изменения аватарки                 //

export async function getStaticProps(context: GetStaticPropsContext) {
  const { locale } = context

  return {
    props: {
      ...(await serverSideTranslations(locale as string, ['common', 'nav_bar', 'post_cr'], config)),
    },
  }
}

const GeneralInformation = () => {
  const [isModalOpen, setIsModalOpen] = useState({
    photoModal: false, // открытие модального окна выбора аватарки
    saveProfileModal: false, // открытие модального окна при сохранении изменений
    filterModal: false,
  })
  const [authMeLoading, setAuthMeLoading] = useState(false)
  const [profileLoading, setProfileLoading] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  // const [photo, setPhoto] = useState<File>();
  const { setItem, getItem } = useLocalStorage()
  const [saveProfileInfoHandler] = useSaveProfileInfoMutation()
  const [getProfileInfo, { data }] = useLazyProfileQuery()
  const [authMeHandler, { data: usernameAuth }] = useLazyAuthMeQuery()
  const router = useRouter()

  const { t } = useTranslation()

  useEffect(() => {
    authMeHandler()
      .unwrap()
      .then(res => {
        setItem('userEmail', res.email)
        setItem('name', res.login)
        setAuthMeLoading(true)
      })

    const isProfile = !router.asPath.includes('profile=false')

    if (isProfile) {
      getProfileInfo()
        .unwrap()
        .finally(() => {
          setProfileLoading(true)
        })
    } else {
      setProfileLoading(true)
    }

    if (authMeLoading && profileLoading) {
      setIsLoading(true)
    }
  }, [authMeHandler, getProfileInfo, setIsLoading, authMeLoading, profileLoading])

  // аватарка, отображаемая при загрузке
  const avatar = data?.photo || '/img/icons/avatar.svg'

  // начальные значения для формы
  const initialAuthValues = {
    username: data?.login || usernameAuth?.login || getItem('name') || '',
    firstname: data?.firstName || '',
    lastname: data?.lastName || '',
    birthday: data?.dateOfBirthday || '',
    city: data?.city || '',
    aboutMe: data?.userInfo || '',
  }
  // обработчик нажатия кнопки сохранения данных в форме
  const handleSubmit = async (values: FormValueProfile) => {
    const data = {
      login: values.username,
      firstName: values.firstname,
      lastName: values.lastname,
      dateOfBirthday: values.birthday,
      city: values.city,
      userInfo: values.aboutMe,
    }

    try {
      await saveProfileInfoHandler(data)
        .unwrap()
        .then(() => {
          setIsModalOpen({ photoModal: false, saveProfileModal: true, filterModal: false })
          router.push(Path.PROFILE_SETTINGS)
        })
    } catch (error) {}
  }
  // обработчик нажатия кнопки для открытия окна смены аватарки
  const handleAddPhoto = () => {
    setIsModalOpen({ photoModal: true, saveProfileModal: false, filterModal: false })
  }

  // обработчик нажатия кнопки для закрытия модального окна смены аватарки
  const handleModalClose = () => {
    setIsModalOpen({ photoModal: false, saveProfileModal: false, filterModal: false })
  }

  const handleFilterModalOpen = () => {
    setIsModalOpen({ photoModal: false, saveProfileModal: false, filterModal: true })
  }

  return (
    <>
      {isLoading && (
        <SettingsPageWrapper>
          <StyledContent>
            <StyledAvatarBlock>
              <IconBlock>
                <Image alt="Avatar" height={192} src={avatar} width={192} />
              </IconBlock>
              <div style={{}}>
                <Button theme={ThemeButton.OUTLINED} width="auto" onClick={handleAddPhoto}>
                  {t('add_prof_photo')}
                </Button>
              </div>
            </StyledAvatarBlock>
            <Formik
              initialValues={initialAuthValues}
              validationSchema={validateProfile}
              onSubmit={handleSubmit}
            >
              {({ errors, touched, values, setFieldValue }) => (
                <StyledProfileForm>
                  <FormikLabel
                    border={errors.username?.length && touched.username ? 'red' : 'white'}
                    errors={errors}
                    name="username"
                    t={t}
                    title={t('username')}
                    touched={touched}
                    type="text"
                    value={values.username}
                    width="100%"
                    onChange={e => setFieldValue('username', e)}
                  />
                  <FormikLabel
                    border={errors.firstname?.length && touched.firstname ? 'red' : 'white'}
                    errors={errors}
                    name="firstname"
                    t={t}
                    title={t('f_name')}
                    touched={touched}
                    type="text"
                    value={values.firstname}
                    width="100%"
                    onChange={e => setFieldValue('firstname', e)}
                  />
                  <FormikLabel
                    border={errors.lastname?.length && touched.lastname ? 'red' : 'white'}
                    errors={errors}
                    name="lastname"
                    t={t}
                    title={t('l_name')}
                    touched={touched}
                    type="text"
                    value={values.lastname}
                    width="100%"
                    onChange={e => setFieldValue('lastname', e)}
                  />
                  <FormikLabel
                    border={errors.city?.length && touched.city ? 'red' : 'white'}
                    errors={errors}
                    name="city"
                    t={t}
                    title={t('city')}
                    touched={touched}
                    type="text"
                    value={values.city}
                    width="100%"
                    onChange={e => setFieldValue('city', e)}
                  />
                  <ProfileCalendar
                    date={values.birthday || ''}
                    errors={errors.birthday}
                    setFieldValue={setFieldValue}
                    t={t}
                    touched={touched.birthday}
                  />

                  <FormikLabel
                    border={errors.aboutMe?.length && touched.aboutMe ? 'red' : 'white'}
                    errors={errors}
                    name="aboutMe"
                    t={t}
                    textAreaData={values.aboutMe}
                    title={t('about_me')}
                    touched={touched}
                    type="textarea"
                    value={values.aboutMe}
                    width="100%"
                    onChange={e => setFieldValue('aboutMe', e)}
                  />
                  <BlockButton>
                    <StyledLine />
                    <Button theme={ThemeButton.PRIMARY} type="submit" width="auto">
                      {t('save_changes')}
                    </Button>
                  </BlockButton>
                </StyledProfileForm>
              )}
            </Formik>
          </StyledContent>
          {isModalOpen.photoModal && (
            <PhotoSelectModal avatar={data?.photo} handleModalClose={handleModalClose} />
          )}
          {isModalOpen.saveProfileModal && (
            <Modal
              bodyText={t('profile_changes_saved')}
              handleModalClose={handleModalClose}
              title={t('general_info')}
            >
              <Button theme={ThemeButton.PRIMARY} width="96px" onClick={handleModalClose}>
                OK
              </Button>
            </Modal>
          )}
          {/* {isModalOpen.filterModal && (
            <FilterModal handleModalClose = {handleModalClose} photo={photo}/>
          )} */}
        </SettingsPageWrapper>
      )}
    </>
  )
}

GeneralInformation.getLayout = getLayout
export default GeneralInformation
