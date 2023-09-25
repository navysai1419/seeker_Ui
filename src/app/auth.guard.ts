import { Injectable } from '@angular/core';
import { CanActivateFn } from '@angular/router';


import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private isAuthenticated: boolean = false;

  constructor() { }

  login(username: string, password: string): boolean {
    // Implement your authentication logic here
    // Set isAuthenticated to true if authentication is successful
    return this.isAuthenticated;
  }

  // isAuthenticated(): boolean {
  //   return this.isAuthenticated;
  // }

  // logout(): void {
  //   this.isAuthenticated = false;
  // }
}



