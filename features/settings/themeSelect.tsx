import { createTheme } from '@mui/material/styles'
import { baseTheme } from 'styles/styledComponents/theme'

export const theme = createTheme({
  palette: {
    primary: {
      main: baseTheme.colors.accent[700],
    },
    text: {
      primary: baseTheme.colors.light[100],
    },
    action: {
      //   disabled: baseTheme.colors.dark[100],
      //   hover: baseTheme.colors.dark[100],
    },
  },
  components: {
    MuiFormControl: {
      styleOverrides: {
        root: {
          border: '1px solid',
          borderColor: baseTheme.colors.dark['300'],
          backgroundColor: baseTheme.colors.dark[500],

          borderRadius: '2px',
          width: '52px',
          minWidth: '48px',
          height: '24px',
          margin: '6px',
        },
      },
    },
    MuiSelect: {
      styleOverrides: {
        select: {
          padding: '0px',
          paddingLeft: '8px',
          paddingTop: '1px',
          color: baseTheme.colors.light['100'],
        },
        icon: {
          fill: baseTheme.colors.light['100'],
          left: '28px',
        },
      },
    },
    MuiMenu: {
      // стили для кнопок с иконками
      styleOverrides: {
        paper: {
          backgroundColor: baseTheme.colors.dark[300],
        },
      },
    },
    MuiInputBase: {
      // стили для кнопок с иконками
      styleOverrides: {
        root: {
          backgroundColor: baseTheme.colors.dark[500],
        },
      },
    },
    MuiOutlinedInput: {
      // стили для кнопок с иконками
      styleOverrides: {
        notchedOutline: {
          border: '0px',
        },
      },
    },
  },
})
