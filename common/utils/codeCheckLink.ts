export const codeCheckLink = (name: string) => {
  // let resultName: string | null | undefined = ''
  let resultName: string = ''

  if (typeof window !== 'undefined') {
    const urlParams = new URLSearchParams(window.location.search)

    resultName = urlParams.get(name) || ''
  }

  return { resultName }
}
