import { gql } from '@apollo/client'

export const PROFILE = gql`
  query Profile {
    userId
    login
  }
`
