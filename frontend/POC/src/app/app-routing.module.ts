import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { CreateRequestComponent } from './create-request/create-request.component';
import { LoginComponent } from './login/login.component';
import { MainComponent } from './main/main.component';
import { MyRequestComponent } from './my-request/my-request.component';
import { RequestsComponent } from './requests/requests.component';
import { UserRolesComponent } from './user-roles/user-roles.component';

const routes: Routes = [
  {
    path: '',
    component: MainComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'requests',
    component: RequestsComponent
  },
  {
    path: 'create-request',
    component: CreateRequestComponent
  },
  {
    path: 'my-request',
    component: MyRequestComponent
  },
  {
    path:'user-roles',
    component: UserRolesComponent
  }
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
