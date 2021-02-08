import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {UserListComponent} from './app/components/user-list/user-list.component';
import {CreateUserComponent} from './app/components/create-user/create-user.component';
import {UpdateUserComponent} from './app/components/update-user/update-user.component';
import {UserDetailsComponent} from './app/components/user-details/user-details.component';
import {AppListComponent} from './app/components/app-list/app-list.component';
import {CreateAppComponent} from './app/components/create-app/create-app.component';
import {UpdateAppComponent} from './app/components/update-app/update-app.component';
import {AppDetailsComponent} from './app/components/app-details/app-details.component';
import {UploadFileComponent} from './app/components/upload-file/upload-file.component';
import {StatisticsComponent} from './app/components/statistics/statistics.component';
import {LoginComponent} from './app/components/login/login.component';
import {RoleGuardService} from './app/services/role-guard.service';
import {RegisterComponent} from './app/components/register/register.component';
import {UserTableComponent} from './app/components/user-table/user-table.component';
import {AppTableComponent} from './app/components/app-table/app-table.component';
import {FilesTableComponent} from './app/components/files-table/files-table.component';
import {IdGuardService} from './app/services/id-guard.service';


const routes: Routes = [ //TODO potwierdzenie usuniecia dialogiem
  {path: 'statistics', component: StatisticsComponent},
  {path: 'login', component: LoginComponent},
  {path: 'users', component: UserTableComponent},
  {path: 'apps', component: AppTableComponent},
  {path: 'create-app', component: CreateAppComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'update-user/:id', component: UpdateUserComponent},
  {path: 'update-app/:id', component: UpdateAppComponent, canActivate: [RoleGuardService], data: {expectedRoles: ['ROLE_ADMIN']}},
  {path: 'user-details/:id', component: UserDetailsComponent, canActivate: [IdGuardService]},
  {path: 'app-details/:id', component: AppDetailsComponent},
  {path: 'upload-file/:appId', component: UploadFileComponent},
  {path: 'files', component: FilesTableComponent},
  {path: 'upload-file/:appId/user/:userId', component: UploadFileComponent},
  {path: '', redirectTo: 'login', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
