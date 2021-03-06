import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MaterialModule } from './modules/material/material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { EnvironmentUrlService } from './_services/environment-url.service';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RepositoryService } from './_services/repository.service';

import { JwtInterceptor, ErrorInterceptor } from './_helpers';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { MenuComponent } from './menu/menu.component';
import { NotFoundComponent } from './error-pages/not-found/not-found.component';
import { InternalServerComponent } from './error-pages/internal-server/internal-server.component';
import { ErrorHandlerService } from './_services/error-handler.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DataTableComponent } from './data-table/data-table.component';

import { LoginComponent } from './_components/login/login.component';
import { RegisterComponent } from './_components/register/register.component';
import { LayoutComponent } from './_components/layout/layout.component';
import { UploadComponent } from './_components/upload/upload.component';

// ToDo: need to clean up angular material module reference and factor in to one new module.
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    MenuComponent,
    NotFoundComponent,
    InternalServerComponent,
    DataTableComponent,
    LoginComponent,
    RegisterComponent,
    LayoutComponent,
    UploadComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    FormsModule,
    MaterialModule,
    FlexLayoutModule,
    RouterModule.forRoot([
      { path: 'home', component: HomeComponent },
      { path: 'login', component: LoginComponent },
      { path: 'register', component: RegisterComponent },
      { path: 'district', loadChildren: './modules/pages/district/district.module#DistrictModule' },
      { path: 'school', loadChildren: './modules/pages/school/school.module#SchoolModule' },
      { path: 'student', loadChildren: './modules/pages/student/student.module#StudentModule' },
      { path: '404', component : NotFoundComponent},
      { path: '500', component: InternalServerComponent },
      { path: '', redirectTo: '/home', pathMatch: 'full' },
      { path: '**', redirectTo: '/404', pathMatch: 'full'}
    ])
 ],
  providers: [
    EnvironmentUrlService,
    ErrorHandlerService,
    RepositoryService,
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
],
  bootstrap: [AppComponent]
})
export class AppModule { }
