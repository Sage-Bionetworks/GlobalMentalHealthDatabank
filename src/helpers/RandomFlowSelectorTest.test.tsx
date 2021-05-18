import React from 'react'

//Flows should be distributed on a 50-50 first and 1/3 each on one half
//npm run test ../GlobalMentalHealthDatabank/src/RandomFlowSelectorTest.test.tsx
xtest('Generate Random Flow Selection for 4.5k', () => {
  let rand1 = function () {
    let randomCount = [0, 0, 0, 0]
    const totalCount = 4500
    for (let i = 0; i < totalCount; i++) {
      let rnd = Math.random()
      if (rnd < 1 / 4) randomCount[0]++
      if (rnd >= 1 / 4 && rnd < 1 / 2) randomCount[1]++
      if (rnd >= 1 / 2 && rnd < 3 / 4) randomCount[2]++
      if (rnd >= 3 / 4) randomCount[3]++
    }

    //Actual count test
    let actualCount = randomCount.reduce((a, b) => a + b, 0)
    console.log(`Total runs expected: ${totalCount}`)
    console.log(`Total runs performed: ${actualCount}`)
    expect(totalCount).toBe(actualCount)

    let expectedPercent = 25

    //First flow test
    let firstFlowCount = (randomCount[0] / totalCount) * 100
    let actualValueFirstFlowCount = Math.abs(firstFlowCount - expectedPercent)
    let tolerance = 2

    console.log(`Expected 25%, got: ${firstFlowCount}`)
    console.log(
      `Threshold: ${tolerance}, actual difference: ${actualValueFirstFlowCount}`,
    )
    expect(actualValueFirstFlowCount).toBeLessThan(tolerance)

    //Second flow test
    let secondFlowCount = (randomCount[1] / totalCount) * 100
    let actualValueSecondFlowCount = Math.abs(secondFlowCount - expectedPercent)

    console.log(`Expected 25%, got: ${secondFlowCount}`)
    console.log(
      `Threshold: ${tolerance}, actual difference: ${actualValueSecondFlowCount}`,
    )
    expect(actualValueSecondFlowCount).toBeLessThan(tolerance)

    //Third flow test
    let thirdFlowCount = (randomCount[2] / totalCount) * 100
    let actualValueThirdFlowCount = Math.abs(thirdFlowCount - expectedPercent)

    console.log(`Expected 25%, got: ${thirdFlowCount}`)
    console.log(
      `Threshold: ${tolerance}, actual difference: ${actualValueThirdFlowCount}`,
    )
    expect(actualValueThirdFlowCount).toBeLessThan(tolerance)

    //Fourth flow test
    let fourthFlowCount = (randomCount[3] / totalCount) * 100
    let actualValueFourthFlowCount = Math.abs(fourthFlowCount - expectedPercent)

    console.log(`Expected 25%, got: ${fourthFlowCount}`)
    console.log(
      `Threshold: ${tolerance}, actual difference: ${actualValueFourthFlowCount}`,
    )
    expect(actualValueFourthFlowCount).toBeLessThan(tolerance)
  }
  rand1()
})

//Flows should be distributed on a 50-50 first and 1/3 each on one half
//npm run test ../GlobalMentalHealthDatabank/src/RandomFlowSelectorTest.test.tsx
test('Generate Random Flow Selection for 10mil', () => {
  let rand1 = function () {
    let randomCount = [0, 0, 0, 0]
    const totalCount = 10000000
    for (let i = 0; i < totalCount; i++) {
      let rnd = Math.random()
      if (rnd < 1 / 4) randomCount[0]++
      if (rnd >= 1 / 4 && rnd < 1 / 2) randomCount[1]++
      if (rnd >= 1 / 2 && rnd < 3 / 4) randomCount[2]++
      if (rnd >= 3 / 4) randomCount[3]++
    }

    //Actual count test
    let actualCount = randomCount.reduce((a, b) => a + b, 0)
    console.log(`Total runs expected: ${totalCount}`)
    console.log(`Total runs performed: ${actualCount}`)
    expect(totalCount).toBe(actualCount)

    let expectedPercent = 25

    //First flow test
    let firstFlowCount = (randomCount[0] / totalCount) * 100
    let actualValueFirstFlowCount = Math.abs(firstFlowCount - expectedPercent)
    let tolerance = 0.05

    console.log(`Expected 25%, got: ${firstFlowCount}`)
    console.log(
      `Threshold: ${tolerance}, actual difference: ${actualValueFirstFlowCount}`,
    )
    expect(actualValueFirstFlowCount).toBeLessThan(tolerance)

    //Second flow test
    let secondFlowCount = (randomCount[1] / totalCount) * 100
    let actualValueSecondFlowCount = Math.abs(secondFlowCount - expectedPercent)

    console.log(`Expected 25%, got: ${secondFlowCount}`)
    console.log(
      `Threshold: ${tolerance}, actual difference: ${actualValueSecondFlowCount}`,
    )
    expect(actualValueSecondFlowCount).toBeLessThan(tolerance)

    //Third flow test
    let thirdFlowCount = (randomCount[2] / totalCount) * 100
    let actualValueThirdFlowCount = Math.abs(thirdFlowCount - expectedPercent)

    console.log(`Expected 25%, got: ${thirdFlowCount}`)
    console.log(
      `Threshold: ${tolerance}, actual difference: ${actualValueThirdFlowCount}`,
    )
    expect(actualValueThirdFlowCount).toBeLessThan(tolerance)

    //Fourth flow test
    let fourthFlowCount = (randomCount[3] / totalCount) * 100
    let actualValueFourthFlowCount = Math.abs(fourthFlowCount - expectedPercent)

    console.log(`Expected 25%, got: ${fourthFlowCount}`)
    console.log(
      `Threshold: ${tolerance}, actual difference: ${actualValueFourthFlowCount}`,
    )
    expect(actualValueFourthFlowCount).toBeLessThan(tolerance)
  }
  rand1()
})
