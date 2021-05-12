import React from 'react'
import { Typography } from '@material-ui/core'
import { default as Form } from 'react-jsonschema-form'
import Button from '@material-ui/core/Button'
import Separator from '../static/Separator'
import { ReactComponent as ErrorMessageIcon } from '../../assets/error_message_icon.svg'
import { ReactComponent as InfoMessageIcon } from '../../assets/info_message_icon.svg'
import { FORM_IDS } from '../../components/form/types'
import {
  schemaCountrySelector,
  uiSchemaCountrySelector,
} from '../../data/schemas/countrySelector'
import {
  schemaHowToParticipate,
  uiSchemaHowToParticipate,
} from '../../data/schemas/howToParticipate'
import {
  schemaAgeVerify,
  uiSchemaAgeVerify,
} from '../../data/schemas/ageVerify'
import {
  schemaAndroidVerify,
  uiSchemaAndroidVerify,
} from '../../data/schemas/androidVerify'
import {
  schemaSupportVerify,
  uiSchemaSupportVerify,
} from '../../data/schemas/supportVerify'
import {
  schemaHowDidYouHear,
  uiSchemaHowDidYouHear,
} from '../../data/schemas/howDidYouHear'
import {
  schemaUnderstandsEnglish,
  uiSchemaUnderstandsEnglish,
} from '../../data/schemas/understandsEnglish'
import {
  schemaHowResearchersAccess,
  uiSchemaHowResearchersAccess,
} from '../../data/schemas/howResearchersAccess'
import {
  schemaWouldYouLikeToVolunteer,
  uiSchemaWouldYouLikeToVolunteer,
} from '../../data/schemas/wouldYouLikeToVolunteer'
import {
  schemaWhoControlsData,
  uiSchemaWhoControlsData,
} from '../../data/schemas/whoControlsData'
import {
  schemaWhatIsThePurpose,
  uiSchemaWhatIsThePurpose,
} from '../../data/schemas/whatIsThePurpose'
import {
  schemaWhichIsCorrect,
  uiSchemaWhichIsCorrect,
} from '../../data/schemas/whichIsCorrect'
import { schemaGender, uiSchemaGender } from '../../data/schemas/gender'
import { cloneDeep, shuffle } from 'lodash'
import { useTranslation } from 'react-i18next'

type FormSchema = {
  properties?: any
  definitions?: any
}

type SageFormProps = {
  formId: string
  onSubmit: any
  title: string
  subTitle?: string
  errorMessage?: string
  infoMessage?: string
  buttonText?: string
  widgets?: any
}

export default function SageForm({
  formId,
  onSubmit,
  title,
  subTitle,
  errorMessage,
  infoMessage,
  buttonText,
  widgets,
}: SageFormProps) {
  const { t } = useTranslation()

  const getSchemaFromId = (id: string) => {
    let schemaCopy
    let shuffledOptions
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
      case FORM_IDS.HOW_RESEARCHERS_ACCESS:
        schemaCopy = cloneDeep(schemaHowResearchersAccess)
        shuffledOptions = shuffle(
          schemaCopy.properties.how_researchers_access.enum,
        )
        schemaCopy.properties.how_researchers_access.enum = shuffledOptions
        return schemaCopy
      case FORM_IDS.WHO_CONTROLS_DATA:
        schemaCopy = cloneDeep(schemaWhoControlsData)
        shuffledOptions = shuffle(
          Array.from(
            Array(schemaCopy.properties.who_controls_data.enum.length).keys(),
          ),
        )
        let shuffledEnum = []
        let shuffledEnumNames = []
        for (let i = 0; i < shuffledOptions.length; i++) {
          let indexOption = shuffledOptions[i]
          shuffledEnum[i] =
            schemaWhoControlsData.properties.who_controls_data.enum[indexOption]
          shuffledEnumNames[i] =
            schemaWhoControlsData.properties.who_controls_data.enumNames[
              indexOption
            ]
        }
        schemaCopy.properties.who_controls_data.enum = shuffledEnum
        schemaCopy.properties.who_controls_data.enumNames = shuffledEnumNames
        return schemaCopy
      case FORM_IDS.WOULD_LIKE_TO_VOLUNTEER:
        return schemaWouldYouLikeToVolunteer
      case FORM_IDS.WHAT_IS_THE_PURPOSE:
        return schemaWhatIsThePurpose
      case FORM_IDS.WHICH_IS_CORRECT:
        return schemaWhichIsCorrect
      case FORM_IDS.GENDER:
        return schemaGender
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
      case FORM_IDS.HOW_RESEARCHERS_ACCESS:
        return uiSchemaHowResearchersAccess
      case FORM_IDS.WHO_CONTROLS_DATA:
        return uiSchemaWhoControlsData
      case FORM_IDS.WOULD_LIKE_TO_VOLUNTEER:
        return uiSchemaWouldYouLikeToVolunteer
      case FORM_IDS.WHAT_IS_THE_PURPOSE:
        return uiSchemaWhatIsThePurpose
      case FORM_IDS.WHICH_IS_CORRECT:
        return uiSchemaWhichIsCorrect
      case FORM_IDS.GENDER:
        return uiSchemaGender
      default:
        return null
    }
  }

  return (
    <>
      <div className="header-wrapper">
        <Typography variant="h4">{title}</Typography>
      </div>
      <div className="form-subtitle">
        {subTitle && <Typography variant="h6">{subTitle}</Typography>}
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
          widgets={widgets || undefined}
        >
          <div className="text-center">
            <Button
              color="primary"
              variant="contained"
              size="large"
              type="submit"
              className="wide-button"
            >
              {buttonText || t('form.submit')}
            </Button>
          </div>
        </Form>
      </div>
    </>
  )
}
