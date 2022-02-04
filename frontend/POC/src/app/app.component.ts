import { Component } from '@angular/core';
import { Router } from '@angular/router';

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

  menuItems: MenuItem[] = [
    { icon: 'home', text: 'Home', path: '' },
    { icon: 'description', text: 'Anfragen', path: 'requests' },    
    { icon: 'description', text: 'Anfrage erstellen', path: 'create-request' },
    { icon: 'description', text: 'Meine Anfrage', path: 'my-request' },
  ]
  constructor(private router: Router) { }

  ngOnInit()
  {
    var accessToken = localStorage.getItem('AccessToken');

    if(accessToken == null)
    {
      this.router.navigate(['/login']);
      return;
    }
  }

  navigate(path: string) {
    this.router.navigate([path]);
  }
}
