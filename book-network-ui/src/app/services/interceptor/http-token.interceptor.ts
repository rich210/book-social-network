import { HttpHeaders, HttpInterceptorFn } from '@angular/common/http';
import { TokenService } from '../token/token.service';
import { inject } from '@angular/core';

export const httpTokenInterceptor: HttpInterceptorFn = (req, next) => {
  const tokenService = inject(TokenService);
  const token = tokenService.token
  console.log("Interceptor")
  console.log(token);

  if (token) {
    const clone = req.clone({
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + token
      })
    });
    console.log(clone)
    return next(clone)
  }
  return next(req);
};
