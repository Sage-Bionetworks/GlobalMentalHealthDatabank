import React from 'react'
import { default as Form } from 'react-jsonschema-form'
import Button from '@material-ui/core/Button'
import Separator from '../static/Separator'
import { ReactComponent as ErrorMessageIcon } from '../../assets/error_message_icon.svg'
import { ReactComponent as InfoMessageIcon } from '../../assets/info_message_icon.svg'
import { FORM_IDS } from '../../components/form/types'
import {
  schemaCountrySelector,
  uiSchemaCountrySelector,
} from '../schemas/countrySelector'
import {
  schemaHowToParticipate,
  uiSchemaHowToParticipate,
} from '../schemas/howToParticipate'
import { schemaAgeVerify, uiSchemaAgeVerify } from '../schemas/ageVerify'
import {
  schemaAndroidVerify,
  uiSchemaAndroidVerify,
} from '../schemas/androidVerify'
import {
  schemaSupportVerify,
  uiSchemaSupportVerify,
} from '../schemas/supportVerify'
import {
  schemaHowDidYouHear,
  uiSchemaHowDidYouHear,
} from '../schemas/howDidYouHear'
import {
  schemaUnderstandsEnglish,
  uiSchemaUnderstandsEnglish,
} from '../schemas/understandsEnglish'
import { useTranslation } from 'react-i18next'

type FormSchema = {
  properties?: any
  definitions?: any
}

type SageFormProps = {
  formId: string
  onSubmit: any
  title: string
  errorMessage?: string
  infoMessage?: string
  buttonText?: string
}

export default function SageForm({
  formId,
  onSubmit,
  title,
  errorMessage,
  infoMessage,
  buttonText,
}: SageFormProps) {
  const { t } = useTranslation()

  const getSchemaFromId = (id: string) => {
    switch (id) {
      case FORM_IDS.COUNTRY_SELECTOR:
        return schemaCountrySelector
      case FORM_IDS.HOW_TO_PARTICIPATE:
        return schemaHowToParticipate
      case FORM_IDS.AGE_VERIFY:
        return schemaAgeVerify
      case FORM_IDS.ANDROID_VERIFY:
        return schemaAndroidVerify
      case FORM_IDS.SUPPORT_VERIFY:
        return schemaSupportVerify
      case FORM_IDS.HOW_DID_YOU_HEAR:
        return schemaHowDidYouHear
      case FORM_IDS.UNDERSTANDS_ENGLISH:
        return schemaUnderstandsEnglish
      default:
        return null
    }
  }

  const getUISchemaFromId = (id: string) => {
    switch (id) {
      case FORM_IDS.COUNTRY_SELECTOR:
        return uiSchemaCountrySelector
      case FORM_IDS.HOW_TO_PARTICIPATE:
        return uiSchemaHowToParticipate
      case FORM_IDS.AGE_VERIFY:
        return uiSchemaAgeVerify
      case FORM_IDS.ANDROID_VERIFY:
        return uiSchemaAndroidVerify
      case FORM_IDS.SUPPORT_VERIFY:
        return uiSchemaSupportVerify
      case FORM_IDS.HOW_DID_YOU_HEAR:
        return uiSchemaHowDidYouHear
      case FORM_IDS.UNDERSTANDS_ENGLISH:
        return uiSchemaUnderstandsEnglish
      default:
        return null
    }
  }

  return (
    <>
      <div className="headerWrapper">
        <h1>{title}</h1>
      </div>

      {errorMessage && (
        <div className="form-message error">
          <ErrorMessageIcon />
          {errorMessage}
        </div>
      )}

      {infoMessage && (
        <div className="form-message">
          <InfoMessageIcon />
          {infoMessage}
        </div>
      )}

      <Separator />

      <div className="sageForm">
        <Form
          onSubmit={onSubmit}
          schema={getSchemaFromId(formId) as FormSchema}
          uiSchema={getUISchemaFromId(formId) as FormSchema}
        >
          <div className="text-center">
            <Button
              color="primary"
              variant="contained"
              size="large"
              type="submit"
              className="wideButton"
            >
              {buttonText || t('form.submit')}
            </Button>
          </div>
        </Form>
      </div>
    </>
  )
}
