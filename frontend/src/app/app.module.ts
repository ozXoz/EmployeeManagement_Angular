import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms'; // Import the ReactiveFormsModule

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { HttpClientModule } from '@angular/common/http';
import { EmployeeService } from './employee.service';
import { EmployeeListComponent } from './employee-list/employee-list.component';
import { EmployeeFormComponent } from './employee-form/employee-form.component';

// Import RouterModule and Routes
import { RouterModule, Routes } from '@angular/router';
// Import FormsModule
import { FormsModule } from '@angular/forms';
import { Apollo, ApolloModule } from 'apollo-angular';
import { HttpLink} from 'apollo-angular/http';
import { InMemoryCache } from '@apollo/client/core';
import { EmployeeDetailsComponent } from './employee-details/employee-details.component';
import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';

// Define your routes
const routes: Routes = [
  { path: 'employee-list', component: EmployeeListComponent },
  // Add more routes here
];

@NgModule({
  declarations: [
    AppComponent,
    EmployeeListComponent,
    EmployeeFormComponent,
    EmployeeDetailsComponent,
    SignupComponent,
    LoginComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    RouterModule.forRoot(routes),
    FormsModule,
    ApolloModule,
    ReactiveFormsModule
    
    
  ],
  providers: [EmployeeService],
  bootstrap: [AppComponent],
})
export class AppModule {
  constructor(
    apollo: Apollo,
    httpLink: HttpLink
  ) {
    // Apollo client configuration
    apollo.create({
      link: httpLink.create({ uri: 'https://101303363-comp-3133-assignment1.vercel.app/graphql' }),
      cache: new InMemoryCache(),
    });
  }
}
