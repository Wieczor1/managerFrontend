import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {UserListComponent} from './components/user-list/user-list.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {AppRoutingModule} from '../app-routing.module';
import {CreateUserComponent} from './components/create-user/create-user.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {UpdateUserComponent} from './components/update-user/update-user.component';
import {UserDetailsComponent} from './components/user-details/user-details.component';
import {AppListComponent} from './components/app-list/app-list.component';
import {CreateAppComponent} from './components/create-app/create-app.component';
import {UpdateAppComponent} from './components/update-app/update-app.component';
import {AppDetailsComponent} from './components/app-details/app-details.component';
import {UploadFileComponent} from './components/upload-file/upload-file.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatDialogModule} from '@angular/material/dialog';
import {SelectAppComponent} from './components/select-app/select-app.component';
import {UploadImageComponent} from './components/upload-image/upload-image.component';
import {CreateAppLocationComponent} from './components/create-app-location/create-app-location.component';
import {FilenamePipe} from './pipes/filename.pipe';
import {FilenameExistsPipe} from './pipes/filename-exists.pipe';
import {StatisticsComponent} from './components/statistics/statistics.component';
import { ImportComponent } from './components/import/import.component';
import { LoginComponent } from './components/login/login.component';
import {AuthInterceptor} from './services/auth.interceptor';
import { RegisterComponent } from './components/register/register.component';
import {PasswordStrengthMeterModule} from 'angular-password-strength-meter';
import {MatTableModule} from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { UserTableComponent } from './components/user-table/user-table.component';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {LoginService} from './services/login.service';
import { AppTableComponent } from './components/app-table/app-table.component';
import { EditAppLocationComponent } from './components/edit-app-location/edit-app-location.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import { FilesTableComponent } from './components/files-table/files-table.component';

@NgModule({
  declarations: [
    AppComponent,
    UserListComponent,
    CreateUserComponent,
    UpdateUserComponent,
    UserDetailsComponent,
    AppListComponent,
    CreateAppComponent,
    UpdateAppComponent,
    AppDetailsComponent,
    UploadFileComponent,
    SelectAppComponent,
    UploadImageComponent,
    CreateAppLocationComponent,
    FilenamePipe,
    FilenameExistsPipe,
    StatisticsComponent,
    ImportComponent,
    LoginComponent,
    RegisterComponent,
    UserTableComponent,
    AppTableComponent,
    EditAppLocationComponent,
    FilesTableComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    MatDialogModule,
    ReactiveFormsModule,
    PasswordStrengthMeterModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatProgressSpinnerModule,
    MatFormFieldModule,
    MatInputModule

  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
    FilenameExistsPipe,
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
