import { getLayout } from 'common/components/Layout/PageLayout/PageLayout'
import Modal from 'common/components/Modals/ModalPublic/Modal'
import { useClient } from 'common/hooks/useClients'
import { GetStaticPropsContext } from 'next'
import { useSearchParams, useRouter } from 'next/navigation'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import config from 'next-i18next.config.js'
import { useTranslation } from 'react-i18next'
import { ModalBtn } from 'styles/styledComponents/acc_management/acc_management.styled'

export async function getStaticProps(context: GetStaticPropsContext) {
  const { locale } = context

  return {
    props: {
      ...(await serverSideTranslations(locale as string, ['common', 'nav_bar', 'post_cr'], config)),
    },
  }
}

const Edit = () => {
  const { t, i18n } = useTranslation()
  const { language } = i18n

  const isSuccess = useSearchParams().get('success')

  const { push } = useRouter()
  const client = useClient()

  const handleCrossClick = () => {
    push('/profile/settings/acc_management')
  }

  const handleModalClose = () => {
    push('/profile/settings/acc_management')
  }

  return (
    client && (
      <>
        {isSuccess === 'false' && (
          <Modal
            bodyText={t('transaction_error')}
            handleCrossClick={handleCrossClick}
            handleModalClose={handleModalClose}
            height={language === 'en' ? '200px' : '240px'}
            title={t('error_modal')}
            width="360px"
          >
            <ModalBtn type="button" onClick={handleModalClose}>
              {t('error_btn')}
            </ModalBtn>
          </Modal>
        )}
        {isSuccess === 'true' && (
          <Modal
            bodyText={t('transaction_success')}
            handleCrossClick={handleCrossClick}
            handleModalClose={handleModalClose}
            height="200px"
            title={t('success_modal')}
          >
            <ModalBtn type="button" onClick={handleModalClose}>
              {t('success_btn')}
            </ModalBtn>
          </Modal>
        )}
      </>
    )
  )
}

Edit.getLayout = getLayout
export default Edit
