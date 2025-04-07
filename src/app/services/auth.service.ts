import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private apollo: Apollo) { }

  login(email: string, password: string): Observable<any> {
    return this.apollo.mutate({
      mutation: gql`
        query Login($email: String!, $password: String!) {
          login(email: $email, password: $password)
        }
      `,
      variables: {
        email,
        password
      }
    });
  }

  signup(username: string, email: string, password: string): Observable<string> {
    const SIGNUP_MUTATION = gql`
      mutation Signup($username: String!, $email: String!, $password: String!) {
        signup(username: $username, email: $email, password: $password)
      }
    `;

    return this.apollo.mutate({
      mutation: SIGNUP_MUTATION,
      variables: { username, email, password }
    }).pipe(
      map((result: any) => result.data.signup)
    );
  }

  logout(): void {
    localStorage.removeItem('token');
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }
}
