import React, {useEffect} from 'react';
import {useRouter} from "next/router";
import {useLazyCheckLinkHandlerQuery} from "../../../../assets/store/api/auth/authApi";
import {RegistrationResponseError} from "../../../../assets/store/api/auth/types";
import {log} from "next/dist/server/typescript/utils";

export const CheckLink = () => {
  const [checkLinkHandler, {error}] = useLazyCheckLinkHandlerQuery()


  const router = useRouter()
  // const {code} = router.query       // получение кода восстановления для сервера
  let code:string|undefined =''

  if (typeof window !== 'undefined') {
    // Perform localStorage action
     code = location?.href.split("?").join('').split('=').pop()
  }


  useEffect(()=>{
    console.log('check', code)


        checkLinkHandler(code)
          .unwrap()
          .then(() => {
            router.push('/auth/registration/success')
          })
          .catch(()=> {
            console.log('catсh')
            router.push('/auth/registration/verificationError')
          })



  },[])





  return (
    <div>

    </div>
  );
};

export default CheckLink;