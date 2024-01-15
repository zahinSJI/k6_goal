import http from 'k6/http';
import { sleep, check } from 'k6';

export default function () {

  let formData = {
    username: 'one',
    password: 'one',
    signon: 'Login',
    _sourcePage: 'f2OvuaxWhEIZTh0VHEv7Qc0reOyRW5qFaS0Y0SRoSgHtzpUTD5uDNyDj6aTLr_onQ4lrH9FO89XXwBi3UODb5Id4soOHcZw8dOSag-Igcb0=',
    __fp: 'rx1ZouQ0Vmnv7060XkniiONaiI8JqbWSfStXt2fFvk20Woc5G3sc77s2I2vGvmoo',
  };

  let headers = {
    'Content-Type': 'application/x-www-form-urlencoded',
  };

  //The POST request
  let res = http.post('https://petstore.octoperf.com/actions/Account.action', formData, { headers: headers })

  console.log(res.body);
  
  check(res, {
    'Logged in successfully': (r) => r.body.includes('Welcome one!'),
  })
}