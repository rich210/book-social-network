import { DOCUMENT } from '@angular/common';
import { Inject, Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  localStorage: Storage | undefined
  constructor(@Inject(DOCUMENT) private doc: Document) {
    this.localStorage = doc.defaultView?.localStorage;
  }

  set token(token:string){
    if(this.localStorage){
      this.localStorage.setItem('token', token);
    }
    
  }

  get token(){
    if(this.localStorage){
      return this.localStorage.getItem('token') as string
    }
    console.error('Token not found')
    return '';
  }

  isTokenValid() {
    const token = this.token;
    if (!token) {
      return false;
    }
    // decode the token
    const jwtHelper = new JwtHelperService();
    // check expiry date
    const isTokenExpired = jwtHelper.isTokenExpired(token);
    if (isTokenExpired) {
      localStorage.clear();
      return false;
    }
    return true;
  }

  isTokenNotValid() {
    return !this.isTokenValid();
  }

  get userRoles(): string[] {
    const token = this.token;
    if (token) {
      const jwtHelper = new JwtHelperService();
      const decodedToken = jwtHelper.decodeToken(token);
      console.log(decodedToken.authorities);
      return decodedToken.authorities;
    }
    return [];
  }
}
