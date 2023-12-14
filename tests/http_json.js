// https://designer.mocky.io/

import http from "k6/http"
import { check } from "k6"

/*
Header is 'content - type' application/json
{
"msg":"123"
}
*/
export default function () {
    let url= 'https://run.mocky.io/v3/12cc663a-fea0-47a8-b685-f651a5b8027e'
    let headerParam = {
        headers: {
            'Content-Type': 'application/json'
        }
    }

    const response = http.get(url, headerParam)

    check(response, {
        'Status 200': (r)=> r.status === 200
    })

    let b = response.body
    let body = JSON.parse(b)
    console.log(`Response body ${b}`)
    console.log(`Response body message ${body.msg}`)

    check(response, {
        'Message': body.msg === '123'
    })
}