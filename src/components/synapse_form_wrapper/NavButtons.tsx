import * as React from 'react'
import { Step, NavActionEnum } from './types'
import {
  faChevronLeft,
  faChevronRight,
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export interface NavButtonsProps {
  isWizardMode?: boolean
  previousStepIds: string[]
  onNavAction: Function
  steps: Step[]
  currentStep: Step
  isFormSubmitted?: boolean
  isNoSaveButton?: boolean
}

export interface NextStepLinkProps {
  onNavAction: Function
  steps: Step[]
  nextStepId: string | undefined
}

export function NavButtons(props: NavButtonsProps): JSX.Element {
  // in wizard mode we build an array of the previous steps. In regular mode back goes to
  // a previous order step
  const canGoBack = (props: NavButtonsProps): boolean => {
    if (props.isWizardMode) {
      return props.previousStepIds && props.previousStepIds.length > 0
    } else {
      return props.steps.findIndex(step => step.id === props.currentStep.id) > 0
    }
  }

  const previousButton = canGoBack(props) ? (
    <button
      type="button"
      onClick={e => props.onNavAction(NavActionEnum.PREVIOUS)}
      className="btn btn-link nav-link prev"
    >
      <FontAwesomeIcon icon={faChevronLeft} />
    </button>
  ) : (
    <></>
  )

  const nextButton = !props.currentStep.final ? (
    <button
      type="button"
      onClick={e => props.onNavAction(NavActionEnum.NEXT)}
      className="btn btn-link nav-link next"
    >
      <FontAwesomeIcon icon={faChevronRight} />
    </button>
  ) : (
    props.isNoSaveButton? (
      <button
      type="button"
      className="btn btn-action save"
      disabled={props.isFormSubmitted}
      onClick={e => props.onNavAction(NavActionEnum.SUBMIT)}
    >
      SUBMIT
    </button>
    ): 
    <></>
  )

  const saveButton = (!props.currentStep.final && !props.isNoSaveButton) ?(
    <button
      type="button"
      className="btn btn-action save"
      disabled={props.isFormSubmitted}
      onClick={e => props.onNavAction(NavActionEnum.SAVE)}
    >
      SAVE
    </button>
  ): (
    <></>
  )

  return (
    <div>
      <hr></hr>
      <div className="buttonWrapper pull-right">
        {previousButton} {nextButton} {saveButton}
      </div>
    </div>
  )
}

export function NextStepLink(props: NextStepLinkProps): JSX.Element {
  const nextStep = props.steps.find(step => step.id === props.nextStepId)
  if (typeof nextStep === 'undefined') {
    return <></>
  }
  return (
    <span className="nav-link">
      <a onClick={e => props.onNavAction(nextStep)}>{nextStep.title}</a>
      <FontAwesomeIcon icon={faChevronRight}></FontAwesomeIcon>
    </span>
  )
}
