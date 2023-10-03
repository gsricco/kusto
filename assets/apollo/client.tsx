import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client'
import { setContext } from '@apollo/client/link/context'

const httpLink = createHttpLink({
  uri: 'https://kustogram.site/api/v1/users/profiles/profile',
  credentials: 'include',
})

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists

  const token = localStorage.getItem('accessToken')

  // return the headers to the context so httpLink can read them

  return {
    headers: {
      ...headers,

      authorization: token ? `Bearer ${token}` : '',
    },
  }
})

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: authLink.concat(httpLink),
})

export default client
