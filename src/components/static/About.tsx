import React from 'react'
import { useHistory } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { Typography } from '@material-ui/core'
import { ReactComponent as MagnifyingGlass } from '../../assets/about/magnifying-glass.svg'
import { ReactComponent as Target } from '../../assets/about/target.svg'
import { ReactComponent as QuestionMarks } from '../../assets/about/question-marks.svg'
import { ReactComponent as CheckMark } from '../../assets/about/check-mark.svg'
import { ReactComponent as Clock } from '../../assets/about/clock.svg'
import { ReactComponent as Phone } from '../../assets/about/phone.svg'
import { ReactComponent as Door } from '../../assets/about/door.svg'
import { ReactComponent as Lock } from '../../assets/about/lock.svg'
import { ReactComponent as DB } from '../../assets/about/db.svg'

function About() {
  const { t } = useTranslation()
  const { push } = useHistory()
  const goToEligibility = () => {
    push('/eligibility')
  }
  return (
    <div className="about">
      <div className="about-the-study">
        <div className="striped-circle"></div>
        <div className="butterflies"></div>
        <Typography variant="h2">{t('about.title')}</Typography>
        <Typography>{t('about.paragraph1')}</Typography>
        <Typography>{t('about.paragraph2')}</Typography>
      </div>
      <div className="make-difference">
        <Typography variant="h4">{t('about.makeDifference')}</Typography>
        <button onClick={goToEligibility}>{t('common.joinStudy')}</button>
      </div>
      <div className="ten-things">
        <Typography variant="h2" className="ten-things__title">
          {t('about.tenThings')}
        </Typography>
        <div className="things__wrapper">
          <div className="thing">
            <div className="thing__header">
              <MagnifyingGlass />
              <Typography variant="h4">{t('about.thing1.title')}</Typography>
            </div>
            <Typography>{t('about.thing1.text')}</Typography>
          </div>
          <div className="thing">
            <div className="thing__header">
              <Target />
              <Typography variant="h4">{t('about.thing2.title')}</Typography>
            </div>
            <Typography>{t('about.thing2.text')}</Typography>
          </div>
          <div className="thing">
            <div className="thing__header">
              <QuestionMarks />
              <Typography variant="h4">{t('about.thing3.title')}</Typography>
            </div>
            <Typography>{t('about.thing3.text')}</Typography>
          </div>
          <div className="thing">
            <div className="thing__header">
              <CheckMark />
              <Typography variant="h4">{t('about.thing4.title')}</Typography>
            </div>
            <Typography>{t('about.thing4.text')}</Typography>
          </div>
          <div className="thing">
            <div className="thing__header">
              <Clock />
              <Typography variant="h4">{t('about.thing5.title')}</Typography>
            </div>
            <Typography>{t('about.thing5.text')}</Typography>
          </div>
          <div className="thing">
            <div className="thing__header">
              <Phone />
              <Typography variant="h4">{t('about.thing6.title')}</Typography>
            </div>
            <Typography>{t('about.thing6.text')}</Typography>
          </div>
          <div className="thing">
            <div className="thing__header">
              <Door />
              <Typography variant="h4">{t('about.thing7.title')}</Typography>
            </div>
            <Typography>{t('about.thing7.text')}</Typography>
          </div>
          <div className="thing">
            <div className="thing__header">
              <Lock />
              <Typography variant="h4">{t('about.thing8.title')}</Typography>
            </div>
            <Typography>{t('about.thing8.text')}</Typography>
          </div>
          <div className="thing">
            <div className="thing__header">
              <DB />
              <Typography variant="h4">{t('about.thing9.title')}</Typography>
            </div>
            <Typography>{t('about.thing9.text')}</Typography>
          </div>
        </div>
      </div>
      <div className="ready-to-join">
        <div className="butterfly" />
        <div className="text-section">
          <Typography variant="h2">{t('about.readyToJoin.title')}</Typography>
          <Typography>{t('about.readyToJoin.text')}</Typography>
        </div>
        <div className="button-section">
          <div className="butterflies"></div>
          <button onClick={goToEligibility} className="button-join-study">
            {t('common.joinStudy')}
          </button>
        </div>
      </div>
    </div>
  )
}

export default About
