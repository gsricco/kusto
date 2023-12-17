import { useEffect, useState, useRef } from 'react'

import { useSendRecoveryLinkMutation } from 'assets/store/api/auth/authApi'
import { Button } from 'common/components/Button/Button'
import { FormikLabel } from 'common/components/Formik/FormikLabel'
import { FormValueRecovery, ResetForm } from 'common/components/Formik/types'
import { getLayout } from 'common/components/Layout/BaseLayout/BaseLayout'
import Modal from 'common/components/Modals/ModalPublic/Modal'
import { Path } from 'common/enums/path'
import { ThemeButton } from 'common/enums/themeButton'
import { validateRecovery } from 'common/utils/validateRecovery'
import { WrapperContainerAuth } from 'features/auth/WrapperContainerAuth'
import { Formik } from 'formik'
import { GetStaticPropsContext } from 'next'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import config from 'next-i18next.config.js'
import ReCAPTCHA from 'react-google-recaptcha'
import { StyledContainerAuth } from 'styles/styledComponents/auth/Auth.styled'
import {
  StyledAuthForm,
  StyledRecoveryWrapper,
  StyledSignIn,
  StyledSignInWrapper,
  StyledText,
} from 'styles/styledComponents/auth/FormikAuth.styled'
import { baseTheme } from 'styles/styledComponents/theme'
import { useRouter } from 'next/router'

export async function getStaticProps(context: GetStaticPropsContext) {
  const { locale } = context

  return {
    props: {
      ...(await serverSideTranslations(locale as string, ['common'], config)),
    },
  }
}

const Recovery = () => {
  const initialAuthValues = {
    email: '',
  }

  const [isMessageSent, setIsMessageSent] = useState(false)
  const [email, setEmail] = useState('')
  const [isModalOpen, setIsModalOpen] = useState(false)

  const [recoveryHandler, result] = useSendRecoveryLinkMutation()

  const { t } = useTranslation()

  const router = useRouter()
  const { code } = router.query
  console.log('code', code)
  /// /////////// ПЕРЕДЕЛАТЬ ПЕРЕХОД ПО НОРМАЛЬНОМУ АДРЕСУ
  if (code !== undefined) router.push(`${Path.NEW_PASSWORD}?code=${code}`)

  const captchaRef = useRef<ReCAPTCHA>(null)

  // const secret = '6LcmGd8nAAAAAEYCarXOl4AWXZ80PLvtwAy58X-v'
  // const secret = 'AIzaSyBME4uvSLsmVFDInIRRIKjYa6-DiygeILw'
  const secret = '6LeY2y0mAAAAANwI_paCWfoksCgBm1n2z9J0nwNQ'
  // const secret = '6LeY2y0mAAAAAN8bWU4ElOZIEnRAqugcHy0PGOpO'

  const handleModalClose = () => {
    setIsModalOpen(false)
  }

  useEffect(() => {
    if (result.isSuccess) {
      setIsModalOpen(true)
      setIsMessageSent(true)
    }
  }, [result])

  const handleSubmit = async (values: FormValueRecovery, { resetForm }: ResetForm) => {
    // const captcha = await captchaRef.current?.executeAsync();
    if (captchaRef.current == null) {
      console.log('ERROR')
    } else {
      const recaptcha = captchaRef.current as unknown as ReCAPTCHA
      const token = recaptcha.getValue()

      console.log(token)

      const data = {
        email: values.email,
        recaptcha: token,
      }

      await recoveryHandler(data)
        .unwrap()
        .then(() => {
          setEmail(values.email)
          resetForm()
          recaptcha.reset()
        })
    }
  }

  return (
    <StyledContainerAuth>
      <WrapperContainerAuth title={t('rec_password_title')} titleMarginBottom="37px">
        <Formik
          initialValues={initialAuthValues}
          validationSchema={validateRecovery}
          onSubmit={handleSubmit}
        >
          {({ errors, touched, values, setFieldValue }) => (
            <StyledAuthForm errorShow>
              <FormikLabel
                border={errors.email?.length && touched.email ? 'red' : 'white'}
                errors={errors}
                margin="0px"
                name="email"
                t={t}
                title="Email"
                touched={touched}
                type="email"
                value={values.email}
                onChange={e => setFieldValue('email', e)}
              />
              <StyledRecoveryWrapper>
                <StyledText
                  color={baseTheme.colors.light[900]}
                  fontSize="14px"
                  textAlign="left"
                  width="auto"
                >
                  {t('enter_email_text')}
                </StyledText>
                {isMessageSent && <StyledText>{t('link_sent_text')}</StyledText>}
              </StyledRecoveryWrapper>

              <Button theme={ThemeButton.PRIMARY} type="submit" width="100%">
                {isMessageSent ? t('send_again_btn') : t('send_link_btn')}
              </Button>
            </StyledAuthForm>
          )}
        </Formik>
        <StyledSignInWrapper margin="24px 0">
          <StyledSignIn href={Path.LOGIN}>{t('back_singIn_btn')} </StyledSignIn>
        </StyledSignInWrapper>
        <ReCAPTCHA ref={captchaRef} sitekey={secret} size="normal" />
        {/* <Image priority alt="Captcha" width={260} height={60} src="/img/captcha.png" /> */}
      </WrapperContainerAuth>
      {isModalOpen && (
        <Modal
          // eslint-disable-next-line no-useless-concat
          bodyText={`${t('email_modal_text')} ` + `${email}`}
          handleModalClose={handleModalClose}
          height="auto"
          title={t('email_modal_title')}
        >
          <Button theme={ThemeButton.PRIMARY} width="96px" onClick={handleModalClose}>
            OK
          </Button>
        </Modal>
      )}
    </StyledContainerAuth>
  )
}

export default Recovery

Recovery.getLayout = getLayout
