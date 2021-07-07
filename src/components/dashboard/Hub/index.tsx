import React from 'react'
import { Route } from 'react-router'
import Hub from './Hub'
import Eligibility from '../../eligibility/Eligibility'
import Registration from '../../registration/'
import AboutTheStudy from '../AboutTheStudy'
import SummaryAndSignature from '../SummaryAndSignature'
import { ROUTES } from 'constants/constants'

function HubRouter() {
  return (
    <>
      <Route path={ROUTES.ELIGIBILITY}>
        <Eligibility />
      </Route>
      <Route path={ROUTES.REGISTRATION}>
        <Registration />
      </Route>
      <Route path={ROUTES.ABOUT_THE_STUDY}>
        <AboutTheStudy />
      </Route>
      <Route path={ROUTES.SUMMARY_AND_SIGNATURE}>
        <SummaryAndSignature />
      </Route>
      <Route exact path="/hub">
        <Hub />
      </Route>
    </>
  )
}

export default HubRouter
