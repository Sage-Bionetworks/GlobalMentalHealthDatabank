import React from 'react'

//Flows should be distributed on a 50-50 first and 1/3 each on one half
//run with npm run test ../GlobalMentalHealthDatabank/src/RandomFlowSelectorTest.test.tsx
test('Generate Random Flow Selection', () => {
    let rand1 = function() {
        let randomCount = [0,0,0,0];
        const totalCount = 10000000
        for (let i=0; i<totalCount; i++) {
            let rnd = Math.random()
            if (rnd <= 0.5) randomCount[3]++;
            if (rnd > 0.5 && rnd <= 2/3) randomCount[0]++;
            if (rnd > 2/3 && rnd <= 5/6) randomCount[1]++;
            if (rnd > 5/6) randomCount[2]++;
        }
        console.log('total count expected: ' + totalCount)
        console.log('total count actual: ' +  + randomCount.reduce((a, b) => a + b, 0))
        console.log('expected 16.667%. Actual pct: ' + (randomCount[0]/totalCount * 100))
        console.log('expected 16.667%. Actual pct: ' + (randomCount[1]/totalCount * 100))
        console.log('expected 16.667%. Actual pct: ' + (randomCount[2]/totalCount * 100))
        console.log('expected 50%. Actual pct: ' + (randomCount[3]/totalCount * 100))
      };
      rand1();
  });

