import { UserDataGroup } from 'types/types'

type FlowOptions = {
  ONE: UserDataGroup
  TWO: UserDataGroup
  THREE: UserDataGroup
  FOUR: UserDataGroup
}

export const FLOW_OPTIONS: FlowOptions = {
  ONE: 'researcher_norms',
  TWO: 'youth_informed',
  THREE: 'hybrid',
  FOUR: 'participant_choice',
}

type ArmOptions = {
  ONE: UserDataGroup
  TWO: UserDataGroup
}

export const ARM_OPTIONS: ArmOptions = {
  ONE: 'ARM1_choice',
  TWO: 'ARM2_assigned',
}

export const getRandomFlowOption = () => {
  let rnd = Math.random()
  if (rnd < 1 / 4) return FLOW_OPTIONS.FOUR
  if (rnd >= 1 / 4 && rnd < 1 / 2) return FLOW_OPTIONS.ONE
  if (rnd >= 1 / 2 && rnd < 3 / 4) return FLOW_OPTIONS.TWO
  if (rnd >= 3 / 4) return FLOW_OPTIONS.THREE
}

export const getRandomArm = () => {
  if (Math.random() < 0.5) {
    return ARM_OPTIONS.ONE
  } else {
    return ARM_OPTIONS.TWO
  }
}
