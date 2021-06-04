import React from 'react'
import { Typography } from '@material-ui/core'
import { useTranslation } from 'react-i18next'

function Disclaimer() {
  const { t } = useTranslation()

  return (
    <div className="disclaimer">
      <Typography className="disclaimer__text" variant="body2">
        {t('common.disclaimer')}
      </Typography>
    </div>
  )
}

export default Disclaimer
