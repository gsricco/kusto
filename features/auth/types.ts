import { LoginResponseType } from 'assets/store/api/auth/types'

export type FormAuthPropsType = {
  height?: string
  width?: string
}

export type VerificationWindowType = {
  btnTitle: string
  handleClick: () => void
  text: string
  title: string
}

export type ProviderData = {
  AUTH_URL: string
  ID: string
  REDIRECT_URI: string
  SCOPE: string
}

export type ProvidersPropsType = {
  provider: {
    github: ProviderData
    google: ProviderData
  }
}

export type ServerPropsType = {
  provider: {
    github: ProviderData
    google: ProviderData
  }
  response: LoginResponseType
}
