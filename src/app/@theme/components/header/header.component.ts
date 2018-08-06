import { Cookie } from 'ng2-cookies/ng2-cookies';
import { UsersService } from './../../../user.service';
import { Router } from '@angular/router';
import { Component, Input, OnInit } from '@angular/core';
import { NbMenuService, NbSidebarService } from '@nebular/theme';

@Component({
  selector: 'ngx-header',
  styleUrls: ['./header.component.scss'],
  templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit {

  userInfo:any
  @Input() position = 'normal';

  user: any;

  // userMenu = [{ title: 'Profile' },  {title: 'Profile'} ];

  constructor(private sidebarService: NbSidebarService,
              private menuService: NbMenuService,
              private router: Router,
              private usersService: UsersService
            ) {
  }
  public LogOut(){
    //  localStorage.removeItem('userToken'); // remove token
      Cookie.deleteAll();
      this.router.navigate(['/login']);
    }
  ngOnInit() {
   
    this.userInfo=this.usersService.getUserInfo();

  }

  toggleSidebar(): boolean {
    this.sidebarService.toggle(true, 'menu-sidebar');
    return false;
  }

  toggleSettings(): boolean {
    this.sidebarService.toggle(false, 'settings-sidebar');
    return false;
  }

  goToHome() {
    this.menuService.navigateHome();
  }


}
