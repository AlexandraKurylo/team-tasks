import { DatePipe, PercentPipe, TitleCasePipe } from '@angular/common';
import { Component, inject, input, numberAttribute } from '@angular/core';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { RouterLink } from '@angular/router';
import { catchError, of, switchMap } from 'rxjs';
import { UserService } from '../../services/user-service';

@Component({
  selector: 'app-user-details-page',
  imports: [RouterLink, DatePipe, PercentPipe, TitleCasePipe],
  templateUrl: './user-details-page.html',
  styleUrl: './user-details-page.scss',
})
export class UserDetailsPage {
  private userService = inject(UserService);

  id = input.required({ transform: numberAttribute });

  details = toSignal(
    toObservable(this.id).pipe(
      switchMap(id =>
        this.userService.getUserDetails(id).pipe(
          catchError(() => of(null)),
        ),
      ),
    ),
  );
}
