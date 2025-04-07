import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './Components/login/login.component';
import { SignupComponent } from './Components/signup/signup.component';
import { EmployeeListComponent } from './Components/employee-list/employee-list.component';
import { EmployeeAddComponent } from './Components/employee-add/employee-add.component';
import { EmployeeEditComponent } from './Components/employee-edit/employee-edit.component';
import { EmployeeDetailsComponent } from './Components/employee-details/employee-details.component';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'employees', component: EmployeeListComponent, canActivate: [AuthGuard] },
  { path: 'employees/add', component: EmployeeAddComponent, canActivate: [AuthGuard] },
  { path: 'employees/edit/:id', component: EmployeeEditComponent, canActivate: [AuthGuard] },
  { path: 'employees/details/:id', component: EmployeeDetailsComponent, canActivate: [AuthGuard] },

  { path: '**', redirectTo: 'login' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
