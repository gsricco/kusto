/* eslint-disable no-restricted-globals */
// export const codeCheckLink = () => {
//   let code: string | undefined = ''
//
//   if (typeof window !== 'undefined') {
//     // code = location?.href.split("?").join('').split('=').pop()
//     code = location?.href.split('=').pop()
//   }
//
//   return { code }
// }
export const codeCheckLink = () => {
  let code: string | null | undefined = ''

  if (typeof window !== 'undefined') {
    const urlParams = new URLSearchParams(window.location.search)

    code = urlParams.get('code')
    console.log('code', code)
  }

  return { code }
}
