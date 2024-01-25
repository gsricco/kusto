import { gql } from 'assets/apollo/__generated__/gql'

// Получение данных обо всех пользователей

export const GET_USERS = gql(`

query Users(
  // $pageSize: Int,
  // $pageNumber: Int,
  // $sortBy: String,
  // $sortDirection: SortDirection,
  // $searchTerm: String,
  // $blockStatus: BlockStatus
) {
  getUsers(
    // pageSize: $pageSize
    // pageNumber: $pageNumber
    // sortBy: $sortBy
    // sortDirection: $sortDirection
    // searchTerm: $searchTerm
    // blockStatus: $blockStatus
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

//
// export const GET_ALL_PAYMENTS = gql(`
// query AllPaymentsUsers(
//   $pageSize: Int=10
//   $pageNumber: Int=1 ,
//   $sortBy: String = "createdAt",
//   $sortDirection: SortDirection = desc){
//   getAllPayments(
//     pageSize: $pageSize,
//     pageNumber: $pageNumber,
//     sortBy: $sortBy,
//     sortDirection: $sortDirection
//   ){
//     pagesCount
//     page
//     pageSize
//     totalCount
//     items {
//           id
//           userId
//           amount
//           currency
//           createdAt
//           userName
//           paymentMethod
//           type
//           avatars {
//                   url
//                   width
//                   height
//                   fileSize
//                   }
//    }
//   }
// }
// `)
//
// export const GET_USER_PAYMENTS = gql(`
// query GET_LIST_PAYMENTS_BY_ID (
//   $userId: Int!=2,
//   $pageSize: Int = 10,
//   $pageNumber: Int = 1,
//   $sortBy: String = "createdAt",
//   $sortDirection: SortDirection = desc,
// ) {
//   getListPaymentsById(
//     userId: $userId,
//     pageSize: $pageSize,
//     pageNumber:$pageNumber,
//     sortBy: $sortBy,
//     sortDirection:$sortDirection
//   ) {
//     pagesCount
//     page
//     pageSize
//     totalCount
//     items {
//           id
//           businessAccountId
//           status
//           dateOfPayment
//           startDate
//           endDate
//           type
//           price
//           paymentType
//           payments {
//                   id
//                   userId
//                   amount
//                   currency
//                   createdAt
//                   }
//         }
//       }
//     }
// `)
//
// // Получение данных об одном пользователе
// export const GET_USER_PROFILE = gql(`
// query GET_PROFILE_INFO($userId: Int!=10){
//   getProfileInfo(userId:$userId){
//     id
//     userName
//     createdAt
//     profile {
//             id
//             userName
//             firstName
//             lastName
//             city
//             dateOfBirth
//             aboutMe
//             createdAt
//             avatars {
//                     url
//                     width
//                     height
//                     fileSize
//                     }
//             }
//     posts {
//           images {
//                   url
//                   width
//                   height
//                   fileSize
//                 }
//         }
//   }
// }
//
// `)
//
// export const GET_POSTS = gql(`
// query GET_POSTS(
//   $searchTerm: String,
//   $pageSize: Int = 10,
//   $sortBy: String = "createdAt",
//   $sortDirection: SortDirection = desc,
//   $endCursorPostId: Int
// ){
//   getPosts(
//     searchTerm:$searchTerm,
//     pageSize:$pageSize,
//     sortBy:$sortBy,
//     sortDirection:$sortDirection,
//     endCursorPostId:$endCursorPostId
//   ){
//     pagesCount
//     pageSize
//     totalCount
//     items {
//           images {
//                   url
//                   width
//                   height
//                   fileSize
//                   }
//           id
//           ownerId
//           description
//           createdAt
//           }
//   }
// }
// `)
//
// //
// // // Получение данных о количестве пользователей
// // export const GET_TOTAL_COUNT = gql(`
// //   query Total($pageSize:Int!,$searchName:String!,$sortBy:String!,$sortDirection:String!,$pageNumber:Int!) {
// //     totalCountUsers(pageSize:$pageSize,searchName:$searchName,sortBy:$sortBy,sortDirection:$sortDirection,pageNumber:$pageNumber)
// //   }
// // `)
// //
// // // Получение данных об одном пользователе
// // export const GET_USER_PROFILE = gql(`
// //   query user($id: String!) {
// //     user(id: $id) {
// //       id
// //       createdAt
// //       profiles {
// //         login
// //         firstName
// //         lastName
// //         photo
// //       }
// //     }
// //   }
// // `)
// //
// // // Получение всех изображений, загруженных одним пользователем
// // export const GET_USER_IMAGES = gql(`
// //   query userImages($id: String!) {
// //     user(id: $id) {
// //       images {
// //         url
// //         id
// //       }
// //     }
// //   }
// // `)
// //
// //
// // export const REMOVE_USER = gql(`
// // mutation REMOVE_USER($userId:Int!){
// //   removeUser(userId:$userId)
// // }
// //
// //   // mutation deleteUser($userId: String!) {
// //   //   deleteUser (userId: $userId)
// //   // }
// // `)
//
// export const UPDATE_USER_STATUS = gql(`
//   mutation updateUserStatus($userId: String!,$banStatus: Boolean!){
//     updateUserStatus(userId:$userId,banStatus:$banStatus)
//   }
// `)
// //
// // // EDIT......
// // export const GET_ALL_PAYMENTS = gql(`
// //   query Payments($pageSize:Int!,$searchName:String!,$sortBy:String!,$sortDirection:String!,$pageNumber:Int!) {
// //     allPayments(pageSize:$pageSize,searchName:$searchName,sortBy:$sortBy,sortDirection:$sortDirection,pageNumber:$pageNumber) {
// //       paymentsId
// //       userId
// //       price
// //       paymentSystem
// //       paymentStatus
// //       createdAt
// //       subscriptionType
// //       updatedAt
// //       endDateOfSubscription
// //       user {
// //       profiles {
// //       login
// //       photo}
// //       }
// //     }
// //   }
// // `)
// //
// // // Получение данных о количестве пользователей
// // export const GET_TOTAL_COUNT_PAYMENTS = gql(`
// //   query TotalCountPayments($pageSize:Int!,$searchName:String!,$sortBy:String!,$sortDirection:String!,$pageNumber:Int!) {
// //     totalCountPayments(pageSize:$pageSize,searchName:$searchName,sortBy:$sortBy,sortDirection:$sortDirection,pageNumber:$pageNumber)
// //   }
// // `)
// //
// // // Получение всех оплат пользователя
// // export const GET_USER_PAYMENTS = gql(`
// //   query userPayments($id: String!) {
// //     user(id: $id) {
// //       payments {
// //         dateOfPayments: createdAt
// //         endDateOfSubscription
// //         price
// //         paymentType: paymentSystem
// //         subscriptionType
// //       }
// //     }
// //   }
// // `)
