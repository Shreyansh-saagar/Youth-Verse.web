import { inject } from "@angular/core";
import { AuthService } from "./auth.service";
import { Router } from "@angular/router";
import { catchError, map, of } from "rxjs";

export const authGuard = () => {
  const auth = inject(AuthService)
  const router = inject(Router)
  return auth.checkAuth().pipe(map((res)=>{
    const isAuthenticated = Object.values(res)[0];
    console.log('isAuthenticated', isAuthenticated);
    if(isAuthenticated){
      return true;
    }else{
      console.log('user not authenticated');
      router.navigate(['/login']);
      return false;
    }
  }),
  catchError(()=>{
    console.log('error at auth guard');
    router.navigate(['/login']);
    return of(false)
  })
)
};
