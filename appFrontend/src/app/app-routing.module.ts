import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { HomeComponent } from "./home/home.component";
import { LoginComponent } from "./login/login.component";
import { SignupComponent } from "./signup/signup.component";
import { LibguestComponent } from "./libguest/libguest.component";
import { LibadminComponent } from "./libadmin/libadmin.component";
import { LibsecureComponent } from "./libsecure/libsecure.component";

// Add new frontend routes here
const routes: Routes = [
  { path: "", component: HomeComponent },
  { path: "home", component: HomeComponent },
  { path: "login", component: LoginComponent },
  { path: "signup", component: SignupComponent },
  { path: "libguest", component: LibguestComponent },
  { path: "libadmin", component: LibadminComponent },
  { path: "libsecure", component: LibsecureComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
