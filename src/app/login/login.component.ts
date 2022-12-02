import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import {
  addisAdmin,
  addToken,
  addUserIdStorage,
} from "app/partage/storageLocal";
import { LoginService } from "app/services/login.service";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"],
})
export class LoginComponent implements OnInit {
  public loginValid = true;

  user = {
    email: "",
    password: "",
  };
  constructor(private router: Router, private _loginservice: LoginService) {}

  ngOnInit() {}

  addStorage = (token: string, id: number, admin: boolean) => {
    addUserIdStorage(id);
    addToken(token);
    addisAdmin(admin);
    this.router.navigateByUrl("/table-list");
  };
  login() {
    this._loginservice.Login(this.user).subscribe((res) => {
      this.addStorage(res.token, res.user.id, res.user.isAdmin);
      this.router.navigateByUrl("/table-list");
    });
  }
}
