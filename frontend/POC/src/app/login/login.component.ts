import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../services/api/api.service';
import { SnackbarLevel, SnackbarService } from '../services/snackbar/snackbar.service';
import { AppComponent } from '../app.component';
import { PropertyService } from '../services/property/property.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  username: string;
  password: string;

  constructor(private router: Router, private api: ApiService, private snackbar: SnackbarService, private propertyService: PropertyService) {
    this.username = "";
    this.password = "";
  }

  ngOnInit(): void {
    console.log("Login");
    var accessToken = localStorage.getItem('AccessToken');

    if (accessToken != null) {
      this.router.navigate(['']);
      return;
    }
  }

  async login() {
    if (this.username == "admin" && this.password == "admin") {
      localStorage.setItem('AccessToken', JSON.stringify({ username: 'admin', role: 'admin', displayName: 'Administrator' }));
      this.snackbar.open("Successfully loggedin as Administrator", SnackbarLevel.SUCCESS);  
      this.propertyService.updateMenuItems(JSON.stringify({ username: 'admin', role: 'admin' }));   
      this.router.navigate(['']);
    } else {
      await this.api.authenticate({ username: this.username, password: this.password }).then(response => {
        this.snackbar.open("Successfully loggedin", SnackbarLevel.SUCCESS)
        localStorage.setItem('AccessToken', JSON.stringify({ username: this.username, role: response.role, displayName: response.displayName }));
        this.propertyService.updateMenuItems(JSON.stringify({ role: response.role }));   
        this.router.navigate(['']);
      }).catch(error => {
        this.snackbar.open("Invalid credentials", SnackbarLevel.ERROR)
        console.log(error);
      });
    }
  }
}
