import { FormikState } from "formik"

export type FormValue = {
  username: string
  password: string
  passwordConfirmation: string
  email: string
}

export type ResetForm = {
  resetForm: (
    nextState?:
      | Partial<
          FormikState<{
            username: string
            password: string
            passwordConfirmation: string
            email: string
          }>
        >
      | undefined
  ) => void
}
