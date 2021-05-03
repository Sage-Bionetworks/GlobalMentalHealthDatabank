import React from 'react'
import { Grid } from '@material-ui/core'

type Props = {
  children: React.ReactNode
}

function ElegibilityStepWrapper({ children }: Props) {
  return (
    <div className="elegibilityWrapper">
      <div className="top-bg"></div>
      <div className="elegibilityContent">
        <Grid container direction="row" justify="center" alignItems="center">
          <Grid item xs={12} md={8} lg={6}>
            <div className="elegibilityContentInner">{children}</div>
          </Grid>
        </Grid>
      </div>
    </div>
  )
}

export default ElegibilityStepWrapper