import { createMuiTheme } from '@material-ui/core'

const fallbackFonts = ['sans-serif']

export const systemFonts = ['Lato', ...fallbackFonts].join(',')

export const theme = createMuiTheme({
  breakpoints: {
    values: {
      xs: 0,
      sm: 320,
      md: 768,
      lg: 1024,
      xl: 1280,
    },
  },
  typography: {
    htmlFontSize: 10,
    fontFamily: systemFonts,
  },
  palette: {
    background: {
      default: '#f5f5f5',
    },
    primary: {
      main: '#343F56',
    },
    secondary: {
      main: '#ccc',
    },
  },
  props: {
    MuiButtonBase: {
      disableRipple: true,
    },
  },
  overrides: {
    MuiOutlinedInput: {
      root: {
        borderRadius: 0,
      },
    },
    MuiSwitch: {
      track: {
        backgroundColor: '#807C7C',
      },
    },
    MuiButton: {
      root: {
        borderRadius: 25,
        height: 47,
        fontFamily: systemFonts,
        fontWeight: 700,
        color: 'white',
      },
      text: {
        borderRadius: 25,
        height: 47,
        fontFamily: systemFonts,
        color: 'white',
        '&:hover': {
          background: 'none',
          textDecoration: 'underline',
        },
      },
      containedPrimary: {
        color: 'white',
      },
    },
    MuiInputBase: {
      root: {
        fontFamily: systemFonts,
      },
    },
    MuiCard: {
      root: {
        backgroundColor: 'white',
        maxWidth: '511px',
        margin: '0 auto',
        padding: '40px',
      },
    },
  },
})
