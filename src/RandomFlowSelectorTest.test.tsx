import React from 'react'

//Flows should be distributed on a 50-50 first and 1/3 each on one half
//npm run test ../GlobalMentalHealthDatabank/src/RandomFlowSelectorTest.test.tsx
test('Generate Random Flow Selection for 4.5k', () => {
  let rand1 = function () {
    let randomCount = [0, 0, 0, 0]
    const totalCount = 4500
    for (let i = 0; i < totalCount; i++) {
      let rnd = Math.random()
      if (rnd <= 0.5) randomCount[3]++
      if (rnd > 0.5 && rnd <= 2 / 3) randomCount[0]++
      if (rnd > 2 / 3 && rnd <= 5 / 6) randomCount[1]++
      if (rnd > 5 / 6) randomCount[2]++
    }

    //Actual count test
    let actualCount = randomCount.reduce((a, b) => a + b, 0)
    console.log(`Total runns expected: ${totalCount}`)
    console.log(`Total runns performed: ${actualCount}`)
    expect(totalCount).toBe(actualCount)

    let expectedPercent = 50 / 3

    //First flow test
    let firstFlowCount = (randomCount[0] / totalCount) * 100
    let actualValueFirstFlowCount = Math.abs(firstFlowCount - expectedPercent)
    let tolerance = 2

    console.log(`Expected 16.667%, got: ${firstFlowCount}`)
    console.log(
      `Threshold: ${tolerance}, actual difference: ${actualValueFirstFlowCount}`,
    )
    expect(actualValueFirstFlowCount).toBeLessThan(tolerance)

    //Second flow test
    let secondFlowCount = (randomCount[1] / totalCount) * 100
    let actualValueSecondFlowCount = Math.abs(secondFlowCount - expectedPercent)

    console.log(`Expected 16.667%, got: ${secondFlowCount}`)
    console.log(
      `Threshold: ${tolerance}, actual difference: ${actualValueSecondFlowCount}`,
    )
    expect(actualValueSecondFlowCount).toBeLessThan(tolerance)

    //Third flow test
    let thirdFlowCount = (randomCount[2] / totalCount) * 100
    let actualValueThirdFlowCount = Math.abs(thirdFlowCount - expectedPercent)

    console.log(`Expected 16.667%, got: ${thirdFlowCount}`)
    console.log(
      `Threshold: ${tolerance}, actual difference: ${actualValueThirdFlowCount}`,
    )
    expect(actualValueThirdFlowCount).toBeLessThan(tolerance)

    //Fourth flow test
    let fourthFlowCount = (randomCount[3] / totalCount) * 100
    let actualValueFourthFlowCount = Math.abs(fourthFlowCount - 50)

    console.log(`Expected 50%, got: ${fourthFlowCount}`)
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
      if (rnd <= 0.5) randomCount[3]++
      if (rnd > 0.5 && rnd <= 2 / 3) randomCount[0]++
      if (rnd > 2 / 3 && rnd <= 5 / 6) randomCount[1]++
      if (rnd > 5 / 6) randomCount[2]++
    }

    //Actual count test
    let actualCount = randomCount.reduce((a, b) => a + b, 0)
    console.log(`Total runns expected: ${totalCount}`)
    console.log(`Total runns performed: ${actualCount}`)
    expect(totalCount).toBe(actualCount)

    let expectedPercent = 50 / 3

    //First flow test
    let firstFlowCount = (randomCount[0] / totalCount) * 100
    let actualValueFirstFlowCount = Math.abs(firstFlowCount - expectedPercent)
    let tolerance = 0.05

    console.log(`Expected 16.667%, got: ${firstFlowCount}`)
    console.log(
      `Threshold: ${tolerance}, actual difference: ${actualValueFirstFlowCount}`,
    )
    expect(actualValueFirstFlowCount).toBeLessThan(tolerance)

    //Second flow test
    let secondFlowCount = (randomCount[1] / totalCount) * 100
    let actualValueSecondFlowCount = Math.abs(secondFlowCount - expectedPercent)

    console.log(`Expected 16.667%, got: ${secondFlowCount}`)
    console.log(
      `Threshold: ${tolerance}, actual difference: ${actualValueSecondFlowCount}`,
    )
    expect(actualValueSecondFlowCount).toBeLessThan(tolerance)

    //Third flow test
    let thirdFlowCount = (randomCount[2] / totalCount) * 100
    let actualValueThirdFlowCount = Math.abs(thirdFlowCount - expectedPercent)

    console.log(`Expected 16.667%, got: ${thirdFlowCount}`)
    console.log(
      `Threshold: ${tolerance}, actual difference: ${actualValueThirdFlowCount}`,
    )
    expect(actualValueThirdFlowCount).toBeLessThan(tolerance)

    //Fourth flow test
    let fourthFlowCount = (randomCount[3] / totalCount) * 100
    let actualValueFourthFlowCount = Math.abs(fourthFlowCount - 50)

    console.log(`Expected 50%, got: ${fourthFlowCount}`)
    console.log(
      `Threshold: ${tolerance}, actual difference: ${actualValueFourthFlowCount}`,
    )
    expect(actualValueFourthFlowCount).toBeLessThan(tolerance)
  }
  rand1()
})
