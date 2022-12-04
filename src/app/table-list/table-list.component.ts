import { getisAdmin, getUserIdStorage } from "./../partage/storageLocal";
import { UsersService } from "./../Services/users.service";
import { UserInterface } from "./../Interfaces/User.interface";
import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-table-list",
  templateUrl: "./table-list.component.html",
  styleUrls: ["./table-list.component.css"],
})
export class TableListComponent implements OnInit {
  $users: UserInterface[] = [];
  isAdmin = false;
  user: UserInterface;
  userFr = [];
  users = [];
  myUsers = [];
  submitted = true;
  userN = {
    email: "",
    lastName: "",
    firstName: "",
    birthDate: "",
    password: "",
  };
  image: string = null;

  constructor(private _usersService: UsersService) {}

  ngOnInit() {
    //this.getAllUsers();

    this.isAdmin = getisAdmin();
    //this.getuserById();
    this.filterUserAmis();
  }

  /* getAllUsers = async () => {
    await this._usersService.getUsers().subscribe(
      (res) => {
        if (getisAdmin() == true) {
          this.$users = res;
        } else {
          this.$users = res;
        }
      },
      (error) => {
        //alertMessage(0, error, 'error');
      }
    );
  }; */
  deleteUser = (user: UserInterface) => {
    this._usersService.deleteUser(user.id).subscribe((res) => {
      this.filterUserAmis();
    });
  };

  addamiUser = async (id: number) => {
    this.user.friendsIds.push(id);

    await this._usersService
      .updateUser(this.user.id, this.user)
      .subscribe((res) => {
        if (res == null) {
          console.log(res);
          this.filterUserAmis();
        }
      });
  };

  newUser = () => {
    this.submitted = !this.submitted;
  };
  saveUser() {
    this._usersService.createUser(this.userN).subscribe((res) => {
      this.submitted = true;
      this.userN = {
        email: "",
        lastName: "",
        firstName: "",
        birthDate: "",
        password: "",
      };
      this.filterUserAmis();
    });
  }

  filterUserAmis = async () => {
    var id = getUserIdStorage();

    await this._usersService.getUsers().subscribe(
      async (res) => {
        this.$users = res;
        await this._usersService.getUserById(id).subscribe((res) => {
          this.user = res;
          this.$users.forEach((user) => {
            //retire de la liste à afficher le titulaire de la fiche (getOneUser) par son index
            if (this.user.id == user.id) {
              this.$users.splice(this.$users.indexOf(user), 1);
            }
            //dans une boucle sur chaque ami, retire de la liste à afficher l'ami par son index
            this.user.friends.forEach((friend) => {
              if (user.id == friend.id) {
                this.$users.splice(this.$users.indexOf(user), 1);
              }
            });
          });
        });
        this.$users.map((u) => {
          this._usersService
            .getImage(u.lastName + u.firstName)
            .subscribe((res) => {
              if (res.content != "") {
                u.image = res.content;
              }
            });
        });
        console.log(this.$users);
      },
      (error) => {
        console.log(error);
      }
    );
  };
}
