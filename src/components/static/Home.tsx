import React from 'react'
import { Typography, Button, Grid } from '@material-ui/core'
import { NavLink } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { ReactComponent as Butterfly1 } from '../../assets/home/butterfly1.svg'
import { ReactComponent as Butterfly2 } from '../../assets/home/butterfly2.svg'
import { ReactComponent as Butterflies } from '../../assets/home/butterflies.svg'
import { ReactComponent as HeartOverlay } from '../../assets/home/heart-overlay.svg'
import { ReactComponent as HeartOverlay2 } from '../../assets/home/heart-overlay2.svg'
import { ReactComponent as Book } from '../../assets/home/book.svg'
import { ReactComponent as Lifesaver } from '../../assets/home/lifesaver.svg'
import { ReactComponent as Circle } from '../../assets/home/circle.svg'
import { ReactComponent as PlusSigns } from '../../assets/home/plus-signs.svg'
import { ROUTES } from '../../constants/constants'

export const Home: React.FunctionComponent = () => {
  const { t } = useTranslation()
  return (
    <div className="home">
      <div className="home__container">
        <div className="home__title-container">
          <Typography variant="h4" className="home__subtitle">
            {t('home.title1')}
          </Typography>
          <Typography variant="h1" className="home__title">
            {t('home.title2-from-youth')}
            <span style={{ display: 'block' }}>
              {t('home.title2-for-health')}
            </span>
          </Typography>
        </div>
        <HeartOverlay className="heart-svg-bg-top" />
      </div>
      <div className="home__cards-wrapper">
        <div className="home__section home__cards-wrapper-item">
          <div className="home__butterfly-text">
            <div className="home__section-container">
              <Book width="95" />
              <Typography variant="h4" className="home__section-text">
                {t('home.text1')}
              </Typography>
            </div>
          </div>
        </div>

        <div className="home__section home__cards-wrapper-item">
          <div className="home__butterfly-text">
            <div className="home__section-container">
              <Lifesaver width="95" />
              <Typography variant="h4" className="home__section-text">
                {t('home.text2')}
              </Typography>
            </div>
          </div>
        </div>

        <div className="home__fight-together-container home__cards-wrapper-item">
          <Butterfly1 className="butterfly1-svg" />
          <Butterfly2 className="butterfly2-svg" />
          <HeartOverlay2 className="heart-svg-bg-bottom" />
          <Circle className="circle-svg" />
          <PlusSigns className="home-plus-signs" />
          <div className="home__butterfly-text-container">
            <Butterflies className="butterflies-svg" />
            <div className="home__butterfly-text">
              <Typography
                variant="h4"
                className="home__section-text bottom-section"
              >
                {t('home.text3')}
              </Typography>
            </div>
            <Grid container justify="center" alignItems="center">
              <NavLink to={ROUTES.ABOUT} className="home__nav-link">
                <Button
                  color="primary"
                  variant="contained"
                  className="home__join-button"
                >
                  {t('common.learnMore')}
                </Button>
              </NavLink>
            </Grid>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home
