import { Injectable } from "@angular/core";
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from "@angular/router";
import { loggedIn } from "app/partage/storageLocal";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class AfterauthGuard implements CanActivate {
  constructor(private router: Router) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    if (loggedIn()) {
      this.router.navigateByUrl("/table-list");
      return false;
    }
    return true;
  }
}
