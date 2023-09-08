import React, { useEffect, useState } from 'react'

import { useClient } from 'common/hooks/useClients'
import { Field, Form, Formik, useFormik } from 'formik'
import { GetStaticPropsContext } from 'next'
import Image from 'next/image'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import config from 'next-i18next.config.js'
import paypal from 'public/img/icons/paypal-svgrepo-com.svg'
import stripe from 'public/img/icons/stripe-svgrepo-com.svg'
import { useTranslation } from 'react-i18next'
import { styled } from 'styled-components'

import { getLayout } from '../../../../common/components/Layout/PageLayout/PageLayout'
import { SettingsPageWrapper } from '../../../../features/settings/SettingsPageWrapper'

const fakeSubscriptions = [
  {
    expireAt: '12.10.2023',
    nextPayment: '13.10.2023',
  },
  {
    expireAt: '19.12.2023',
    nextPayment: '20.12.2023',
  },
]

export async function getStaticProps(context: GetStaticPropsContext) {
  const { locale } = context

  return {
    props: {
      ...(await serverSideTranslations(locale as string, ['common', 'nav_bar', 'post_cr'], config)),
    },
  }
}

const AccountManagement = () => {
  const { t, i18n } = useTranslation()
  const payments = [t('10_1_Day'), t('50_7_Day'), t('100_month')]
  const accountType = [t('personal'), t('business')]
  const len = i18n.language

  const client = useClient()

  const typeForm = useFormik({
    initialValues: {
      type: t(accountType[0]),
    },
    onSubmit: values => console.log(values),
  })

  useEffect(() => {
    typeForm.setFieldValue('name', t(accountType[0]).toString())
    console.log(typeForm.values)
  }, [len])

  console.log(typeForm.initialValues.type, 'init')
  console.log(typeForm.values.type, 'val')

  return (
    client && (
      <SettingsPageWrapper>
        <PageWrapper>
          <Section>
            <CurrentSubscription>Current Subscription:</CurrentSubscription>
            <SubscriptionsWrapper>
              {fakeSubscriptions.map(subscription => {
                return (
                  <Wrapper key={subscription.expireAt}>
                    <ExpireWrapper>
                      <SubscriptionsHeading>Expire at</SubscriptionsHeading>
                      <Date>{subscription.expireAt}</Date>
                    </ExpireWrapper>
                    <NextPayments>
                      <SubscriptionsHeading>Next payment</SubscriptionsHeading>
                      <NextPayments>{subscription.nextPayment}</NextPayments>
                    </NextPayments>
                  </Wrapper>
                )
              })}
            </SubscriptionsWrapper>
            <AutoRenewalWrapper>
              <CheckBox type="checkbox" />
              <AutoRenewal>Auto-Renewal</AutoRenewal>
            </AutoRenewalWrapper>
          </Section>
          <Section>
            <AccountType>{t('account_type')}</AccountType>
            <TypeForm onSubmit={typeForm.handleSubmit}>
              {accountType.map(type => (
                <LabelType key={type}>
                  <Type
                    checked={typeForm.values.type === type.toString()}
                    type="radio"
                    value={type.toString()}
                    onChange={typeForm.handleChange}
                  />
                  <Text>{type}</Text>
                </LabelType>
              ))}
            </TypeForm>
          </Section>
          {typeForm.values.type === t(accountType[1]).toString() ? (
            <>
              <Section>
                <SubscriptionCost>{t('your_subscription_costs')}</SubscriptionCost>
                <Formik
                  initialValues={{
                    payment: `${t('10_1_Day').toString()}`,
                  }}
                  onSubmit={() => console.log(1)}
                >
                  {() => (
                    <PaymentsForm>
                      {payments.map(payment => (
                        <PaymentsLabel key={payment}>
                          <Payment name="payment" type="radio" value={payment.toString()} />
                          <Text>{payment}</Text>
                        </PaymentsLabel>
                      ))}
                    </PaymentsForm>
                  )}
                </Formik>
              </Section>
              <PaymentsSection>
                <PayPal alt="paypal" src={paypal} />
                <Text>{t('or')}</Text>
                <Stripe alt="stripe" src={stripe} />
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

const Column = styled.div`
  display: flex;
  flex-direction: column;
`

const CurrentSubscription = styled.h2``

const AutoRenewalWrapper = styled.div`
  display: flex;
  gap: 8px;
`

const AutoRenewal = styled.p``

const CheckBox = styled.input`
  accent-color: white;
  padding: 5px;
`

const SubscriptionsWrapper = styled(Column)`
  margin: 18px 0 13px;
  background: #171717;
  padding: 12px 24px;
  gap: 12px;
`

const Wrapper = styled.div`
  display: flex;
  gap: 48px;
`

const ExpireWrapper = styled(Column)`
  gap: 12px;
`

const NextPayments = styled(Column)`
  gap: 12px;
`
const SubscriptionsHeading = styled.p`
  font-size: 14px;
  font-weight: 400;
  color: #8d9094;
`

const Date = styled.p`
  font-size: 14px;
  font-weight: 600;
  color: #fff;
`

const PageWrapper = styled(Column)`
  display: flex;
  flex-direction: column;
  gap: 40px;
`

const Section = styled.section``

const TypeForm = styled.form`
  display: flex;
  flex-direction: column;
  background: #171717;
  border: 1px solid #333;
  padding: 23px 12px;
  gap: 24px;
`

const PaymentsForm = styled(Form)`
  display: flex;
  flex-direction: column;
  background: #171717;
  border: 1px solid #333;
  padding: 23px 12px;
  gap: 24px;
`

const AccountType = styled.h2`
  color: white;
  margin-bottom: 6px;
`

const Text = styled.span`
  margin-left: 12px;
  font-size: 14px;
  font-weight: 400;
`

const Type = styled.input.attrs({
  type: 'radio',
  name: 'type',
})`
  &:checked {
    accent-color: black;
  }
`

const LabelType = styled.label.attrs({
  htmlFor: 'type',
})`
  margin-right: 12px;
`

const PaymentsLabel = styled.label`
  margin-right: 12px;
`

const Payment = styled(Field)`
  &:checked {
    accent-color: black;
  }
`

const PaymentsSection = styled.section`
  align-self: flex-end;
  display: flex;
  gap: 54px;
  align-items: center;
`

const PayPal = styled(Image)`
  cursor: pointer;
`

const Stripe = styled(PayPal)``

const SubscriptionCost = styled(AccountType)``
