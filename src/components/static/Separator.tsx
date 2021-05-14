import React from 'react'
import { Grid } from '@material-ui/core'

export const Separator: React.FunctionComponent = () => {
  return (
    <Grid
      container
      direction="row"
      justify="flex-start"
      alignItems="center"
      className="bottom-fifty-wrapper"
    >
      <svg
        width="100"
        height="4"
        viewBox="0 0 100 4"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect width="100" height="4" fill="#343F56" />
      </svg>
    </Grid>
  )
}

export default Separator
