import React, { useState } from 'react'
import ArmFlowOne from './armFlows/ArmFlowOne'
import ArmFlowTwo from './armFlows/ArmFlowTwo'
import ArmFlowThree from './armFlows/ArmFlowThree'
import ArmFlowFour from './armFlows/ArmFlowFour'
import RankedChoice from './RankedChoice/RankedChoice'
import { FLOW_OPTIONS } from 'helpers/RandomFlowGenerator'
import { UserDataGroup } from 'types/types'

type Props = {
  dataGroups?: Array<string>
  updateClientData: Function
}

function AboutDataSharing({ dataGroups = [], updateClientData }: Props) {
  const [step, setStep] = useState(1)
  const maxSteps = 4
  return (
    <>
      {dataGroups.includes(FLOW_OPTIONS.ONE as UserDataGroup) && (
        <ArmFlowOne
          step={step}
          setStep={setStep}
          maxSteps={maxSteps}
          updateClientData={updateClientData}
        />
      )}
      {dataGroups.includes(FLOW_OPTIONS.TWO as UserDataGroup) && (
        <ArmFlowTwo
          step={step}
          setStep={setStep}
          maxSteps={maxSteps}
          updateClientData={updateClientData}
        />
      )}
      {dataGroups.includes(FLOW_OPTIONS.THREE as UserDataGroup) && (
        <ArmFlowThree
          step={step}
          setStep={setStep}
          maxSteps={maxSteps}
          updateClientData={updateClientData}
          startingStep={5 + 1}
          RankedChoice={RankedChoice}
        />
      )}
      {dataGroups.includes(FLOW_OPTIONS.FOUR as UserDataGroup) && (
        <ArmFlowFour
          step={step}
          setStep={setStep}
          maxSteps={maxSteps}
          updateClientData={updateClientData}
        />
      )}
    </>
  )
}

export default AboutDataSharing
