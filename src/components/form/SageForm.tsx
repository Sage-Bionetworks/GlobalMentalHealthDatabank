import React from 'react'
import { Typography, Button } from '@material-ui/core'
import { default as Form } from 'react-jsonschema-form'
import Alert from '@material-ui/lab/Alert/Alert'

import Separator from '../static/Separator'
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

import {
  schemaMentalHealthExperience,
  uiSchemaMentalHealthExperience,
} from '../../data/schemas/mentalHealthExperience'

import {
  schemaResearchersDataAccess,
  uiSchemaResearchersDataAccess,
} from '../../data/schemas/researchersDataAccess'

import {
  schemaDataResearchType,
  uiSchemaDataResearchType,
} from '../../data/schemas/dataResearchType'

import {
  schemaResearchersDataProfit,
  uiSchemaResearchersDataProfit,
} from '../../data/schemas/researchersDataProfit'

import {
  schemaDataPayment,
  uiSchemaDataPayment,
} from '../../data/schemas/dataPayment'

import {
  schemaDataUsage,
  uiSchemaDataUsage,
} from '../../data/schemas/dataUsage'

import {
  schemaDataSharing,
  uiSchemaDataSharing,
} from '../../data/schemas/dataSharing'

import {
  schemaResearchersDataUsage,
  uiSchemaResearchersDataUsage,
} from '../../data/schemas/researchersDataUsage'

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
  onChange?: any
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
  onChange,
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
      case FORM_IDS.WHAT_IS_THE_PURPOSE:
        return schemaWhatIsThePurpose
      case FORM_IDS.WHICH_IS_CORRECT:
        return schemaWhichIsCorrect
      case FORM_IDS.GENDER:
        return schemaGender
      case FORM_IDS.MENTAL_HEALTH_EXPERIENCE:
        return schemaMentalHealthExperience
      case FORM_IDS.RESEARCHERS_DATA_ACCESS:
        return schemaResearchersDataAccess
      case FORM_IDS.DATA_RESEARCH_TYPE:
        return schemaDataResearchType
      case FORM_IDS.RESEARCHERS_DATA_PROFIT:
        return schemaResearchersDataProfit
      case FORM_IDS.DATA_PAYMENT:
        return schemaDataPayment
      case FORM_IDS.DATA_USAGE:
        return schemaDataUsage
      case FORM_IDS.DATA_SHARING:
        return schemaDataSharing
      case FORM_IDS.RESEARCHERS_DATA_USAGE:
        return schemaResearchersDataUsage
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
      case FORM_IDS.HOW_DID_YOU_HEAR:
        return uiSchemaHowDidYouHear
      case FORM_IDS.UNDERSTANDS_ENGLISH:
        return uiSchemaUnderstandsEnglish
      case FORM_IDS.HOW_RESEARCHERS_ACCESS:
        return uiSchemaHowResearchersAccess
      case FORM_IDS.WHO_CONTROLS_DATA:
        return uiSchemaWhoControlsData
      case FORM_IDS.WHAT_IS_THE_PURPOSE:
        return uiSchemaWhatIsThePurpose
      case FORM_IDS.WHICH_IS_CORRECT:
        return uiSchemaWhichIsCorrect
      case FORM_IDS.GENDER:
        return uiSchemaGender
      case FORM_IDS.MENTAL_HEALTH_EXPERIENCE:
        return uiSchemaMentalHealthExperience
      case FORM_IDS.RESEARCHERS_DATA_ACCESS:
        return uiSchemaResearchersDataAccess
      case FORM_IDS.DATA_RESEARCH_TYPE:
        return uiSchemaDataResearchType
      case FORM_IDS.RESEARCHERS_DATA_PROFIT:
        return uiSchemaResearchersDataProfit
      case FORM_IDS.DATA_PAYMENT:
        return uiSchemaDataPayment
      case FORM_IDS.DATA_USAGE:
        return uiSchemaDataUsage
      case FORM_IDS.DATA_SHARING:
        return uiSchemaDataSharing
      case FORM_IDS.RESEARCHERS_DATA_USAGE:
        return uiSchemaResearchersDataUsage
      default:
        return null
    }
  }

  return (
    <>
      <Typography variant="h3">{title}</Typography>

      {subTitle && (
        <div className="form-subtitle">
          <Typography variant="body2">{subTitle}</Typography>
        </div>
      )}

      {errorMessage && <Alert severity="error">{errorMessage}</Alert>}

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
          onChange={onChange || undefined}
        >
          <div className="text-center">
            <Button
              className="wide-button"
              color="primary"
              variant="contained"
              size="large"
              type="submit"
            >
              {buttonText || t('form.submit')}
            </Button>
          </div>
        </Form>
      </div>
    </>
  )
}
