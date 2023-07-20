import React, {useEffect} from 'react';
import {getLayout} from '../../common/components/Layout/SettingsLayout/SettingsLayout';
import {IconBlock, StyledAvatarBlock, StyledContent} from "./settings";
import Image from "next/image";
import {Button} from "../../common/components/Button/Button";
import {ThemeButton} from "../../common/enums/themeButton";
import {useLazyProfileQuery} from "../../assets/store/api/profile/profileApi";
import styled from "styled-components";
import {useRouter} from "next/router";
import {Path} from "../../common/enums/path";

const MyProfile = () => {
  const [getProfileInfo, {data}] = useLazyProfileQuery();

  useEffect(() => {
    getProfileInfo()
      .unwrap()
      .finally(() => {
        // question
      });
  }, []);

  // начальные значения, отображаемые на странице
  const avatar = data?.photo || "/img/icons/avatar.svg"
  const userName = (data?.login || "Anonymous").toUpperCase()
  const router = useRouter()
  const handleClick = () => {
    router.push(Path.PROFILE_SETTINGS)
  }


  return (
    <>

        <StyledBlockUser>
          <StyledAvatarBlock>
            <IconBlock>
              <Image src={avatar} alt={"Avatar"} width={192} height={192}/>
            </IconBlock>
          </StyledAvatarBlock>
          <StyledContent>
            {userName}
          </StyledContent>
          <Button theme={ThemeButton.SECONDARY} width={'167px'} onClick={handleClick}>Profile Settings</Button>
        </StyledBlockUser>
        <StyledBlockUser>
          <StyledPicture> map photo</StyledPicture>
          <StyledPicture></StyledPicture>
          <StyledPicture></StyledPicture>
          <StyledPicture></StyledPicture>
          <StyledPicture></StyledPicture>
          <StyledPicture></StyledPicture>
          <StyledPicture></StyledPicture>
          <StyledPicture></StyledPicture>
          <StyledPicture></StyledPicture>
          <StyledPicture></StyledPicture>
        </StyledBlockUser>

    </>

  );

};
MyProfile.getLayout = getLayout
export default MyProfile;

const StyledBlockUser = styled(StyledContent)
  `
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    width: 100%;
    gap: 10px;
    margin-bottom: 30px;
  `


const StyledPicture = styled.div
  `
    width: 228px;
    height: 228px;
    background: darkgray;
  `
