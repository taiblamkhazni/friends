import { Injectable } from "@angular/core";
import {
  ActivatedRoute,
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from "@angular/router";
import { isValidId } from "app/partage/storageLocal";
import { param } from "jquery";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class ValidrouteGuard implements CanActivate {
  constructor(private router: Router, private route: ActivatedRoute) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    const id = Number(this.route.snapshot.paramMap.get("id"));
    console.log(id);

    if (!isValidId(this.route.snapshot.params["id"])) {
      this.router.navigateByUrl("/table-list");
      return false;
    }
    return true;
  }
}
