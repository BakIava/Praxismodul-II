import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { PropertyService } from './services/property/property.service';
import { SnackbarLevel, SnackbarService } from './services/snackbar/snackbar.service';

export interface MenuItem {
  icon: any,
  text: string,
  path: string
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'POC';
  showFiller = false;
  public subscription: Subscription;

  menuItems: MenuItem[] = [
  ]
  constructor(private router: Router, private propertryService: PropertyService, private snackbar: SnackbarService) {     
    this.subscription = this.propertryService.getMenuItems().subscribe(menuItems => this.menuItems = menuItems);}

  ngOnInit()
  {    
    var accessToken = localStorage.getItem('AccessToken');   
    if(accessToken == null)
    {
      this.router.navigate(['/login']);    
      return;
    } else {
      this.propertryService.updateMenuItems(accessToken)
    }    
  }

  async navigate(path: string) {
    this.router.navigate([path]);    
  }

  logout() {
    localStorage.removeItem("AccessToken");
    this.propertryService.updateMenuItems(JSON.stringify({}))    
    this.snackbar.open("Ausgeloggt", SnackbarLevel.INFO)
    this.navigate('/login')
  }
}
