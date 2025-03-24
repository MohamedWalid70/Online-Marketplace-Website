import { LoadingService } from './../../services/loading/loading.service';
import { HttpEventType, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { tap } from 'rxjs';

export const loadingInterceptor: HttpInterceptorFn = (req, next) => {
  
  let loadingService: LoadingService = inject(LoadingService);

  return next(req).pipe(
    tap((event) => {
      if (event.type === HttpEventType.Response) {
        loadingService.setLoader(true);
      }
    })
  );
};
