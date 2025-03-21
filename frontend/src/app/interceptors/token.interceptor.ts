import { HttpInterceptorFn } from '@angular/common/http';
import { environment } from '../../environments/environment.development';

const excludeUrls = [
  `${environment.apiUrl}/auth/spotify-url`,
  `${environment.apiUrl}/token`
];

export const tokenInterceptor: HttpInterceptorFn = (req, next) => {
  if (req.url == excludeUrls[0] || req.url == excludeUrls[1]) {
    return next(req);
  }

  const token = localStorage.getItem('token')!;

  const clonedRequest = req.clone({setHeaders: {
    Authorization: token
  }});

  return next(clonedRequest);
};

