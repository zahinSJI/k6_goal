// https://designer.mocky.io/
//checks are like soft assertions, they don't stop the test execution

import http from "k6/http"
import { check } from "k6"
import { Rate } from "k6/metrics"

export let errRate = new Rate('errors')

export let options= {
    thresholds: {
        errors: ['rate<0.1'] // less than 10%
    }
}

export default function () {
    let response = http.get('https://run.mocky.io/v3/a72c3418-42b7-499d-be79-06f15cc3db5f')
    // let response = http.get('https://run.mocky.io/v3/59c6d482-af94-4a90-b717-45bd31503d4c') //returns response body

    console.log(`Res bod length ${response.body.length} for VU ${__VU} Iteration: ${__ITER}`)

    const checkVal1 = check(response, {
        'Response status code: 200': (r) => r.status === 200
    })
    console.log(checkVal1)
    errRate.add(!checkVal1)

    const checkVal2 = check(response, {
        'Body size not 0': (r) => (r.body.length == 0)
    })
    console.log(checkVal2)
    errRate.add(!checkVal2)
}