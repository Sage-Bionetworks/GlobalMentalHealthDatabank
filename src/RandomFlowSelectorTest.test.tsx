import React from 'react'

//Flows should be distributed on a 50-50 first and 1/3 each on one half
//npm run test ../GlobalMentalHealthDatabank/src/RandomFlowSelectorTest.test.tsx
test('Generate Random Flow Selection', () => {
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
    console.log('Total count expected: ' + totalCount)
    console.log(
      'Total count actual: ' + actualCount,
    )
    expect(totalCount).toBe(actualCount);

    //First flow test
    let firstFlowCount = (randomCount[0] / totalCount) * 100
    let actualValueFirstFlowCount = Math.abs(firstFlowCount - 16.667)

    console.log(
      'expected 16.667%. Actual pct: ' + firstFlowCount,
    )
    expect(actualValueFirstFlowCount).toBeLessThan(5);

    //Second flow test
    let secondFlowCount = (randomCount[1] / totalCount) * 100
    let actualValueSecondFlowCount = Math.abs(secondFlowCount - 16.667)

    console.log(
      'expected 16.667%. Actual pct: ' + secondFlowCount,
    )
    expect(actualValueSecondFlowCount).toBeLessThan(5);

    //Third flow test
    let thirdFlowCount = (randomCount[2] / totalCount) * 100
    let actualValueThirdFlowCount = Math.abs(secondFlowCount - 16.667)

    console.log(
      'expected 16.667%. Actual pct: ' + thirdFlowCount,
    )
    expect(actualValueThirdFlowCount).toBeLessThan(5)

    //Fourth flow test    
    let fourthFlowCount = (randomCount[3] / totalCount) * 100
    let actualValueFourthFlowCount = Math.abs(fourthFlowCount - 50)

    console.log(
      'expected 50%. Actual pct: ' + fourthFlowCount,
    )
    expect(actualValueFourthFlowCount).toBeLessThan(5)
  }
  rand1()
})
