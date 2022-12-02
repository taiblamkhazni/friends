import { Injectable } from "@angular/core";
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from "@angular/router";
import {
  loggedIn,
  removeAdmin,
  removeId,
  removeToken,
} from "app/partage/storageLocal";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    if (!loggedIn()) {
      removeToken();
      removeId();
      removeAdmin();
      this.router.navigateByUrl("/login");
      return false;
    }
    return true;
  }
}
