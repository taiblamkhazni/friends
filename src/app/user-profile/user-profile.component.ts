import { InteretInterface } from "./../Interfaces/Interet.interface";

import { Component, OnInit } from "@angular/core";

import { ActivatedRoute } from "@angular/router";

import { UserviewInterface } from "../Interfaces/userview.interface";
import { UserInterface } from "../Interfaces/User.interface";
import { UsersService } from "../Services/users.service";
import { InteretService } from "../Services/interet.service";
import { getisAdmin, getUserIdStorage } from "../partage/storageLocal";

@Component({
  selector: "app-user-profile",
  templateUrl: "./user-profile.component.html",
  styleUrls: ["./user-profile.component.css"],
})
export class UserProfileComponent implements OnInit {
  /*  users: UserInterface[] = [];
  
  interests: InteretInterface[] = [];
  
   */

  userview: UserviewInterface[] = [];
  userForm: UserInterface;
  $interets: InteretInterface[] = [];
  toppings: number[];
  isadmin: boolean;
  image: any;
  selectedFiles: any;

  constructor(
    private _usersService: UsersService,
    private route: ActivatedRoute,
    private interetService: InteretService
  ) {}

  ngOnInit() {
    this.isadmin = getisAdmin();
    this.getAllInterets();
    this.getuserById(this.route.snapshot.params["id"]);
    this.getImageUser();
  }

  saveUser = () => {
    this.userForm.interestsIds = this.toppings;

    this._usersService
      .updateUser(this.userForm.id, this.userForm)
      .subscribe((res) => {});
  };

  getuserById = (id: number) => {
    this._usersService.getUserById(id).subscribe((res) => {
      this.userForm = res;
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
      (error) => {
        //alertMessage(0, error, 'error');
      }
    );
  };

  delateAmi(user) {
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
  }

  upload(event) {
    this.selectedFiles = event.target.files;
    console.log(this.selectedFiles[0].name);
    /* const split = this.selectedFiles[0].name.split(".");
    this.selectedFiles[0].name =
      this.userForm.lastName + "" + this.userForm.firstName + split[1]; */
    if (this.selectedFiles.length === 0) return;

    const formData = new FormData();

    for (const file of this.selectedFiles) {
      formData.append(file.name, file);
      /*   formData.append(
        "name",
        this.userForm.lastName + "" + this.userForm.firstName
      ); */
    }

    /*   this._usersService.sendImage(formData).subscribe((res) => {
      console.log(res);
    }); */
  }

  getImageUser = () => {
    this._usersService
      .getImage(getUserIdStorage().toString())
      .subscribe((res) => {
        console.log(res);
        //this.image = res;
      });
  };
}
