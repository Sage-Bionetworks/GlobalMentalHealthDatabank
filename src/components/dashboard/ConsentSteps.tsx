import React, { useState } from 'react'
import { ReactComponent as LogoNoText } from '../../assets/logo-no-text.svg'
import { ReactComponent as ArrowButtonLeft } from '../../assets/arrow_button_left.svg'
import { ReactComponent as ArrowButtonRight } from '../../assets/arrow_button_right.svg'
import ProgressBar from '../progressBar/ProgressBar'
import FirstCommonConsentSection from './commonConsentSections/FirstCommonConsentSection'
import SecondCommonConsentSection from './commonConsentSections/SecondCommonConsentSection'
import ArmFlowOne from './armFlows/ArmFlowOne'
import ArmFlowTwo from './armFlows/ArmFlowTwo'
import ArmFlowThree from './armFlows/ArmFlowThree'
import ArmFlowFour from './armFlows/ArmFlowFour'
import { FLOW_OPTIONS } from '../../helpers/RandomFlowGenerator'
import { UserDataGroup } from '../../types/types'

const FIRST_CONSENT_STEPS: number = 5
const SECOND_CONSENT_STEPS: number = 10

type ConsentStepsProps = {
  dataGroups: Array<string>
}

const ConsentSteps: React.FunctionComponent<ConsentStepsProps> = ({
  dataGroups,
}: ConsentStepsProps) => {
  const [step, setStep] = useState(1)

  const findMaxSteps = () => {
    let steps = FIRST_CONSENT_STEPS + SECOND_CONSENT_STEPS
    if (dataGroups.includes(FLOW_OPTIONS.ONE as UserDataGroup)) steps++
    if (dataGroups.includes(FLOW_OPTIONS.TWO as UserDataGroup)) steps++
    if (dataGroups.includes(FLOW_OPTIONS.THREE as UserDataGroup)) steps++
    if (dataGroups.includes(FLOW_OPTIONS.FOUR as UserDataGroup)) steps += 4
    return steps
  }

  const findSecondCommonStepsStart = () => {
    return (
      FIRST_CONSENT_STEPS +
      (dataGroups.includes(FLOW_OPTIONS.FOUR as UserDataGroup) ? 4 : 1)
    )
  }

  const renderArmFlow = () => {
    if (dataGroups.includes(FLOW_OPTIONS.ONE as UserDataGroup))
      return <ArmFlowOne />
    if (dataGroups.includes(FLOW_OPTIONS.TWO as UserDataGroup))
      return <ArmFlowTwo />
    if (dataGroups.includes(FLOW_OPTIONS.THREE as UserDataGroup))
      return <ArmFlowThree />
    if (dataGroups.includes(FLOW_OPTIONS.FOUR as UserDataGroup))
      return <ArmFlowFour />
    return null
  }

  const maxSteps = findMaxSteps()
  const secondCommonStepsStart = findSecondCommonStepsStart()

  if (step <= FIRST_CONSENT_STEPS) {
    return (
      <FirstCommonConsentSection
        step={step}
        setStep={setStep}
        maxSteps={maxSteps}
      />
    )
  }

  if (step > FIRST_CONSENT_STEPS && step <= secondCommonStepsStart) {
    return (
      <div className="textStepWrapper">
        <ProgressBar step={step} maxSteps={maxSteps} />
        <LogoNoText />
        <div className="headerWrapper">
          <h1>This is an arm flow</h1>
        </div>
        {renderArmFlow()}
        <div className="arrowButtonsWrapper">
          <ArrowButtonLeft
            onClick={() =>
              setStep((current: number) =>
                current > 1 ? current - 1 : current,
              )
            }
          />
          <ArrowButtonRight
            onClick={() =>
              setStep((current: number) =>
                current < maxSteps ? current + 1 : current,
              )
            }
          />
        </div>
      </div>
    )
  }

  if (step > secondCommonStepsStart) {
    return (
      <SecondCommonConsentSection
        step={step}
        setStep={setStep}
        maxSteps={maxSteps}
        startingStep={secondCommonStepsStart}
      />
    )
  }

  return null
}

export default ConsentSteps
