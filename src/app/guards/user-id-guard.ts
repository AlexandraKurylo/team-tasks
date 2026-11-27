import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const userIdGuard: CanActivateFn = route => {
  const id = Number(route.paramMap.get('id'));
  return Number.isInteger(id) && id > 0
    ? true
    : inject(Router).createUrlTree(['/not-found']);
};