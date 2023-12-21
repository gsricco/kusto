import { useFormik } from 'formik'
import { TFunction } from 'i18next'
import {
  Payment,
  PaymentsLabel,
  StyledPaymentsForm,
  Text,
} from 'styles/styledComponents/acc_management/acc_management.styled'

type FormProps = {
  selectedPayment: string
  setSelectedPayment: (payment: string) => void
  t: TFunction<'translation', undefined>
}

export const PaymentsForm = ({ t, selectedPayment, setSelectedPayment }: FormProps) => {
  const payments = [t('2_1_Day'), t('10_7_Day'), t('30_month')]

  const setInitialPayment = () => {
    if (selectedPayment === 'WEEKLY') {
      return t('10_7_Day')
    }
    if (selectedPayment === 'MONTHLY') {
      return t('30_month')
    }

    return t('2_1_Day')
  }

  const paymentsForm = useFormik({
    initialValues: {
      payment: setInitialPayment(),
    },
    enableReinitialize: true,
    onSubmit: values => console.log(values),
  })

  const setParams = (index: number) => {
    switch (index) {
      case 0: {
        setSelectedPayment('DAY')
        break
      }
      case 1: {
        setSelectedPayment('WEEKLY')
        break
      }
      case 2: {
        setSelectedPayment('MONTHLY')
        break
      }
      default:
        setSelectedPayment('DAY')
    }
  }

  return (
    <StyledPaymentsForm onSubmit={paymentsForm.handleSubmit}>
      {payments.map((payment, index) => (
        <PaymentsLabel key={payment}>
          <Payment
            checked={paymentsForm.values.payment === payment}
            type="radio"
            value={payment}
            onChange={paymentsForm.handleChange}
            onClick={() => setParams(index)}
          />
          <Text>{payment}</Text>
        </PaymentsLabel>
      ))}
    </StyledPaymentsForm>
  )
}
