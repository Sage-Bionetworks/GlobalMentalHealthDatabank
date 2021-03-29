export const FLOW_OPTIONS = {
  ONE: 'test_arm_1',
  TWO: 'test_arm_2',
  THREE: 'test_arm_3',
  FOUR: 'test_arm_4',
}

export const getRandomFlowOption = () => {
  let rnd = Math.random()
  if (rnd < 1 / 4) return FLOW_OPTIONS.FOUR
  if (rnd >= 1 / 4 && rnd < 1 / 2) return FLOW_OPTIONS.ONE
  if (rnd >= 1 / 2 && rnd < 3 / 4) return FLOW_OPTIONS.TWO
  if (rnd >= 3 / 4) return FLOW_OPTIONS.THREE
  return 'FLOW_SELECTION_ERROR'
}
