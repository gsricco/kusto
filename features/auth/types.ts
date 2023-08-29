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
  AUTH_URL: string | null
  ID: string | null
  REDIRECT_URI: string | null
  SCOPE: string | null
}

export type ProvidersPropsType = {
  provider: {
    github: ProviderData
    google: ProviderData
  }
}
