import React from 'react'
import { Typography } from '@material-ui/core'

function Disclaimer() {
  return (
    <div className="disclaimer">
      <Typography className="disclaimer__text" variant="body2">
        The MindKind Study is a research study and does not provide medical
        advice, diagnosis or treatment.
      </Typography>
    </div>
  )
}

export default Disclaimer
