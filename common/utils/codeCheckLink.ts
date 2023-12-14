export const codeCheckLink = (name: string) => {
  let resultName: string | null | undefined = ''

  if (typeof window !== 'undefined') {
    const urlParams = new URLSearchParams(window.location.search)

    resultName = urlParams.get(name)
  }

  return { resultName }
}
