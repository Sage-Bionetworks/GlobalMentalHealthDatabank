import React, { useState, useEffect } from 'react'
import { makeStyles, Button, Grid, Hidden, Container } from '@material-ui/core'
import { playfairDisplayFont, openSansFont } from '../../App'
import LandingPageAboveFold0 from '../../assets/LandingPageAboveFold0.png'
import LandingPageAboveFold0Mobile from '../../assets/LandingPageAboveFold0_mobile.png'
import { NavLink } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

type IntroProps = {
  token: string | null
}

export const useIntroStyles = makeStyles(theme => ({
  heroContainer: {
    position: 'relative',
    overflow: 'hidden',
    minHeight: '375px',
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
  heroText: {
    color: '#F2F2F2',
  },
  heroTextDiv: {
    zIndex: 2,
    position: 'relative',

    [theme.breakpoints.up('xs')]: {
      padding: '25px 20px 30px 30px',
      maxWidth: '250px',
    },
    [theme.breakpoints.up('sm')]: {
      padding: '30px 20px 45px 40px',
      maxWidth: '450px',
    },
    [theme.breakpoints.up('md')]: {
      padding: '120px 20px 100px 40px',
      maxWidth: '650px',
    },
    [theme.breakpoints.up('lg')]: {
      padding: '180px 20px 130px 40px',
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
    '&:hover': {
      textDecoration: 'none',
    },
    '&:focus': {
      textDecoration: 'none',
    },
  },
  content1: {
    fontFamily: playfairDisplayFont,
    backgroundColor: '#343F56',
    textAlign: 'left',
    fontWeight: 'bold',
    paddingTop: '50px',
    paddingBottom: '50px',
    display: 'flex',
    justifyContent: 'center',
  },
  content1TextDiv: {
    color: 'white',
    paddingLeft: '20px',
    paddingRight: '20px',
    fontFamily: 'Lato',
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: '24px',
    lineHeight: '30px',
    [theme.breakpoints.up('sm')]: {
      fontSize: '24px',
    },
  },
  content2: {
    fontFamily: playfairDisplayFont,
    backgroundColor: '#4DB3B7',
    textAlign: 'left',
    fontWeight: 'bold',
    paddingTop: '50px',
    paddingBottom: '50px',
    display: 'flex',
    justifyContent: 'center',
  },
  content2TextDiv: {
    color: 'white',
    paddingLeft: '20px',
    paddingRight: '20px',
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
    fontFamily: openSansFont,
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
    fontFamily: openSansFont,
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
export const Intro: React.FunctionComponent<IntroProps> = ({}: IntroProps) => {
  const { t } = useTranslation()

  const classes = useIntroStyles()

  const heroTextContent = (
    <Container maxWidth="lg">
      <div className={classes.heroTextDiv}>
        <h2 className={classes.heroText}>{t('home.title1')}</h2>
        <h1 className={classes.heroText}>{t('home.title2')}</h1>
      </div>
    </Container>
  )
  return (
    <div className="Intro">
      <div>
        <div className={classes.heroContainer}>
          <div className={classes.heroTextGradiant}></div>
          <Hidden mdUp>
            <img
              className={classes.heroImage}
              src={LandingPageAboveFold0Mobile}
            />
          </Hidden>
          <Hidden smDown>
            <img className={classes.heroImage} src={LandingPageAboveFold0} />
          </Hidden>
          {heroTextContent}
        </div>
        <div className={classes.content1}>
          <Container maxWidth="md">
            <div className={classes.content1TextDiv}>
              <div>{t('home.text1')}</div>
            </div>
          </Container>
        </div>
        <div className={classes.content2}>
          <Container maxWidth="md">
            <div className={classes.content2TextDiv}>
              <div>{t('home.text2')}</div>
            </div>
          </Container>
        </div>
      </div>
      <div className={classes.fightTogetherDiv}>
        <h2 className={classes.fightTogetherDivText}>{t('home.text3')}</h2>
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

export default Intro
