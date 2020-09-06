import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { FacultyComponent } from './faculty/faculty.component';
import { UseroptionsComponent } from './useroptions/useroptions.component';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: UseroptionsComponent },
  { path: 'facultylogin', component: LoginComponent },
  { path: 'faculty', component: FacultyComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
