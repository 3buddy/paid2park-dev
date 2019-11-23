import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ReportsComponent } from './reports/reports.component';


import { LoginComponent } from './login/login.component';
import { AuthGuard } from './auth.guard';
import { DashboardComponent } from './dashboard/dashboard.component';


import { DeploymentsComponent } from './deployments/deployments.component';
import { AddDeploymentComponent } from './add-deployment/add-deployment.component';
import { AddAppRatesComponent } from './add-app-rates/add-app-rates.component';
import { AddPassRatesComponent } from './add-pass-rates/add-pass-rates.component';
import { EditDeploymentComponent } from './edit-deployment/edit-deployment.component';
import { DeploymentAppRatesComponent } from './deployment-app-rates/deployment-app-rates.component';
import { DeploymentPassRatesComponent } from './deployment-pass-rates/deployment-pass-rates.component';
import { EditPassRatesComponent } from './edit-pass-rates/edit-pass-rates.component';
import { EditAppRatesComponent } from './edit-app-rates/edit-app-rates.component';

import { SecurityclaimsComponent } from './securityclaims/securityclaims.component';
import { AddSecurityClaimsComponent } from './add-security-claims/add-security-claims.component';

import { SecurityrolesComponent } from './securityroles/securityroles.component';
import { AddSecurityRoleComponent } from './add-security-role/add-security-role.component';
import { EditSecurityrolesComponent } from './edit-securityroles/edit-securityroles.component';

import { SecurityusersComponent } from './securityusers/securityusers.component';
import { AddSecurityUserComponent } from './add-security-user/add-security-user.component';
import { EditSecurityusersComponent } from './edit-securityusers/edit-securityusers.component';

import { PaymentsComponent } from './payments/payments.component';
import { AddPaymentComponent } from './add-payment/add-payment.component';
import { AddParkingPayemtsComponent } from './add-parking-payemts/add-parking-payemts.component';
import { AddTicketPaymentComponent } from './add-ticket-payment/add-ticket-payment.component';

import { PassesComponent } from './passes/passes.component';
import { AddPassesComponent } from './add-passes/add-passes.component';
import { EditPassesComponent } from './edit-passes/edit-passes.component';

import { EnforcementsComponent } from './enforcements/enforcements.component';
import { AddEnforcementsComponent } from './add-enforcements/add-enforcements.component';
import { EditEnforcementsComponent } from './edit-enforcements/edit-enforcements.component';

import { KiosksComponent } from './kiosks/kiosks.component';
import { AddKiosksComponent } from './add-kiosks/add-kiosks.component';
import { EditKiosksComponent } from './edit-kiosks/edit-kiosks.component';

import { CustomersComponent } from './customers/customers.component';
import { AddCustomerComponent } from './add-customer/add-customer.component';
import { VehicleComponent } from './vehicle/vehicle.component';
import { AddVehiclesComponent } from './add-vehicles/add-vehicles.component';
import { EditCustomerComponent } from './edit-customer/edit-customer.component';
import { EditVehiclesComponent } from './edit-vehicles/edit-vehicles.component';
import { ParkingPaymentComponent } from './parking-payment/parking-payment.component';
import { EditTicketPaymentComponent } from './edit-ticket-payment/edit-ticket-payment.component';
import { EditParkingPaymentComponent } from './edit-parking-payment/edit-parking-payment.component';



const routes: Routes = [
{
    path: '',
    redirectTo: '/dashboard',
    pathMatch: 'full'

},
{
    path: 'login',
    component: LoginComponent
},
{
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuard]
},
{
    path: 'reports',
    component: ReportsComponent,
    canActivate: [AuthGuard]
},
{
    path: 'enforcements',
    component: EnforcementsComponent,
    canActivate: [AuthGuard]
},
{
    path: 'enforcements/add',
    component: AddEnforcementsComponent,
    canActivate: [AuthGuard]
},
{
    path: 'enforcements/:Id/edit',
    component: EditEnforcementsComponent,
    canActivate: [AuthGuard]
},
{
    path: 'kiosks',
    component: KiosksComponent,
    canActivate: [AuthGuard]
},
{
    path: 'kiosks/add',
    component: AddKiosksComponent,
    canActivate: [AuthGuard]
},
{
    path: 'kiosks/:Id/edit',
    component: EditKiosksComponent,
    canActivate: [AuthGuard]
},
{
    path: 'customers',
    component: CustomersComponent,
    canActivate: [AuthGuard]
},
{
   path: 'customers/add',
   component: AddCustomerComponent,
   canActivate: [AuthGuard]
},
{
    path: 'customers/:customerId/vehicles',
    component: VehicleComponent,
    canActivate: [AuthGuard]
},
{
   path: 'customers/:customerId/add-vehicles',
   component: AddVehiclesComponent,
   canActivate: [AuthGuard]
},
{
   path: 'customers/:Id/edit',
   component: EditCustomerComponent,
   canActivate: [AuthGuard]
},
{
   path: 'customers/:customerId/edit-vehicles/:vehicleId',
   component: EditVehiclesComponent,
   canActivate: [AuthGuard]
},
{
    path: 'deployments',
    component: DeploymentsComponent,
    canActivate: [AuthGuard]
},
{
    path: 'deployments/add',
    component: AddDeploymentComponent,
    canActivate: [AuthGuard]
},
{
    path: 'deployments/:deploymentId/edit',
    component: EditDeploymentComponent,
    canActivate: [AuthGuard]
},
{
    path: 'deployments/:deploymentId/app-rate',
    component: DeploymentAppRatesComponent,
    canActivate: [AuthGuard]
},
{
    path: 'deployments/:deploymentId/pass-rate',
    component: DeploymentPassRatesComponent,
    canActivate: [AuthGuard]
},
{
    path: 'deployments/:deploymentId/add-app-rate',
    component: AddAppRatesComponent,
    canActivate: [AuthGuard]
},
{
    path: 'deployments/:deploymentId/add-pass-rate',
    component: AddPassRatesComponent,
    canActivate: [AuthGuard]
},
{
   path: 'deployments/:Id/edit-pass-rate/:deploymentId',
   component: EditPassRatesComponent,
   canActivate: [AuthGuard]
},
{
    path: 'deployments/:Id/edit-app-rate/:deploymentId',
    component: EditAppRatesComponent,
    canActivate: [AuthGuard]
},
{
    path: 'securityclaims',
    component: SecurityclaimsComponent,
    canActivate: [AuthGuard]
},
{
    path: 'securityclaims/add',
    component: AddSecurityClaimsComponent,
    canActivate: [AuthGuard]
},
{
    path: 'securityroles',
    component: SecurityrolesComponent,
    canActivate: [AuthGuard]
},
{
    path: 'securityroles/add',
    component: AddSecurityRoleComponent,
    canActivate: [AuthGuard]
},
{
    path: 'securityroles/:roleId/edit',
    component: EditSecurityrolesComponent,
    canActivate: [AuthGuard]
},
{
    path: 'securityusers',
    component: SecurityusersComponent,
    canActivate: [AuthGuard]
},
{
    path: 'securityusers/add',
    component: AddSecurityUserComponent,
    canActivate: [AuthGuard]
},
{
    path: 'securityusers/:userId/edit',
    component: EditSecurityusersComponent,
    canActivate: [AuthGuard]
},
{
    path: 'payments',
    component: PaymentsComponent,
    canActivate: [AuthGuard]
},
{
    path: 'ParkingPayment',
    component: ParkingPaymentComponent,
    canActivate: [AuthGuard]

},
{
    path: 'payments/add',
    component: AddPaymentComponent,
    canActivate: [AuthGuard]
},
{
    path: 'payments/add-parking-payments',
    component: AddParkingPayemtsComponent,
    canActivate: [AuthGuard]
},
{
    path: 'payments/add-ticket-payments',
    component: AddTicketPaymentComponent,
    canActivate: [AuthGuard]
},
{
    path: 'ticket-payment/:Id/edit',
    component: EditTicketPaymentComponent,
    canActivate: [AuthGuard]

},
{
    path: 'parking-payment/:Id/edit',
    component: EditParkingPaymentComponent,
    canActivate: [AuthGuard]

},
{
    path: 'passes',
    component: PassesComponent,
    canActivate: [AuthGuard]
},
{
    path: 'passes/add',
    component: AddPassesComponent,
    canActivate: [AuthGuard]
},
{
    path: 'passes/:Id/edit',
    component: EditPassesComponent,
    canActivate: [AuthGuard]
}


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
