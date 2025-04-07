import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApolloQueryResult } from '@apollo/client';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  token = localStorage.getItem('token');

  constructor(private apollo: Apollo) { }

  getEmployees(): Observable<any[]> {
    const GET_EMPLOYEES_QUERY = gql`
      query {
        getEmployees {
          id
          first_name
          last_name
          email
          department
          designation
          salary
          date_of_joining
        }
      }
    `;


    return this.apollo.watchQuery<any>({
      query: GET_EMPLOYEES_QUERY,
      context: {
        headers: new HttpHeaders().set('Authorization', `Bearer ${this.token}`)
      }
    }).valueChanges.pipe(
      map((result: ApolloQueryResult<any>) => result.data.getEmployees)
    );
  }


  addEmployee(input: any): Observable<any> {
    const ADD_EMPLOYEE_MUTATION = gql`
      mutation AddEmployee($input: EmployeeInput!) {
        addEmployee(input: $input) {
          first_name
          last_name
          email
          department
          designation
          salary
          date_of_joining
        }
      }
    `;

    return this.apollo.mutate({
      mutation: ADD_EMPLOYEE_MUTATION,
      context: {
        headers: new HttpHeaders().set('Authorization', `Bearer ${this.token}`)
      },
      variables: { input }
    }).pipe(
      map((result: any) => result.data.addEmployee)
    );
  }

  deleteEmployee(id: string): Observable<any> {
    const DELETE_EMPLOYEE_MUTATION = gql`
      mutation DeleteEmployee {
        deleteEmployee(id: "${id}")
      }
    `;

    return this.apollo.mutate({
      mutation: DELETE_EMPLOYEE_MUTATION,
      context: {
        headers: new HttpHeaders().set('Authorization', `Bearer ${this.token}`)
      }
    }).pipe(
      map((result: any) => result.data.deleteEmployee)
    );
  }



  getEmployeeById(id: string): Observable<any> {
    const GET_EMPLOYEE_BY_ID = gql`
        query GetEmployeeById($id: ID!) {
          getEmployeeById(id: $id) {
            id
            first_name
            last_name
            email
            gender
            designation
            salary
            date_of_joining
            department
          }
        }
      `;

    return this.apollo.watchQuery<{ getEmployeeById: any }>({
      query: GET_EMPLOYEE_BY_ID,
      context: {
        headers: new HttpHeaders().set('Authorization', `Bearer ${this.token}`)
      },
      variables: { id }
    }).valueChanges.pipe(
      map(result => result.data.getEmployeeById)
    );
  }

  updateEmployee(id: string, employee: Partial<any>): Observable<any> {
    const UPDATE_EMPLOYEE = gql`
      mutation UpdateEmployee($id: ID!, $input: EmployeeInput!) {
        updateEmployee(id: $id, input: $input) {
          id
          first_name
          last_name
          email
          gender
          designation
          salary
          date_of_joining
          department
          employee_photo
        }
      }
    `;

    return this.apollo.mutate<{ updateEmployee: any }>({
      mutation: UPDATE_EMPLOYEE,
      variables: {
        id,
        input: employee
      },
      context: {
        headers: new HttpHeaders().set('Authorization', `Bearer ${this.token}`)
      }
    }).pipe(
      map(result => result.data?.updateEmployee as any)
    );
  }

}
