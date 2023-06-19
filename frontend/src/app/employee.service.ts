import { Injectable } from '@angular/core';
import { gql } from 'apollo-angular';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Employee } from './models/employee.model';
import { Apollo } from 'apollo-angular';
import { ActivatedRoute } from '@angular/router';
import { User } from './models/user.model';


@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  private getAllEmployeesQuery = gql`
    query getAllEmployees {
      getAll {
        id
        first_name
        last_name
        email
        gender
        salary
      }
    }
  `;

private getPost = gql`
query getPost($id: ID!) {
  getPost(id: $id) {
    id
    first_name
    last_name
    email
    gender
    salary
  }
}
`;

  private createEmployeeMutation = gql`
    mutation createEmployee($employee: PostEmployee!) {
      createPostEmployee(post: $employee) {
        id
        first_name
        last_name
        email
        gender
        salary
      }
    }
  `;

private updateEmployeeMutation = gql`
  mutation updateEmployee($id: String!, $employee: PostEmployee!) {
    updateEmployee(id: $id, post: $employee) {
      id
      first_name
      last_name
      email
      gender
      salary
    }
  }
`;
  
private deleteEmployeeMutation = gql`
mutation deleteEmployee($id: String!) {
  DeleteEmployee(id: $id)
}
`;


  

  constructor(private apollo: Apollo) {}

  getAllEmployees(): Observable<Employee[]> {
    return this.apollo
      .query<{ getAll: Employee[] }>({
        query: this.getAllEmployeesQuery
      })
      .pipe(
        map(result => result.data.getAll)
      );
  }

  getEmployeeById(id: string): Observable<Employee | null> {
    return this.apollo
      .query<{ getPost: Employee }>({
        query: this.getPost,
        variables: {
          id: id
        }
      })
      .pipe(
        map(result => result.data.getPost),
      );
  }

  createEmployee(employee: Employee): Observable<Employee> {
    return this.apollo
      .mutate<{ createPostEmployee: Employee }>({
        mutation: this.createEmployeeMutation,
        variables: {
          employee: employee
        }
      })
      .pipe(
        map(result => result.data!.createPostEmployee)
      );
  }
  login(email: string, password: string): Observable<any> {
    const loginQuery = gql`
      query login($input: UserInput) {
        login(input: $input) {
          username
          email
        }
      }
    `;

    return this.apollo.query<{ login: User }>({
      query: loginQuery,
      variables: {
        email,
        password
      }
    }).pipe(
      map(result => result.data.login)
    );
  }

  updateEmployee(id: String, employee: Employee): Observable<Employee> {
    return this.apollo
      .mutate<{ updateEmployee: Employee }>({
        mutation: this.updateEmployeeMutation,
        variables: {
          id: id,
          employee: {
            id: employee.id,
            first_name: employee.first_name,
            last_name: employee.last_name,
            email: employee.email,
            gender: employee.gender,
            salary: employee.salary
          }
        }
      })
      .pipe(
        map(result => result.data!.updateEmployee)
      );
  }

  deleteEmployee(id: string): Observable<any> {
    return this.apollo
      .mutate<{ deleteEmployee: any }>({
        mutation: this.deleteEmployeeMutation,
        variables: {
          id: id
        }
      })
      .pipe(
        map(result => result.data!.deleteEmployee)
      );
  }
}
