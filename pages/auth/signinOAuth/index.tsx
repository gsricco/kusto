import { Button } from 'common/components/Button/Button'
import { getLayout } from 'common/components/Layout/BaseLayout/BaseLayout'
import { ThemeButton } from 'common/enums/themeButton'
import { oauthRequest } from 'features/auth/oauth2Request'
import { ProvidersPropsType } from 'features/auth/types'
import Image from 'next/image'
import { useRouter } from 'next/router'
import github from 'public/img/icons/github-svgrepo-com.svg'
import google from 'public/img/icons/google-svgrepo-com.svg'
import {
  BlockButton,
  SigninWrapper,
  buttonStyle,
  spanStyle,
} from 'styles/styledComponents/auth/signin.styled'

export const getStaticProps = async () => {
  return {
    props: {
      provider: {
        google: {
          AUTH_URL: process.env.GOOGLE_AUTH_URL,
          SCOPE: process.env.GOOGLE_SCOPE,
          REDIRECT_URI: process.env.GOOGLE_REDIRECT_URI,
          ID: process.env.GOOGLE_ID,
        },
        github: {
          AUTH_URL: process.env.GITHUB_AUTH_URL,
          SCOPE: process.env.GITHUB_SCOPE,
          REDIRECT_URI: process.env.GITHUB_REDIRECT_URI,
          ID: process.env.GITHUB_ID,
        },
      },
    },
  }
}

const Signin = (props: ProvidersPropsType) => {
  const route = useRouter()

  const handle = (providerName: string) => {
    const url = oauthRequest(providerName, props)

    console.log(url)
    window.location.assign(url)
  }

  return (
    <SigninWrapper>
      <BlockButton>
        <Button
          style={buttonStyle}
          theme={ThemeButton.SECONDARY}
          type="button"
          width="300"
          onClick={() => {
            handle('google')
          }}
        >
          <Image alt="google" height={24} src={google} width={24} />
          <span style={spanStyle}>Sign in with Google</span>
        </Button>

        <Button
          style={buttonStyle}
          theme={ThemeButton.SECONDARY}
          type="button"
          width="300"
          onClick={() => {
            handle('github')
          }}
        >
          <Image alt="github" height={24} src={github} width={24} />
          <span style={spanStyle}>Sign in with GitHub</span>
        </Button>
      </BlockButton>
    </SigninWrapper>
  )
}

Signin.getLayout = getLayout
export default Signin
