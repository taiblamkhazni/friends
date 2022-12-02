import { InteretInterface } from "../interfaces/interet.interface";
import { Component, OnInit } from "@angular/core";
import { FormGroup, UntypedFormControl, Validators } from "@angular/forms";
import { InteretService } from "app/services/interet.service";

@Component({
  selector: "app-interet",
  templateUrl: "./interet.component.html",
  styleUrls: ["./interet.component.scss"],
})
export class InteretComponent implements OnInit {
  updateBtn = false;
  $interets: InteretInterface[] = [];
  interetForm = {
    id: 0,
    name: "",
  };
  constructor(private interetService: InteretService) {}

  ngOnInit(): void {
    this.getAllInterets();
  }
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
  saveInteret = () => {
    if (this.interetForm.id === 0) {
      this.interetService.createinteret(this.interetForm).subscribe((res) => {
        this.updateBtn = false;
        this.getAllInterets();
      });

      /*  this.interetForm.setValue(JSON.parse(JSON.stringify(res))); */
    } else if (this.interetForm.id != 0) {
      this.interetService
        .updateinteret(this.interetForm.id, this.interetForm)
        .subscribe((res) => {
          this.updateBtn = false;
          this.getAllInterets();
        });
      /*  this.interetForm.setValue(JSON.parse(JSON.stringify(res)));
            this.interets.unshift(this.interetForm.value); */
    }
    this.interetForm = {
      id: 0,
      name: " ",
    };
  };
  editInteret(interet: any) {
    this.updateBtn = true;
    this.interetForm = interet;
  }
  deleteInteret = (interet: InteretInterface) => {
    this.interetService.deleteinteret(interet.id).subscribe(
      (res) => {
        this.getAllInterets();
      },
      (error) => {
        //alert(error);
        //alertMessage(0,error,"error");
      }
    );
  };
}
