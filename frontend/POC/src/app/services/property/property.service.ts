import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';

export interface MenuItem {
  icon: any,
  text: string,
  path: string
}
@Injectable({
  providedIn: 'root'
})
export class PropertyService {
  private menuItems = new Subject<MenuItem[]>();

  constructor() { }

  public getMenuItems(): Observable<MenuItem[]> {
    return this.menuItems.asObservable();
  }

  public updateMenuItems(accessToken: string): void {

    var user = JSON.parse(accessToken);
    var menuItems = [];

    switch (user.role) {
      case 'admin':
        menuItems.push({ icon: 'admin_panel_settings', text: 'Benutzerrollen', path: 'user-roles' });
        menuItems.push({ icon: 'description', text: 'Anfragen', path: 'requests' });
        break;
      case 'manager':
        menuItems.push({ icon: 'description', text: 'Anfragen', path: 'requests' });
        break;
      case 'user':
        menuItems.push({ icon: 'description', text: 'Meine Anfrage', path: 'my-request' });
        menuItems.push({ icon: 'description', text: 'Anfrage erstellen', path: 'create-request' });
        break;
    }

    this.menuItems.next(menuItems);
  }
}
