import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SanitizeService {

  constructor() { }

  isEmail(email) {
    const regExEmail = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
    if (!email.match(regExEmail)) {
      alert("Expected email, found " + email);
      return false;
    }
    return true;
  }

  isString(str) {
    const regExName = /^[a-zA-Z0-9 àâçéèêëîïôûùüÿñæœ\',]*$/;
    if (!str || !str.match(regExName)) {
      alert("Format not supported");
      return false;
    }
    return true;
  }
}
