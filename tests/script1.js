import http from "k6/http"

export let options = {
    stages: [
        { duration: '10s', target: 5 },
        { duration: "10s", target: 3 },
        { duration: "10s", target: 0 }
    ],
    // vus: 10,
    // duration: "10s"
}

export default function () {
    http.get("https://www.google.com")
    http.get("https://www.facebook.com")
}