import React from 'react'
import { Grid } from '@material-ui/core'

type Props = {
  children: React.ReactNode
}

function GridLayout({ children }: Props) {
  return (
    <Grid
      container
      direction="row"
      justify="center"
      alignItems="center"
      style={{ backgroundColor: '#F4F4F4' }}
    >
      <Grid item xs={12} md={8} lg={6}>
        {children}
      </Grid>
    </Grid>
  )
}

export default GridLayout
