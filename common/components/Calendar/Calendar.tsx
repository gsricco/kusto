import { ThemeProvider } from "@emotion/react";
import { DatePicker } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import React from "react";
import { theme } from "common/components/Calendar/theme";
import { StyledErrorMsg, StyledTitle } from "../Formik/Formik.styled";
import customParseFormat from "dayjs/plugin/customParseFormat";
import { Field, FormikErrors } from "formik";
import { FormikAllValuesType } from "../Formik/types";
import { TFunction } from "next-i18next";

type CalendarProps = {
  date: string;
  setFieldValue: (field: string, value: unknown) => void;
  errors: string | undefined;
  touched: boolean | undefined;
  t?: TFunction;
};

const Calendar = ({ date, setFieldValue, errors, touched, t }: CalendarProps) => {
  dayjs.extend(customParseFormat);
  let birthDate = dayjs();
  if (date) {
    birthDate = dayjs(date, "DD-MM-YYYY");
  }

  return (
    <>
      <StyledTitle>
        <span>Date of birthday</span>
      </StyledTitle>
      <Field name='birthday'>
      <ThemeProvider theme={theme}>
        <DatePicker
          value={birthDate}
          format={"DD/MM/YYYY"}
          disableFuture={true}
          onChange={(newValue) => {
            const date = newValue?.format("DD/MM/YYYY");
            setFieldValue("birthday", date);
          }}
        />
      </ThemeProvider>
      </Field>
      {!!errors && touched && (
        <StyledErrorMsg>
          {t ? t(`${errors}`) : errors}
        </StyledErrorMsg>
      )}
    </>
  );
};

export default Calendar;
