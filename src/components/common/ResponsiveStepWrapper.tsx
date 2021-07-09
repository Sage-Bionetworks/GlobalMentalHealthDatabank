import React from 'react'
import { Grid } from '@material-ui/core'

type Props = {
  children: React.ReactNode
  variant?: 'default' | 'card'
}

function ResponsiveStepWrapper({ children, variant }: Props) {
  return (
    <div className={`responsive-step ${variant === 'card' ? 'card' : ''}`}>
      <div className="responsive-step__top-bg"></div>
      <div className="responsive-step__content">
        <Grid container direction="row" justify="center" alignItems="center">
          <Grid item xs={12} md={8} lg={6}>
            <div className="responsive-step__content__inner">{children}</div>
          </Grid>
        </Grid>
      </div>
    </div>
  )
}

export default ResponsiveStepWrapper
