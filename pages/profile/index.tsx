import React, { useState, useEffect } from "react";
import { getLayout } from "../../common/components/Layout/PageLayout/PageLayout";
import Image from "next/image";
import { useAuthMeQuery, useLazyProfileQuery } from "assets/store/api/profile/profileApi";
import { Button } from "common/components/Button/Button";
import { ThemeButton } from "common/enums/themeButton";
import { useRouter } from "next/router";
import { Path } from "common/enums/path";
import { useWindowSize } from "common/hooks/useWindowSize";
import Paid from "../../public/img/icons/paid.svg";
import {
  AboutMeBlock,
  AboutMeText,
  BlockButton,
  FolowBlock,
  HeaderStyle,
  IconBlock,
  InfoBlock,
  Link,
  PhotoStyle,
  PhotosBlock,
  ProfileWrapper,
  StyledAvatarBlock,
  UserNameStyle
} from "styles/styledComponents/profile/profile.styled";
import { mediaSize } from "./mediaSizes";

const MyProfile = () => {
  const serverAvatar: string = "";
  const avatar = serverAvatar !== "" ? serverAvatar : "/img/icons/avatar.svg";
  const [getProfileInfo, { data: user }] = useLazyProfileQuery();

  const { isSuccess } = useAuthMeQuery();

  const { width, height } = useWindowSize(); // хук для измерения размера экрана

  const [isVisible, setIsVisible] = useState(true);
  const [isPaid, setIsPaid] = useState(false);
  const router = useRouter();

  const avatarSize = width ? (width < mediaSize.mobileScreenSize ? 72 : 204) : 204;
  const paidImageSize = width ? (width < mediaSize.mobileScreenSize ? 16 : 24) : 24;

  const handleClick = () => {
    router.push(Path.PROFILE_SETTINGS);
  };

  useEffect(() => {
    getProfileInfo();
  }, []);

  useEffect(() => {
    if (width) {
      if (width < mediaSize.buttonUnvisible) {
        // для мобильной версии
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
    }
  }, [width]);

  /*   __________<Нахождение ссылки в тексте (НЕ УДАЛЯТЬ!!!)>______ */
  const urlify = (text: string) => {
    const urlRegex =
      /(https?:\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])|(ftp:\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])|(file:\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])|(www.[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/gi;
    const urlRegex2 =
      /((https?:\/\/|ftp:\/\/|file:\/\/)[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/gi;

    return text.split(urlRegex).map((part, i, a) => {
      let url;
      if (part?.match(urlRegex)) {
        if (part.match(urlRegex2)) {
          url = part;
        } else url = "https://" + part;

        return (
          <Link key={i} href={url}>
            {part}
          </Link>
        );
      }
      return part;
    });
  };
  /*   __________</Нахождение ссылки в тексте (НЕ УДАЛЯТЬ!!!)>______ */

  return (
    <>
      {isSuccess && (
        <ProfileWrapper>
          <HeaderStyle>
            {isVisible && (
              <BlockButton>
                <Button
                  theme={ThemeButton.SECONDARY}
                  type="button"
                  width={"auto"}
                  style={{ padding: "6px 24px", gap: "10px" }}
                  onClick={handleClick}
                >
                  Profile Settings
                </Button>
              </BlockButton>
            )}
            <StyledAvatarBlock>
              <IconBlock>
                <Image
                  src={user?.photo || avatar}
                  width={avatarSize}
                  height={avatarSize}
                  alt={"avatar"}
                  style={{ maxWidth: "204px", maxHeight: "204px" }}
                />
              </IconBlock>
            </StyledAvatarBlock>

            <UserNameStyle>
              {user?.firstName || "FirstName"} {user?.lastName || "LastName"}
              {isPaid && (
                <Image
                  src={Paid}
                  width={paidImageSize}
                  height={paidImageSize}
                  alt={"paid"}
                  // style={{ }}
                />
              )}
            </UserNameStyle>

            <InfoBlock>
              <FolowBlock>
                <div>
                  <div>2 218</div>
                  <div>Following</div>
                </div>
                <div>
                  <div>2 358</div>
                  <div>Followers</div>
                </div>
                <div>
                  <div>2 358</div>
                  <div>Publications</div>
                </div>
              </FolowBlock>

              <AboutMeBlock>
                <AboutMeText>
                  {urlify(user?.userInfo || "about me")}

                  {/* Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                  incididunt. laboris nisi ut aliquip ex ea commodo consequat. */}
                </AboutMeText>
              </AboutMeBlock>
            </InfoBlock>
          </HeaderStyle>
          <PhotosBlock>
            <PhotoStyle>Photo</PhotoStyle>
            <PhotoStyle>Photo</PhotoStyle>
            <PhotoStyle>Photo</PhotoStyle>
            <PhotoStyle>Photo</PhotoStyle>
            <PhotoStyle>Photo</PhotoStyle>
            <PhotoStyle>Photo</PhotoStyle>
            <PhotoStyle>Photo</PhotoStyle>
            <PhotoStyle>Photo</PhotoStyle>
            <PhotoStyle>Photo</PhotoStyle>
          </PhotosBlock>
        </ProfileWrapper>
      )}
    </>
  );
};
MyProfile.getLayout = getLayout;
export default MyProfile;
