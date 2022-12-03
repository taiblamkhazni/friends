import { Routes } from "@angular/router";

import { UserProfileComponent } from "../../user-profile/user-profile.component";
import { TableListComponent } from "../../table-list/table-list.component";

import { InteretComponent } from "app/interet/interet.component";
import { AdminGuard } from "app/guards/admin.guard";

export const AdminLayoutRoutes: Routes = [
  {
    path: "user-profile/:id",
    component: UserProfileComponent,
    title: "Profile",
  },
  { path: "table-list", component: TableListComponent, title: "Utilisateurs" },

  {
    path: "interet",
    component: InteretComponent,
    title: "Interet",
    canActivate: [AdminGuard],
  },
  { path: "", redirectTo: "/table-list" },
  { path: "**", redirectTo: "/table-list" },
];
