import React from "react"
import { getLayout } from "../../../../common/components/Layout/BaseLayout/BaseLayout"
import { useRouter } from 'next/router';

//translate import
import {serverSideTranslations} from 'next-i18next/serverSideTranslations'
import {GetStaticPropsContext} from "next"
import config from 'next-i18next.config.js'
import {useTranslation} from 'next-i18next'
//
import VerificationWindow from "features/auth/VerificationWindow"


// getStaticProps Определения языка, указанного в url
export async function getStaticProps(context: GetStaticPropsContext) {
  const {locale} = context as any

  return {
    props: {
      ...(await serverSideTranslations(locale, ["common"], config)),
    }
  }
}

const Verification = () => {

  const router = useRouter()
  const {t} = useTranslation()      // функция перевода на выбранный язык

  const handleClick = () => {
    router.push('/auth/recovery')
  };

  return (
    <VerificationWindow handleClick={handleClick} title={t("link_exp_title_recov")} text={t("link_exp_text")} btnTitle={t("resend_btn_recov")} />
  )
}

Verification.getLayout = getLayout

export default Verification

