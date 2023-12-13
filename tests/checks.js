// https://designer.mocky.io/
//checks are like soft assertions, they don't stop the test execution

import http from "k6/http"
import { check } from "k6"

export default function () {
    let response = http.get('https://run.mocky.io/v3/a72c3418-42b7-499d-be79-06f15cc3db5f')
    // let response = http.get('https://run.mocky.io/v3/59c6d482-af94-4a90-b717-45bd31503d4c') //returns response body

    console.log(`Res bod length ${response.body.length} for VU ${__VU} Iteration: ${__ITER}`)

    check(response, {
        'Response status code: 200': (r) => r.status === 200,
        'Body size not 0': (r) => (r.body.length == 0)
    })
}