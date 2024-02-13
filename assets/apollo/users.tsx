import { gql } from 'assets/apollo/__generated__/gql'

// Получение данных обо всех пользователей

export const GET_USERS = gql(`
  query Users(
  $pageSize: Int,
  $pageNumber: Int,
  $sortBy: String,
  $sortDirection: SortDirection,
  $searchTerm: String,
) {
  getUsers(
    pageSize: $pageSize
    pageNumber: $pageNumber
    sortBy: $sortBy
    sortDirection: $sortDirection
    searchTerm: $searchTerm
  ) {
    users {
      id
      userName
      email
      createdAt
      profile {
        id
        userName
        firstName
        lastName
        city
        dateOfBirth
        aboutMe
        createdAt
        avatars{
          url
          width
          height
          fileSize
        }
      }
      userBan{
        reason
        createdAt
      }
    }
    pagination {
      pagesCount
      page
      pageSize
      totalCount
    }
  }
}
`)
