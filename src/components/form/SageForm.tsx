import React from 'react'
import { default as Form } from 'react-jsonschema-form'
import Button from '@material-ui/core/Button'
import Separator from '../static/Separator'
import { ReactComponent as ErrorMessageIcon } from '../../assets/error_message_icon.svg'
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

type FormSchema = {
  properties?: any
  definitions?: any
}

type SageFormProps = {
  formId: string
  onSubmit: any
  title: string
  errorMessage?: string
}

export default function SageForm({
  formId,
  onSubmit,
  title,
  errorMessage,
}: SageFormProps) {
  const getSchemaFromId = (id: string) => {
    switch (id) {
      case 'countrySelector':
        return schemaCountrySelector
      case 'howToParticipate':
        return schemaHowToParticipate
      case 'ageVerify':
        return schemaAgeVerify
      case 'androidVerify':
        return schemaAndroidVerify
      case 'supportVerify':
        return schemaSupportVerify
      default:
        return null
    }
  }

  const getUISchemaFromId = (id: string) => {
    switch (id) {
      case 'countrySelector':
        return uiSchemaCountrySelector
      case 'howToParticipate':
        return uiSchemaHowToParticipate
      case 'ageVerify':
        return uiSchemaAgeVerify
      case 'androidVerify':
        return uiSchemaAndroidVerify
      case 'supportVerify':
        return uiSchemaSupportVerify
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
        <div className="errorMessage">
          <ErrorMessageIcon />
          {errorMessage}
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
              Submit
            </Button>
          </div>
        </Form>
      </div>
    </>
  )
}
