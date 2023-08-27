import React, { useEffect, useState } from 'react'
import { Formik } from 'formik'
import { getLayout } from '../../../common/components/Layout/BaseLayout/BaseLayout'
import { WrapperContainerAuth } from '../../../features/auth/WrapperContainerAuth'
import { Button } from '../../../common/components/Button/Button'
import { FormikLabel } from '../../../common/components/Formik/FormikLabel'
import {
  StyledAuthForm,
  StyledRecoveryWrapper,
  StyledSignIn,
  StyledSignInWrapper,
  StyledText,
} from '../../../styles/styledComponents/auth/FormikAuth.styled'
import { useSendRecoveryLinkMutation } from '../../../assets/store/api/auth/authApi'
import { FormValueRecovery, ResetForm } from '../../../common/components/Formik/types'
import { validateRecovery } from '../../../common/utils/validateRecovery'
import { baseTheme } from '../../../styles/styledComponents/theme'
import Image from 'next/image'
import { StyledContainerAuth } from '../../../styles/styledComponents/auth/Auth.styled'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { GetStaticPropsContext } from 'next'
import config from 'next-i18next.config.js'
import { useTranslation } from 'next-i18next'
import { ThemeButton } from '../../../common/enums/themeButton'
import { Path } from '../../../common/enums/path'
import { Modal } from '../../../common/components/Modals/ModalPublic/Modal'
import { useRef } from 'react'
import ReCAPTCHA from 'react-google-recaptcha'

export async function getStaticProps(context: GetStaticPropsContext) {
  const { locale } = context
  return {
    props: {
      ...(await serverSideTranslations(locale as string, ['common'], config)),
    },
  }
}

export default function Recovery() {
  const initialAuthValues = {
    email: '',
  }

  const [isMessageSent, setIsMessageSent] = useState(false)
  const [email, setEmail] = useState('')
  const [isModalOpen, setIsModalOpen] = useState(false)

  const [recoveryHandler, result] = useSendRecoveryLinkMutation()

  const { t } = useTranslation()
  const captchaRef = useRef<ReCAPTCHA>(null)

  const secret = '6Le96RMnAAAAAE9dOL6eVQHJ1HYsNAo4OUbDGWIg'
  // const secret = process.env.RECAPTCHA_SITE_KEY as string

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
    const captcha = await captchaRef.current?.executeAsync()

    if (captchaRef.current !== null) {
      console.log('ERROR')
    } else {
      const recaptcha = captchaRef.current as unknown as ReCAPTCHA
      const token = recaptcha.getValue()
      recaptcha.reset()

      const data = {
        email: values.email,
        recaptchaValue: captcha,
      }

      await recoveryHandler(data)
        .unwrap()
        .then(() => {
          setEmail(values.email)
          resetForm()
        })
    }
  }

  return (
    <StyledContainerAuth>
      <WrapperContainerAuth title={t('rec_password_title')} titleMarginBottom={'37px'}>
        <Formik
          initialValues={initialAuthValues}
          validationSchema={validateRecovery}
          onSubmit={handleSubmit}
        >
          {({ errors, touched, values, setFieldValue }) => (
            <StyledAuthForm errorShow={true}>
              <FormikLabel
                name="email"
                onChange={e => setFieldValue('email', e)}
                value={values.email}
                type={'email'}
                title={'Email'}
                border={errors.email?.length && touched.email ? 'red' : 'white'}
                errors={errors}
                touched={touched}
                margin={'0px'}
                t={t}
              />
              <StyledRecoveryWrapper>
                <StyledText
                  color={baseTheme.colors.light[900]}
                  textAlign={'left'}
                  width={'auto'}
                  fontSize={'14px'}
                >
                  {t('enter_email_text')}
                </StyledText>
                {isMessageSent && <StyledText>{t('link_sent_text')}</StyledText>}
              </StyledRecoveryWrapper>

              <Button width="100%" theme={ThemeButton.PRIMARY} type="submit">
                {isMessageSent ? t('send_again_btn') : t('send_link_btn')}
              </Button>
            </StyledAuthForm>
          )}
        </Formik>
        <StyledSignInWrapper margin={'24px 0'}>
          <StyledSignIn href={Path.LOGIN}>{t('back_singIn_btn')} </StyledSignIn>
        </StyledSignInWrapper>
        <ReCAPTCHA
          sitekey={secret}
          size="normal"
          // ref={captchaRef}
        />
        {/* <Image priority alt="Captcha" width={260} height={60} src="/img/captcha.png" /> */}
      </WrapperContainerAuth>
      {isModalOpen && (
        <Modal
          title={t('email_modal_title')}
          bodyText={t('email_modal_text') + ' ' + `${email}`}
          handleModalClose={handleModalClose}
          height="auto"
        >
          <Button theme={ThemeButton.PRIMARY} onClick={handleModalClose} width={'96px'}>
            OK
          </Button>
        </Modal>
      )}
    </StyledContainerAuth>
  )
}

Recovery.getLayout = getLayout
