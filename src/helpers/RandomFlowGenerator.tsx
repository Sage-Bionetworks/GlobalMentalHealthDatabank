export const getRandomFlowOption = () => {
  let options = {
    ONE: 'option1',
    TWO: 'option2',
    THREE: 'option3',
    FOUR: 'option4',
  }
  let rnd = Math.random()
  if (rnd < 0.5) return options.FOUR
  if (rnd >= 0.5 && rnd < 2 / 3) return options.ONE
  if (rnd >= 2 / 3 && rnd < 5 / 6) return options.TWO
  if (rnd >= 5 / 6) return options.THREE
}
