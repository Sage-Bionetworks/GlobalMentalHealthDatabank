import React from 'react'
import { Route } from 'react-router'
import Hub from './Hub'
import Eligibility from '../../eligibility/Eligibility'
import Registration from '../../registration/'
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
      <Route exact path="/hub">
        <Hub />
      </Route>
    </>
  )
}

export default HubRouter
