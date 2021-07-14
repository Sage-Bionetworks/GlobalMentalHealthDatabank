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
import { ROUTES } from 'constants/constants'

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

  const history = useHistory()

  const getArmFlowMaxSteps = () => {
    const MAX_STEPS = {
      [FLOW_OPTIONS.ONE]: 3,
      [FLOW_OPTIONS.TWO]: 9,
      [FLOW_OPTIONS.THREE]: 9,
      [FLOW_OPTIONS.FOUR]: 10,
    }

    const armFlow = clientData.consentModel as UserDataGroup
    return MAX_STEPS[armFlow]
  }

  const handleNext = (fields: object = {}) => {
    if (checkpoint) {
      const nextStep = step < getArmFlowMaxSteps() ? step + 1 : step
      const newCheckpoint = cloneDeep(checkpoint)
      newCheckpoint.aboutDataSharing.step = nextStep
      updateClientData({
        ...fields,
        checkpoint: newCheckpoint,
      })
    }
  }

  const handleBackToHub = () => {
    if (checkpoint) {
      const newCheckpoint = cloneDeep(checkpoint)
      newCheckpoint.aboutDataSharing.status = 'started'
      newCheckpoint.aboutDataSharing.step = 1
      updateClientData({
        checkpoint: newCheckpoint,
      })
      history.push(ROUTES.HUB)
    }
  }

  const handleBack = (steps: number = 1) => {
    if (checkpoint) {
      const prevStep = step - steps >= 1 ? step - steps : step
      const newCheckpoint = cloneDeep(checkpoint)
      newCheckpoint.aboutDataSharing.step = prevStep
      updateClientData({
        checkpoint: newCheckpoint,
      })
    }
  }

  const handleComplete = (fields: object = {}) => {
    if (checkpoint) {
      const nextStep = step < getArmFlowMaxSteps() ? step + 1 : step
      const newCheckpoint = cloneDeep(checkpoint)
      newCheckpoint.aboutDataSharing.step = nextStep
      newCheckpoint.aboutDataSharing.status = 'complete'
      newCheckpoint.summaryAndSignature.status = 'started'
      updateClientData({
        ...fields,
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
          maxSteps={getArmFlowMaxSteps()}
          handleNext={handleNext}
          handleBack={handleBack}
          handleComplete={handleComplete}
          updateClientData={updateClientData}
          handleBackToHub={handleBackToHub}
        />
      )}
      {dataGroups.includes(FLOW_OPTIONS.TWO as UserDataGroup) && (
        <ArmFlowTwo
          step={step}
          maxSteps={getArmFlowMaxSteps()}
          handleNext={handleNext}
          handleBack={handleBack}
          handleComplete={handleComplete}
          updateClientData={updateClientData}
          RankedChoice={RankedChoice}
          handleBackToHub={handleBackToHub}
        />
      )}
      {dataGroups.includes(FLOW_OPTIONS.THREE as UserDataGroup) && (
        <ArmFlowThree
          step={step}
          maxSteps={getArmFlowMaxSteps()}
          handleNext={handleNext}
          handleBack={handleBack}
          handleComplete={handleComplete}
          updateClientData={updateClientData}
          RankedChoice={RankedChoice}
          handleBackToHub={handleBackToHub}
        />
      )}
      {dataGroups.includes(FLOW_OPTIONS.FOUR as UserDataGroup) && (
        <ArmFlowFour
          step={step}
          maxSteps={getArmFlowMaxSteps()}
          handleNext={handleNext}
          handleBack={handleBack}
          handleComplete={handleComplete}
          updateClientData={updateClientData}
          RankedChoice={RankedChoice}
          clientData={clientData}
          handleBackToHub={handleBackToHub}
        />
      )}
    </>
  )
}

export default AboutDataSharing
