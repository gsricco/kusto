import React, { useEffect } from "react";
import { getLayout } from "../../common/components/Layout/SettingsLayout/SettingsLayout";
import { IconBlock, StyledAvatarBlock, StyledContent } from "./settings";
import Image from "next/image";
import { Button } from "../../common/components/Button/Button";
import { ThemeButton } from "../../common/enums/themeButton";
import { useLazyProfileQuery } from "../../assets/store/api/profile/profileApi";
import styled from "styled-components";
import { useRouter } from "next/router";
import { Path } from "../../common/enums/path";
import "tui-image-editor/dist/tui-image-editor.css";
import ImageEditor from "@toast-ui/react-image-editor";

const MyProfile = () => {
  const [getProfileInfo, { data }] = useLazyProfileQuery();

  const theme = {
    // "common.bi.image": "", // Удаляем логотип по умолчанию, задав пустую строку
    "common.backgroundImage": "none",
    // "common.display": "none",
    "common.backgroundColor": "#1e1e1e",
    "common.border": "0px solid black",

    // "common.bi.image":
    // "https://i.pinimg.com/originals/33/b8/69/33b869f90619e81763dbf1fccc896d8d.jpg",
    // "common.bisize.width": "50px",
    // "common.bisize.height": "50px",
    // "common.backgroundImage": "none",
    // "common.backgroundColor": "#1e1e1e",
    // "common.border": "0px",

    // header
    "header.backgroundImage": "none",
    "header.backgroundColor": "transparent",
    "header.border": "0px",

    // // load button
    // "loadButton.backgroundColor": "#fff",
    // "loadButton.border": "1px solid #ddd",
    // "loadButton.color": "#222",
    // "loadButton.fontFamily": "NotoSans, sans-serif",
    // "loadButton.fontSize": "12px",

    // download button
    "downloadButton.backgroundColor": "red",
    "downloadButton.border": "1px solid blue",
    "downloadButton.color": "#fff",
    "downloadButton.fontFamily": "NotoSans, sans-serif",
    "downloadButton.fontSize": "12px",
    "downloadButton.display": "none"

    // // icons default
    // "menu.normalIcon.color": "#8a8a8a",
    // "menu.activeIcon.color": "#555555",
    // "menu.disabledIcon.color": "#434343",
    // "menu.hoverIcon.color": "#e9e9e9",
    // "submenu.normalIcon.color": "#8a8a8a",
    // "submenu.activeIcon.color": "#e9e9e9",

    // "menu.iconSize.width": "24px",
    // "menu.iconSize.height": "24px",
    // "submenu.iconSize.width": "32px",
    // "submenu.iconSize.height": "32px",

    // // submenu primary color
    // "submenu.backgroundColor": "#1e1e1e",
    // "submenu.partition.color": "#858585",

    // // submenu labels
    // "submenu.normalLabel.color": "#858585",
    // "submenu.normalLabel.fontWeight": "lighter",
    // "submenu.activeLabel.color": "#fff",
    // "submenu.activeLabel.fontWeight": "lighter",

    // // checkbox style
    // "checkbox.border": "1px solid #ccc",
    // "checkbox.backgroundColor": "#fff",

    // // rango style
    // "range.pointer.color": "#fff",
    // "range.bar.color": "#666",
    // "range.subbar.color": "#d1d1d1",

    // "range.disabledPointer.color": "#414141",
    // "range.disabledBar.color": "#282828",
    // "range.disabledSubbar.color": "#414141",

    // "range.value.color": "#fff",
    // "range.value.fontWeight": "lighter",
    // "range.value.fontSize": "11px",
    // "range.value.border": "1px solid #353535",
    // "range.value.backgroundColor": "#151515",
    // "range.title.color": "#fff",
    // "range.title.fontWeight": "lighter",

    // // colorpicker style
    // "colorpicker.button.border": "1px solid #1e1e1e",
    // "colorpicker.title.color": "#fff"
  };

  useEffect(() => {
    getProfileInfo()
      .unwrap()
      .finally(() => {
        // question
      });
  }, []);

  // начальные значения, отображаемые на странице
  const avatar = data?.photo || "/img/icons/avatar.svg";
  const userName = (data?.login || "Anonymous").toUpperCase();
  const router = useRouter();
  const handleClick = () => {
    router.push(Path.PROFILE_SETTINGS);
  };

  return (
    <>
      <StyledBlockUser>
        <StyledAvatarBlock>
          <IconBlock>
            <Image src={avatar} alt={"Avatar"} width={192} height={192} />
          </IconBlock>
        </StyledAvatarBlock>
        <StyledContent>{userName}</StyledContent>
        <Button theme={ThemeButton.SECONDARY} width={"167px"} onClick={handleClick}>
          Profile Settings
        </Button>
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

      <ImageEditor
        includeUI={{
          loadImage: {
            path: "img/sampleImage.jpg",
            name: "SampleImage"
          },
          theme: theme,
          menu: ["shape", "filter", "text", "mask", "icon", "draw", "crop", "flip", "rotate"],
          initMenu: "filter",
          uiSize: {
            width: "1000px",
            height: "700px"
          },
          menuBarPosition: "bottom"
        }}
        cssMaxHeight={500}
        cssMaxWidth={700}
        selectionStyle={{
          cornerSize: 20,
          rotatingPointOffset: 70
        }}
        usageStatistics={true}
      />
    </>
  );
};
MyProfile.getLayout = getLayout;
export default MyProfile;

const StyledBlockUser = styled(StyledContent)`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  width: 100%;
  gap: 10px;
  margin-bottom: 30px;
`;

const StyledPicture = styled.div`
  width: 228px;
  height: 228px;
  background: darkgray;
`;

const StyledImageEditor = styled(ImageEditor)`
  background: red;
`;
