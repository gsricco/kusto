/*eslint-disable*/

import { getLayout } from 'common/components/Layout/AdminLayout/AdminLayout'

export const getServerSideProps = ({ query }) => ({
  props: query,
})

const Sergio = props => {
  console.log(props.country)
  // or you can grab it from the router.
  //   const router = useRouter()

  //   console.log(router.query)

  return <h1 style={{ color: 'white' }}>Welcome to {props.country}</h1>
}

export default Sergio
Sergio.getLayout = getLayout
