import React from 'react'
import { useTranslation } from 'react-i18next'
import { Typography, Button } from '@material-ui/core'

type Props = {
  handleYes: () => void
  handleNo: () => void
}
function SignUpVerification({ handleYes, handleNo }: Props) {
  const { t } = useTranslation()
  return (
    <div className="btm-50 text-center">
      <div className="btm-50">
        <Typography variant="h4">{t('signIn.haveYouSignedIn')}</Typography>
      </div>

      <div className="btm-30">
        <Button
          fullWidth
          color="primary"
          variant="contained"
          size="large"
          type="submit"
          className="wide-button"
          onClick={handleYes}
        >
          {t('common.yes')}
        </Button>
      </div>
      <Button
        fullWidth
        color="primary"
        variant="contained"
        size="large"
        type="submit"
        className="wide-button"
        onClick={handleNo}
      >
        {t('common.no')}
      </Button>
    </div>
  )
}

export default SignUpVerification
