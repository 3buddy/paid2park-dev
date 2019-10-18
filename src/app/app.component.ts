import { ChangeDetectionStrategy , Component } from '@angular/core';
import { Event,
	NavigationCancel,
	NavigationEnd,
	NavigationError,
	NavigationStart,
	Router } from '@angular/router';
import { AuthService } from './auth.service';
import { NbSidebarService , NbMenuService , NbMenuItem } from '@nebular/theme';

@Component({
  selector: 'app-root',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Paid2Park';
  loading = false;
  
   items= [
     {
	   title: 'Dashboard',
	   icon: "home-outline",
	   link: '/dashboard'
	 },
     {
      title: 'Security',
	  icon: "shield-outline",
      children: [
        {
          title: 'Claims',
		  icon:"person-outline",
          link: '/securityclaims', 
        },
        {
          title: 'Roles',
		   icon:"code-outline",
		  link: '/securityroles',
        },
        {
          title: 'Users',
		  icon:"person-done-outline",
          link: '/securityusers',
        }
      ],
     },
	 {
	   title: 'Deployments',
	   icon: "globe-outline",
	   link: '/deployments'
	 },
	 {
	   title: 'Customers',
	   icon: "people-outline",
	   link: '/customers'
	 },
	 {
	   title: 'Kiosks',
	   icon: "stop-circle-outline",
	   link: '/kiosks'
	 },
	 {
	   title: 'Payments and Passes',
	   icon: "shopping-bag-outline",
	   children: [
        {
          title: 'Payments',
		  icon:"briefcase-outline",
          link: '/payments', 
        },
        {
          title: 'Passes',
		  icon:"checkmark-square-2-outline",
		  link: '/passes',
        }
      ],
	 },
	 {
	   title: 'Enforcements',
	   icon: "award-outline",
	   link: '/enforcements'
	 },
	 {
	   title: 'Reports',
	   icon: "layers-outline",
	   link: '/reports'
	 }
  ];
  
   constructor(public _authService: AuthService, private router: Router , private sidebarService: NbSidebarService) { }
  
  logout() {
    this._authService.logoutUser();
    this.router.navigateByUrl('/login');
  }
  
  toggle() {
    this.sidebarService.toggle(true);
	return false;
  }
  
}
