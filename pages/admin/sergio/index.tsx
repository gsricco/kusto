import { getLayout } from 'common/components/Layout/AdminLayout/AdminLayout'
import { ParsedUrlQuery } from 'querystring'

export const getServerSideProps = ({ query }: ParsedUrlQuery) => ({
  props: query,
})

type Props = {
  country: string
}

const Sergio = ({ country }: Props) => {
  // or you can grab it from the router.
  //   const router = useRouter()

  //   console.log(router.query)

  return <h1 style={{ color: 'white' }}>Welcome to {country}</h1>
}

export default Sergio
Sergio.getLayout = getLayout
