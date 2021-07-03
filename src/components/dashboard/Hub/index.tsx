import React from 'react'
import { Route } from 'react-router'
import Hub from './Hub'
import Eligibility from '../../eligibility/Eligibility'

function HubRouter() {
  return (
    <>
      <Route path="/hub/eligibility">
        <Eligibility />
      </Route>
      <Route exact path="/hub">
        <Hub />
      </Route>
    </>
  )
}

export default HubRouter
