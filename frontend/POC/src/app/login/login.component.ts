import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit { 

  username: string;
  password: string;

  constructor(private router: Router) { 
    this.username = "";
    this.password = "";
  }

  ngOnInit(): void {
    console.log("Login");

    
    var accessToken = localStorage.getItem('AccessToken');

    if(accessToken != null)
    {
      this.router.navigate(['']);
      return;
    }
  }

  login()
  {    
    console.log("username:" + this.username + "; password:" + this.password);

    if(this.username == "test1" && this.password == "test1")
    {
      localStorage.setItem('AccessToken', 'user1')
      this.router.navigate(['']);
    } else  if(this.username == "test2" && this.password == "test2")
    {
      localStorage.setItem('AccessToken', 'user2')
      this.router.navigate(['']);
    }
  }
}
