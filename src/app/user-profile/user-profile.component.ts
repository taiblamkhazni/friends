import { InteretInterface } from "./../Interfaces/Interet.interface";

import { Component, OnInit } from "@angular/core";

import { ActivatedRoute } from "@angular/router";

import { UserviewInterface } from "../Interfaces/userview.interface";
import { UserInterface } from "../Interfaces/User.interface";
import { UsersService } from "../Services/users.service";
import { InteretService } from "../Services/interet.service";
import { getisAdmin } from "../partage/storageLocal";

import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: "app-user-profile",
  templateUrl: "./user-profile.component.html",
  styleUrls: ["./user-profile.component.css"],
})
export class UserProfileComponent implements OnInit {
  userview: UserviewInterface[] = [];
  userForm: UserInterface;
  $interets: InteretInterface[] = [];
  toppings: number[];
  isadmin: boolean;
  image: string = null;
  selectedFiles: any;
  firstName: string;
  lastName: string;

  constructor(
    private _usersService: UsersService,
    private route: ActivatedRoute,
    private interetService: InteretService,
    private spinner: NgxSpinnerService
  ) {}

  ngOnInit() {
    this.isadmin = getisAdmin();
    this.getAllInterets();
    this.getuserById(this.route.snapshot.params["id"]);
  }

  saveUser = () => {
    this.spinner.show();
    this.userForm.interestsIds = this.toppings;
    this.userForm.lastName = this.lastName;
    this.userForm.firstName = this.firstName;
    this._usersService
      .updateUser(this.userForm.id, this.userForm)
      .subscribe((res) => {});
    setTimeout(() => {
      this.spinner.hide();
    }, 5000);
  };

  getuserById = (id: number) => {
    this._usersService.getUserById(id).subscribe((res) => {
      this.userForm = res;
      if (this.userForm) {
        this.firstName = this.userForm.firstName;
        this.lastName = this.userForm.lastName;
        this.getImage();
      }
      this.toppings = this.userForm.interests.map((i) => {
        return i.id;
      });
      this.userview = this.userForm.friends;
      this.userForm.birthDate = new Date(res.birthDate)
        .toISOString()
        .split("T")[0];
    });
  };
  getAllInterets = () => {
    this.interetService.getinterets().subscribe(
      (res) => {
        this.$interets = res;
      },
      (error) => {}
    );
  };

  delateAmi(user) {
    this.spinner.show();
    this.userForm.friendsIds = this.userForm.friendsIds.filter((u) => {
      if (u != user.id) {
        return u;
      }
    });
    this._usersService
      .updateUser(this.userForm.id, this.userForm)
      .subscribe((res) => {
        this.getuserById(this.userForm.id);
      });
    setTimeout(() => {
      this.spinner.hide();
    }, 1000);
  }

  upload(event) {
    this.selectedFiles = event.target.files;

    if (this.selectedFiles.length === 0) return;

    const formData = new FormData();

    for (const file of this.selectedFiles) {
      formData.append(file.name, file);
      formData.append(
        "name",
        this.userForm.lastName + "" + this.userForm.firstName
      );
    }

    this._usersService.sendImage(formData).subscribe((res) => {
      this.spinner.show();
      //this.getuserById(this.userForm.id);
      this.selectedFiles = "";
      this.getImage();
      setTimeout(() => {
        this.spinner.hide();
      }, 3000);
    });
  }
  getImage = () => {
    this._usersService
      .getImage(this.lastName + this.firstName)
      .subscribe((res) => {
        if (res.content != "") {
          this.image = res.content;
        }
      });
  };
}
