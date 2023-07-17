import React, {useEffect, useState} from "react";
import {Form, Formik} from "formik";
import {FormValueProfile, ResetForm} from "../../../common/components/Formik/types";
import {Button} from "../../../common/components/Button/Button";
import {FormikLabel, StyledTitle} from "../../../common/components/Formik/FormikLabel";
import {validateProfile} from "../../../common/utils/validateProfile";
import {SettingsPageWrapper} from "../../../features/settings/SettingsPageWrapper";
import {
  useLazyAuthMeQuery,
  useLazyProfileQuery,
  useSaveProfileInfoMutation
} from "../../../assets/store/api/profile/profileApi";
import {ThemeButton} from "../../../common/enums/themeButton";
import {useSetProfileMutation} from "../../../assets/store/api/auth/authApi";
import PhotoSelectModal from "features/profile/PhotoSelectModal";
import { getLayout } from "../../../common/components/Layout/SettingsLayout/SettingsLayout";
import styled from "styled-components";
import {baseTheme} from "../../../styles/styledComponents/theme";
import Image from 'next/image'
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import type {} from '@mui/x-date-pickers/themeAugmentation';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat'
import { createTheme, ThemeProvider } from '@mui/material/styles';

export type AuthMeType = {
  email: string;
  id: string;
  login: string;
};

const theme = createTheme({
  palette: {
    primary: {
      main: baseTheme.colors.accent[700],
    },
    text: {
      primary: baseTheme.colors.light[100],
    },
    action: {
      disabled: baseTheme.colors.dark[100],
    }

  },
  components: {
    MuiPickersDay: {
      styleOverrides: {
        root: {
          ":hover": {
            backgroundColor: baseTheme.colors.accent[700]
          },
          "&.Mui-disabled:not(.Mui-selected)": {
            color: baseTheme.colors.dark[100]
          },
          ":not(.Mui-selected)" : {
            borderColor: baseTheme.colors.accent[700]
          },
          "&.Mui-selected": {
            backgroundColor: 'transparent',
            color: baseTheme.colors.accent[700],
          },
        },
      },
    },
    MuiDateCalendar: {
      styleOverrides: {
        root: {
          backgroundColor: baseTheme.colors.dark[500],
        }
      },
    },
    MuiIconButton: {
      styleOverrides: {
        root: {
          color: baseTheme.colors.light[100]
        },
      },
    },
    MuiDayCalendar: {
      styleOverrides: {
        weekDayLabel: {
          color: baseTheme.colors.dark[100]
        },
      },
    },
    MuiButtonBase: {
      styleOverrides: {
        root: {
          "&.Mui-disabled": {
            color: baseTheme.colors.dark[100]
          },
        },
      },
    },
    MuiPickersArrowSwitcher: {
      styleOverrides: {
        button: {
          backgroundColor: baseTheme.colors.dark[100],
        },
      },
    },
    MuiTextField: {
      defaultProps: {
        size: 'small'
      },
      styleOverrides: {
        root: {
          border: '1px solid',
          borderColor: baseTheme.colors.dark[100],
          borderRadius: '4px',
          backgroundColor: baseTheme.colors.dark[500],
        },
      },
    },
    
  },
});

const GeneralInformation = () => {

  const [isModalOpen, setIsModalOpen] = useState(false) // открытие модального окна загрузки новой аватарки
  const [isLoading, setIsLoading] = useState(false);
  // const [format, setFormat] = useState('DD/MM/YYYY')
  // const [birthDate, setBirthDate] = useState<Dayjs | null>(null);

  const [saveProfileInfoHandler] = useSaveProfileInfoMutation();
  const [getProfileInfo, {data}] = useLazyProfileQuery();
  const [authMeHandler, {data: usernameAuth}] = useLazyAuthMeQuery();
  const [setProfileHandler] = useSetProfileMutation()

  // const { i18n } = useTranslation();
  // if (i18n.language == 'en') {
  //   setFormat('MM/DD/YYYY')
  // }

  // let month
  // if (birthDate) {
  //   month = birthDate.get("month") + 1
  // }
  // console.log(birthDate?.format('DD/MM/YYYY'))
  // console.log(`${birthDate?.date()}/${month}/${birthDate?.year()}`)
  useEffect(() => {
    authMeHandler();
    getProfileInfo()
      .unwrap()
      .finally(() => {
        setIsLoading(true)});
  }, []);

  // начальные значения, отображаемые на странице
  const avatar = data?.photo || "/img/icons/avatar.svg"

  dayjs.extend(customParseFormat)
  const birthDate = dayjs(data?.dateOfBirthday, "DD-MM-YYYY")
  console.log(birthDate?.format('DD/MM/YYYY'))
  // setBirthDate(date) 
  const initialAuthValues = {
    username: data?.login || usernameAuth?.login || "",
    firstname: data?.firstName || "",
    lastname: data?.lastName || "",
    // birthday: data?.dateOfBirthday ? data.dateOfBirthday.split("-").reverse().join("-") : "",
    birthday: data?.dateOfBirthday || "",
    city: data?.city || "",
    aboutMe: data?.userInfo || ""
  };


  const handleSubmit = async (values: FormValueProfile, {resetForm}: ResetForm) => {
    // const date = values.birthday.split("-").reverse().join("-");
    const data = {
      login: values.username,
      firstName: values.firstname,
      lastName: values.lastname,
      dateOfBirthday: values.birthday,
      city: values.city,
      userInfo: values.aboutMe
    };
    try {
      await saveProfileInfoHandler(data);
      console.log(data)
    } catch (error) {
    }
  };

  // открытие модального окна для загрузки новой аватарки
  const handleAddPhoto = () => {
    setIsModalOpen(true)
  }

  // закрытие модального окна для загрузки аватарки
  const handleModalClose = () => {
    setIsModalOpen(false)
  }

  return (
    <>
      {isLoading && (
        <SettingsPageWrapper>
          <StyledContent>
            <StyledAvatarBlock>
              <IconBlock>
                <Image src={avatar} alt={"Avatar"} width={192} height={192} />
              </IconBlock>

              <Button theme={ThemeButton.OUTLINED} width={"100%"} onClick={handleAddPhoto}>
                Add a Profile Photo
              </Button>
            </StyledAvatarBlock>
            <Formik
              initialValues={initialAuthValues}
              validationSchema={validateProfile}
              onSubmit={handleSubmit}
            >
              {({errors, touched, values, setFieldValue}) => (
                <StyledProfileForm>
                  <FormikLabel
                    name="username"
                    onChange={(e) => setFieldValue("username", e)}
                    value={values.username}
                    type={"text"}
                    title={"Username"}
                    border={errors.username?.length && touched.username ? "red" : "white"}
                    errors={errors}
                    touched={touched}
                    width={"100%"}
                  />
                  <FormikLabel
                    name="firstname"
                    onChange={(e) => setFieldValue("firstname", e)}
                    value={values.firstname}
                    type={"text"}
                    title={"First Name"}
                    border={errors.firstname?.length && touched.firstname ? "red" : "white"}
                    errors={errors}
                    touched={touched}
                    width={"100%"}
                  />
                  <FormikLabel
                    name="lastname"
                    onChange={(e) => setFieldValue("lastname", e)}
                    value={values.lastname}
                    type={"text"}
                    title={"Last Name"}
                    border={errors.lastname?.length && touched.lastname ? "red" : "white"}
                    errors={errors}
                    touched={touched}
                    width={"100%"}
                  />
                  <FormikLabel
                    name="city"
                    onChange={(e) => setFieldValue("city", e)}
                    value={values.city}
                    type={"text"}
                    title={"City"}
                    border={errors.city?.length && touched.city ? "red" : "white"}
                    errors={errors}
                    touched={touched}
                    width={"100%"}
                  />
                  {/* <FormikLabel
                    name="birthday"
                    onChange={(e) => setFieldValue("birthday", e)}
                    value={values.birthday}
                    type={"date"}
                    title={"Date of birthday"}
                    border={errors.birthday?.length && touched.birthday ? "red" : "white"}
                    errors={errors}
                    touched={touched}
                    width={"150px"}
                  /> */}
                  <StyledTitle>
                    <span>Date of birthday</span>
                  </StyledTitle>
                  <ThemeProvider theme={theme}>
                    <DatePicker 
                      value={birthDate}
                      format={'DD/MM/YYYY'}
                      onChange={(newValue) => {
                        const date = newValue?.format('DD/MM/YYYY')
                        setFieldValue("birthday", date)
                      }}
                      disableFuture={true}
                    />
                  </ThemeProvider>
                  <FormikLabel
                    name="aboutMe"
                    onChange={(e) => setFieldValue("aboutMe", e)}
                    value={values.aboutMe}
                    type={"textarea"}
                    title={"About Me"}
                    border={errors.aboutMe?.length && touched.aboutMe ? "red" : "white"}
                    errors={errors}
                    touched={touched}
                    width={"100%"}
                    textAreaData={values.aboutMe}
                  />
                  <BlockButton>
                    <StyledLine/>
                    <Button theme={ThemeButton.PRIMARY} type="submit" width={"159px"}>
                      Save Change
                    </Button>
                  </BlockButton>
                </StyledProfileForm>
              )}
            </Formik>
            {/* <ThemeProvider theme={theme}>
              <DatePicker 
                value={birthDate} 
                onChange={(newValue) => setBirthDate(newValue)}
                disableFuture={true}
              />
            </ThemeProvider> */}
          </StyledContent>
          {isModalOpen && (<PhotoSelectModal handleModalClose={handleModalClose} avatar={data?.photo} />)}
        </SettingsPageWrapper>
        )}
</>
)
}


GeneralInformation.getLayout = getLayout;
export default GeneralInformation;

const StyledContent = styled.div`
  position: relative;
  display: flex;
  gap: 40px;

  @media (max-width: 790px) {
    flex-direction: column;
    align-items: center;
  }
`;

const StyledAvatarBlock = styled.div`
  max-width: 192px;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-content: flex-start;
  gap: 20px;

  background: ${baseTheme.colors.dark[700]};
  color: ${baseTheme.colors.dark[100]};
`;

const IconBlock = styled.div`
  position: relative;

  width: 192px;
  height: 192px;
  overflow: hidden;
  background: ${baseTheme.colors.dark[100]};
  border-radius: 50%;

  & img {
    position: absolute;
    top:50%;
    left:50%;
    transform:translate(-50%,-50%);
    width:192px;
    height:192px;
    object-fit:cover;
  }
  
`;

const StyledProfileForm = styled(Form)`
  align-items: flex-end;
  width: 100%;
`;

const StyledLine = styled.div`
  position: absolute;
  bottom: 60px;
  right: 0;
  width: 100%;
  max-width: 726px;
  height: 1px;
  background: ${baseTheme.colors.dark[300]};
`;

const BlockButton = styled.div`
  text-align: right;
  padding-top: 24px;
`;
