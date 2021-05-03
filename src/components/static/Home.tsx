import React from 'react'
import { makeStyles, Button, Grid, Hidden, Container } from '@material-ui/core'
import { systemFonts } from '../../theme'
import LandingPageAboveFold0 from '../../assets/LandingPageAboveFold0.png'
import LandingPageAboveFold0Mobile from '../../assets/LandingPageAboveFold0_mobile.png'
import { NavLink } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { ReactComponent as Butterfly1 } from '../../assets/butterfly1.svg'
import { ReactComponent as Butterfly2 } from '../../assets/butterfly2.svg'

type HomeProps = {
  token: string | null
}

export const useHomeStyles = makeStyles(theme => ({
  heroContainer: {
    position: 'relative',
    overflow: 'hidden',
  },
  heroTextGradiant: {
    zIndex: 1,
    background:
      'linear-gradient(90deg, rgba(17,17,17,0.4) -30%, rgba(255,255,255,0) 100%)',
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    [theme.breakpoints.down('sm')]: {
      background:
        'linear-gradient(90deg, rgba(17,17,17,0.4) -10%, rgba(255,255,255,0) 120%)',
    },
  },
  heroImage: {
    transition: 'opacity 2s ease-in-out',
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: 'auto',
    [theme.breakpoints.up('xl')]: {
      top: -250,
    },
  },
  heroText1: {
    color: '#F2F2F2',
    fontSize: '16px',
    lineHeight: '30px',
    fontFamily: 'Lato',
  },
  heroText2: {
    color: '#F2F2F2',
    fontSize: '30px',
    lineHeight: '35px',
    fontFamily: 'Lato',
  },
  heroTextDiv: {
    zIndex: 2,
    position: 'relative',

    [theme.breakpoints.up('xs')]: {
      padding: '100px 20px 30px 30px',
    },
    [theme.breakpoints.up('sm')]: {
      padding: '105px 20px 45px 40px',
    },
    [theme.breakpoints.up('md')]: {
      padding: '195px 20px 100px 40px',
    },
    [theme.breakpoints.up('lg')]: {
      padding: '255px 20px 130px 40px',
    },
  },
  joinButton: {
    width: '270px',
    height: '52px',
    backgroundColor: '#343F56',
    marginBottom: '5px',
    fontFamily: 'Lato',
    fontStyle: 'normal',
    fontWeight: 'bold',
    fontSize: '20px',
    lineHeight: '23px',
    textAlign: 'center',
    letterSpacing: '0.04em',
    [theme.breakpoints.up('sm')]: {
      marginTop: '20px',
      marginBottom: '10px',
    },
  },
  navLink: {
    paddingTop: '45px',
    '&:hover': {
      textDecoration: 'none',
    },
    '&:focus': {
      textDecoration: 'none',
    },
  },
  content1: {
    fontFamily: systemFonts,
    backgroundColor: '#343F56',
    textAlign: 'left',
    fontWeight: 'bold',
    paddingTop: '50px',
    paddingBottom: '50px',
    display: 'flex',
    justifyContent: 'center',
    position: 'relative',
  },
  content1TextDiv: {
    color: 'white',
    fontFamily: 'Lato',
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: '24px',
    lineHeight: '30px',
    [theme.breakpoints.up('sm')]: {
      fontSize: '24px',
    },
  },
  containerButterflyText: {
    [theme.breakpoints.down('md')]: {
      width: '80%',
    },
  },
  butterfly1: {
    position: 'absolute',
    top: '20%',
    left: '80%',
  },
  butterfly2: {
    position: 'absolute',
    bottom: '-6%',
    left: '10%',
    zIndex: 3,
  },
  content2: {
    fontFamily: systemFonts,
    backgroundColor: '#343F56',
    textAlign: 'left',
    fontWeight: 'bold',
    paddingTop: '50px',
    paddingBottom: '50px',
    display: 'flex',
    justifyContent: 'center',
    position: 'relative',
  },
  content2TextDiv: {
    color: 'white',
    fontFamily: 'Lato',
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: '24px',
    lineHeight: '30px',
    [theme.breakpoints.up('sm')]: {
      fontSize: '24px',
    },
  },
  logosDiv: {
    padding: '40px 30px',
    display: 'flex',
    justifyContent: 'center',
    [theme.breakpoints.down('xs')]: {
      flexDirection: 'column',
      alignItems: 'center',
    },
  },
  logosDivSeparator: {
    width: '5px',
    borderRight: '2px #EEEEEE solid',
    margin: '0px 50px',
    [theme.breakpoints.down('sm')]: {
      borderRight: '0px #EEEEEE solid',
      margin: '10px 5px',
    },
  },
  labImageDiv: {
    maxWidth: '550px',
    paddingBottom: '90px',
    [theme.breakpoints.up('md')]: {
      float: 'right',
    },
    [theme.breakpoints.up('sm')]: {
      paddingLeft: '25px',
    },
  },
  labTextDiv: {
    paddingRight: '25px',
    paddingBottom: '40px',
    [theme.breakpoints.up('md')]: {
      paddingLeft: '90px',
    },
    [theme.breakpoints.down('sm')]: {
      paddingLeft: '25px',
    },

    maxWidth: '500px',
  },
  labTextTitle: {
    paddingTop: '0px',
  },
  labTextBodyDiv: {
    padding: '20px 0px',
  },
  photographyNote: {
    fontSize: '12px',
    fontFamily: systemFonts,
    fontStyle: 'italic',
    float: 'right',
    paddingTop: '3px',
  },
  paperHeaderDiv: {
    backgroundColor: '#3A3A3A',
    padding: '30px 25px 200px 25px',
  },
  paperHeaderText: {
    color: '#ffffff',
    textAlign: 'center',
    padding: '0px 20px 0px 20px',
    [theme.breakpoints.up('md')]: {
      padding: '0px 80px 0px 80px',
    },
  },
  paperPanelWrapper: {
    padding: '20px 20px 90px 20px',
    marginTop: '-170px',
  },
  paperPanel: {
    backgroundColor: '#FCFCFC',
    border: '2px #EEEEEE solid',
    padding: '30px 50px',
  },
  paperPanelTitle: {
    textAlign: 'center',
    padding: '10px 20px 0px 20px',
  },
  pink: {
    color: '#FC9090',
  },
  paperPanelStepContainer: {
    paddingLeft: '0px',
    [theme.breakpoints.up('md')]: {
      paddingLeft: '25px',
    },
  },
  paperPanelStepNumber: {
    color: '#FC9090',
    fontFamily: systemFonts,
    fontSize: '12px',
    fontWeight: 'bold',
    paddingBottom: '5px',
  },
  paperPanelStepTitle: {
    color: '#2A2A2A',
    marginTop: '0px',
  },
  paperPanelStepBody: {
    color: '#3A3A3A',
    paddingBottom: '50px',
  },
  paperPanelStepIconDiv: {
    paddingLeft: '50px',
  },
  paperPanelStepIconMobileDiv: {
    textAlign: 'center',
    padding: '20px',
  },
  fightTogetherDiv: {
    backgroundColor: '#F5B33C',
    padding: '40px 0px',
  },
  fightTogetherDivText: {
    textAlign: 'left',
    color: '#FFFFFF',
    padding: '0px 25px 50px 25px',
    fontFamily: 'Lato',
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: '24px',
    lineHeight: '30px',
  },
  logo: {
    height: '50px',
    maxWidth: '200px',
  },
}))
export const Home: React.FunctionComponent<HomeProps> = (token: HomeProps) => {
  const { t } = useTranslation()

  const classes = useHomeStyles()

  const heroTextContent = (
    <Container maxWidth="lg">
      <div className={classes.heroTextDiv}>
        <h2 className={classes.heroText1}>{t('home.title1')}</h2>
        <h1 className={classes.heroText2}>{t('home.title2')}</h1>
      </div>
    </Container>
  )
  return (
    <div className="home">
      <div>
        <div className={classes.heroContainer}>
          <div className={classes.heroTextGradiant}></div>
          <Hidden mdUp>
            <img
              className={classes.heroImage}
              src={LandingPageAboveFold0Mobile}
              alt="heroImage1"
            />
          </Hidden>
          <Hidden smDown>
            <img
              className={classes.heroImage}
              src={LandingPageAboveFold0}
              alt="heroImage2"
            />
          </Hidden>
          {heroTextContent}
        </div>
        <div className={classes.content1}>
          <Container maxWidth="md" className={classes.containerButterflyText}>
            <div className={classes.content1TextDiv}>
              <div>{t('home.text1')}</div>
            </div>
          </Container>
          <Butterfly1 className={classes.butterfly1} />
        </div>
        <div className={classes.content2}>
          <Container maxWidth="md" className={classes.containerButterflyText}>
            <div className={classes.content2TextDiv}>
              <div>{t('home.text2')}</div>
            </div>
          </Container>
          <Butterfly2 className={classes.butterfly2} />
        </div>
      </div>

      <div className={classes.fightTogetherDiv}>
        <Container maxWidth="md" className={classes.containerButterflyText}>
          <div className={classes.content2TextDiv}>
            <div>{t('home.text3')}</div>
          </div>
        </Container>
        <Grid container justify="center" alignItems="center">
          <NavLink to="/eligibility" className={classes.navLink}>
            <Button
              color="primary"
              variant="contained"
              className={classes.joinButton}
            >
              {t('common.joinStudy')}
            </Button>
          </NavLink>
        </Grid>
      </div>
    </div>
  )
}

export default Home