import React from 'react'
import { useHistory } from 'react-router-dom'
import { cloneDeep } from 'lodash'
import ArmFlowOne from './armFlows/ArmFlowOne'
import ArmFlowTwo from './armFlows/ArmFlowTwo'
import ArmFlowThree from './armFlows/ArmFlowThree'
import ArmFlowFour from './armFlows/ArmFlowFour'
import RankedChoice from './RankedChoice/RankedChoice'
import { FLOW_OPTIONS } from 'helpers/RandomFlowGenerator'
import { UserDataGroup, Checkpoint } from 'types/types'
import { PAGE_ID_FIELD_NAME, ROUTES } from 'constants/constants'

type Props = {
  checkpoint?: Checkpoint
  dataGroups?: Array<string>
  updateClientData: Function
  clientData: any
}

function AboutDataSharing({
  checkpoint,
  dataGroups = [],
  updateClientData,
  clientData,
}: Props) {
  const step = checkpoint?.aboutDataSharing?.step || 1
  const maxSteps = 4
  const history = useHistory()

  const handleNext = (pageId: string | undefined) => {
    if (checkpoint) {
      const nextStep = step < maxSteps ? step + 1 : step
      const newCheckpoint = cloneDeep(checkpoint)
      newCheckpoint.aboutDataSharing.step = nextStep
      updateClientData({
        [PAGE_ID_FIELD_NAME]: pageId,
        checkpoint: newCheckpoint,
      })
    }
  }
  const handleBack = () => {
    if (checkpoint) {
      const prevStep = step > 1 ? step - 1 : step
      const newCheckpoint = cloneDeep(checkpoint)
      newCheckpoint.aboutDataSharing.step = prevStep
      updateClientData({
        checkpoint: newCheckpoint,
      })
    }
  }

  const handleComplete = (pageId: string | undefined) => {
    if (checkpoint) {
      const nextStep = step < maxSteps ? step + 1 : step
      const newCheckpoint = cloneDeep(checkpoint)
      newCheckpoint.aboutDataSharing.step = nextStep
      newCheckpoint.aboutDataSharing.status = 'complete'
      newCheckpoint.summaryAndSignature.status = 'started'
      updateClientData({
        [PAGE_ID_FIELD_NAME]: pageId,
        checkpoint: newCheckpoint,
      })
      history.push(ROUTES.HUB)
    }
  }

  return (
    <>
      {dataGroups.includes(FLOW_OPTIONS.ONE as UserDataGroup) && (
        <ArmFlowOne
          step={step}
          handleNext={handleNext}
          handleBack={handleBack}
          handleComplete={handleComplete}
          maxSteps={maxSteps}
          updateClientData={updateClientData}
        />
      )}
      {dataGroups.includes(FLOW_OPTIONS.TWO as UserDataGroup) && (
        <ArmFlowTwo
          step={step}
          handleNext={handleNext}
          handleBack={handleBack}
          handleComplete={handleComplete}
          maxSteps={maxSteps}
          updateClientData={updateClientData}
          RankedChoice={RankedChoice}
        />
      )}
      {dataGroups.includes(FLOW_OPTIONS.THREE as UserDataGroup) && (
        <ArmFlowThree
          step={step}
          handleNext={handleNext}
          handleBack={handleBack}
          handleComplete={handleComplete}
          maxSteps={maxSteps}
          updateClientData={updateClientData}
          RankedChoice={RankedChoice}
        />
      )}
      {dataGroups.includes(FLOW_OPTIONS.FOUR as UserDataGroup) && (
        <ArmFlowFour
          step={step}
          handleNext={handleNext}
          handleBack={handleBack}
          handleComplete={handleComplete}
          updateClientData={updateClientData}
          RankedChoice={RankedChoice}
          clientData={clientData}
        />
      )}
    </>
  )
}

export default AboutDataSharing
