import { createMuiTheme, responsiveFontSizes } from '@material-ui/core'

export const systemFonts = ['Lato', 'sans-serif'].join(',')

export const theme = responsiveFontSizes(
  createMuiTheme({
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
      h1: {
        fontSize: '7.2rem',
      },
      h2: {
        fontSize: '5.5rem',
      },
      h3: {
        fontSize: '4rem',
      },
      h4: {
        fontSize: '3rem',
      },
      h5: {
        fontSize: '2rem',
      },
      h6: {
        fontSize: '1.4rem',
        fontWeight: 'bold',
      },
      body1: {
        fontSize: '2rem',
      },
      body2: {
        fontSize: '1.4rem',
      },
      subtitle1: {
        fontSize: '1.2rem',
      },
    },
    palette: {
      background: {
        default: '#ffffff',
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
          fontSize: '1.4rem',
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
  }),
  {
    factor: 4,
    variants: ['h1', 'h2', 'h3', 'h4', 'h5', 'body1'],
  },
)
