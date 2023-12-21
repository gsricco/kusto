import { useState, useEffect } from 'react'

import {
  useCurrentSubscriptionQuery,
  useSubscribeMutation,
} from 'assets/store/api/payments/paymentsApi'
import { PaymentsForm } from 'common/components/Forms/PaymentsForm/PaymentsForm'
import { TypeForm } from 'common/components/Forms/TypeForm/TypeForm'
import { getLayout } from 'common/components/Layout/PageLayout/PageLayout'
import { useClient } from 'common/hooks/useClients'
import { dateParser } from 'common/utils/dateParser'
import { SettingsPageWrapper } from 'features/settings/SettingsPageWrapper'
import { GetStaticPropsContext } from 'next'
import { useRouter } from 'next/dist/client/router'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import config from 'next-i18next.config.js'
import paypal from 'public/img/icons/paypal-svgrepo-com.svg'
import stripe from 'public/img/icons/stripe-svgrepo-com.svg'
import { useTranslation } from 'react-i18next'
import {
  AccountType,
  AutoRenewal,
  AutoRenewalWrapper,
  CheckBox,
  CheckBoxWrapper,
  CurrentSubscription,
  Date,
  ExpireWrapper,
  NextPayments,
  PageWrapper,
  PayPal,
  PaymentsSection,
  Section,
  Stripe,
  SubscriptionCost,
  SubscriptionsHeading,
  SubscriptionsWrapper,
  Text,
  Wrapper,
} from 'styles/styledComponents/acc_management/acc_management.styled'

export async function getStaticProps(context: GetStaticPropsContext) {
  const { locale } = context

  return {
    props: {
      ...(await serverSideTranslations(locale as string, ['common', 'nav_bar', 'post_cr'], config)),
    },
  }
}

const AccountManagement = () => {
  const { t } = useTranslation()

  const client = useClient()
  const { push } = useRouter()

  const [sendSubscribeRequest] = useSubscribeMutation()
  const { data: currentSubscriptions } = useCurrentSubscriptionQuery()

  const [isBusiness, setIsBusiness] = useState(false)
  const [selectedAccType, setSelectedAccType] = useState<string | null>(null)
  const [selectedPayment, setSelectedPayment] = useState<string>('DAY')
  const [expireAt, setExpiteAt] = useState('')
  const [isAutoRenewal, setIsAutoReneval] = useState(false)

  useEffect(() => {
    if (currentSubscriptions && currentSubscriptions?.data.length) {
      const lastSubscrupiton = currentSubscriptions.data.at(-1)?.endDateOfSubscription

      setExpiteAt(dateParser(lastSubscrupiton))
    }
  }, [expireAt, currentSubscriptions])

  useEffect(() => {
    if (currentSubscriptions) {
      setSelectedAccType(t('business'))
      setIsBusiness(true)
    }
  }, [currentSubscriptions])

  const handleSendSubscribeRequest = (paymentSystem: string) => {
    const data = {
      amount: 1,
      baseUrl: 'http://localhost:3000/',
      paymentType: paymentSystem,
      typeSubscription: selectedPayment,
    }

    if (paymentSystem === 'STRIPE') {
      sendSubscribeRequest(data)
        .unwrap()
        .then(res => {
          push(res.url)
        })
        .catch(error => console.log(error))
    } else {
      sendSubscribeRequest(data)
        .unwrap()
        .then(res => {
          push(res.url)
        })
        .catch(error => console.log(error))
    }
  }

  return (
    client && (
      <SettingsPageWrapper>
        <PageWrapper>
          {currentSubscriptions && (
            <Section>
              <CurrentSubscription>{t('current_subscription')}</CurrentSubscription>
              <SubscriptionsWrapper>
                <Wrapper key={expireAt}>
                  <ExpireWrapper>
                    <SubscriptionsHeading>{t('expire_at')}</SubscriptionsHeading>
                    <Date>{expireAt}</Date>
                  </ExpireWrapper>
                  <NextPayments>
                    <SubscriptionsHeading>{t('next_payment')}</SubscriptionsHeading>
                    <NextPayments>{isAutoRenewal ? expireAt : '-'}</NextPayments>
                  </NextPayments>
                </Wrapper>
              </SubscriptionsWrapper>
              <AutoRenewalWrapper>
                <CheckBoxWrapper>
                  <CheckBox
                    checked={isAutoRenewal}
                    type="checkbox"
                    onChange={() => setIsAutoReneval(prev => !prev)}
                  />
                </CheckBoxWrapper>
                <AutoRenewal>{t('auto_renewal')}</AutoRenewal>
              </AutoRenewalWrapper>
            </Section>
          )}
          <Section>
            <AccountType>{t('account_type')}</AccountType>
            <TypeForm
              selectedAccType={selectedAccType || t('personal')}
              setIsBusiness={setIsBusiness}
              setSelectedAccType={setSelectedAccType}
              t={t}
            />
          </Section>
          {isBusiness ? (
            <>
              <Section>
                <SubscriptionCost>{t('your_subscription_costs')}</SubscriptionCost>
                <PaymentsForm
                  selectedPayment={selectedPayment || t('2_1_Day')}
                  setSelectedPayment={setSelectedPayment}
                  t={t}
                />
              </Section>
              <PaymentsSection style={{ marginBottom: '20px' }}>
                <PayPal
                  alt="paypal"
                  src={paypal}
                  onClick={() => handleSendSubscribeRequest('PAYPAL')}
                />
                <Text>{t('or')}</Text>
                <Stripe
                  alt="stripe"
                  src={stripe}
                  onClick={() => handleSendSubscribeRequest('STRIPE')}
                />
              </PaymentsSection>
            </>
          ) : null}
        </PageWrapper>
      </SettingsPageWrapper>
    )
  )
}

AccountManagement.getLayout = getLayout
export default AccountManagement
