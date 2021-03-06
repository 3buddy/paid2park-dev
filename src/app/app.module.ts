import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
/* import { FormsModule , ReactiveFormsModule } from '@angular/forms'; */
import {  ReactiveFormsModule , FormsModule } from '@angular/forms';


import {
  NbThemeModule,
  NbMenuModule,
  NbLayoutModule,
  NbSidebarModule,
  NbSidebarService,
  NbMenuService,
  NbMenuItem,
  NbIconModule,
  NbButtonModule,
  NbCardModule } from '@nebular/theme';

import { NbEvaIconsModule } from '@nebular/eva-icons';


import {
  MatToolbarModule,
  MatProgressBarModule,
  MatListModule,
  MatPaginatorModule,
  MatFormFieldModule,
  MatInputModule,
  MatTableModule } from '@angular/material';

import { MatStepperModule } from '@angular/material/stepper';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ReportsComponent } from './reports/reports.component';
import { EnforcementsComponent } from './enforcements/enforcements.component';
import { KiosksComponent } from './kiosks/kiosks.component';
import { CustomersComponent } from './customers/customers.component';
import { DeploymentsComponent } from './deployments/deployments.component';
import { SecurityclaimsComponent } from './securityclaims/securityclaims.component';
import { SecurityrolesComponent } from './securityroles/securityroles.component';
import { SecurityusersComponent } from './securityusers/securityusers.component';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PaymentsComponent } from './payments/payments.component';
import { PassesComponent } from './passes/passes.component';
import { DialogBoxComponent } from './dialog-box/dialog-box.component';
import { AddCustomerComponent } from './add-customer/add-customer.component';
import { AddKiosksComponent } from './add-kiosks/add-kiosks.component';
import { AddEnforcementsComponent } from './add-enforcements/add-enforcements.component';
import { AddPassesComponent } from './add-passes/add-passes.component';
import { AddPaymentComponent } from './add-payment/add-payment.component';
import { AddParkingPayemtsComponent } from './add-parking-payemts/add-parking-payemts.component';
import { AddTicketPaymentComponent } from './add-ticket-payment/add-ticket-payment.component';
import { AddVehiclesComponent } from './add-vehicles/add-vehicles.component';
import { AddDeploymentComponent } from './add-deployment/add-deployment.component';
import { AddAppRatesComponent } from './add-app-rates/add-app-rates.component';
import { AddPassRatesComponent } from './add-pass-rates/add-pass-rates.component';
import { AddSecurityUserComponent } from './add-security-user/add-security-user.component';
import { AddSecurityRoleComponent } from './add-security-role/add-security-role.component';
import { AddSecurityClaimsComponent } from './add-security-claims/add-security-claims.component';
import { EditCustomerComponent } from './edit-customer/edit-customer.component';
import { EditVehiclesComponent } from './edit-vehicles/edit-vehicles.component';
import { EditKiosksComponent } from './edit-kiosks/edit-kiosks.component';
import { EditEnforcementsComponent } from './edit-enforcements/edit-enforcements.component';
import { EditDeploymentComponent } from './edit-deployment/edit-deployment.component';
import { EditSecurityrolesComponent } from './edit-securityroles/edit-securityroles.component';
import { EditSecurityusersComponent } from './edit-securityusers/edit-securityusers.component';

/*  Delete Dialog  */


import { DialogContentExampleDialog } from './securityusers/securityusers.component';
import { DialogDeleteCustomer } from './customers/customers.component';
import { DialogDeleteVehicle } from './vehicle/vehicle.component';
import { DialogDeleteKiosk } from './kiosks/kiosks.component';


import { VehicleComponent } from './vehicle/vehicle.component';
import { EditPassesComponent } from './edit-passes/edit-passes.component';
import { ParkingPaymentComponent } from './parking-payment/parking-payment.component';
import { EditTicketPaymentComponent } from './edit-ticket-payment/edit-ticket-payment.component';
import { EditParkingPaymentComponent } from './edit-parking-payment/edit-parking-payment.component';
import { DeploymentAppRatesComponent } from './deployment-app-rates/deployment-app-rates.component';
import { DeploymentPassRatesComponent } from './deployment-pass-rates/deployment-pass-rates.component';
import { EditPassRatesComponent } from './edit-pass-rates/edit-pass-rates.component';
import { EditAppRatesComponent } from './edit-app-rates/edit-app-rates.component';


@NgModule({
  declarations: [
    AppComponent,
    ReportsComponent,
    EnforcementsComponent,
    KiosksComponent,
    CustomersComponent,
    DeploymentsComponent,
    SecurityclaimsComponent,
    SecurityrolesComponent,
    SecurityusersComponent,
    LoginComponent,
    DashboardComponent,
    PaymentsComponent,
    PassesComponent,
    DialogBoxComponent,
    AddCustomerComponent,
    AddKiosksComponent,
    AddEnforcementsComponent,
    AddPassesComponent,
    AddPaymentComponent,
    AddParkingPayemtsComponent,
    AddTicketPaymentComponent,
    AddVehiclesComponent,
    AddDeploymentComponent,
    AddAppRatesComponent,
    AddPassRatesComponent,
    AddSecurityUserComponent,
    AddSecurityRoleComponent,
    AddSecurityClaimsComponent,
    EditCustomerComponent,
    EditVehiclesComponent,
    EditKiosksComponent,
    EditEnforcementsComponent,
    EditDeploymentComponent,
    EditSecurityrolesComponent,
    EditSecurityusersComponent,
    DialogContentExampleDialog,
    DialogDeleteCustomer,
    VehicleComponent,
    DialogDeleteVehicle,
    DialogDeleteKiosk,
    EditPassesComponent,
    ParkingPaymentComponent,
    EditTicketPaymentComponent,
    EditParkingPaymentComponent,
    DeploymentAppRatesComponent,
    DeploymentPassRatesComponent,
    EditPassRatesComponent,
    EditAppRatesComponent
  ],
  imports: [
  BrowserAnimationsModule,
  BrowserModule,
  AppRoutingModule,
  HttpClientModule,
  ReactiveFormsModule,
  FormsModule,
  NbThemeModule.forRoot({ name: 'default' }),
  NbMenuModule.forRoot(),
  NbSidebarModule.forRoot(),
  NbLayoutModule,
  NbEvaIconsModule,
  NbIconModule,
  NbButtonModule,
  NbCardModule,
  MatTableModule,
  MatFormFieldModule,
  MatPaginatorModule,
  MatFormFieldModule,
  MatInputModule,
  MatIconModule,
  MatListModule,
  MatDialogModule,
  MatProgressBarModule,
  MatToolbarModule,
  MatStepperModule
  ],
  providers: [NbSidebarService, NbMenuService],
  bootstrap: [AppComponent],
  entryComponents: [DialogBoxComponent , DialogContentExampleDialog, DialogDeleteCustomer, DialogDeleteVehicle, DialogDeleteKiosk]
})
export class AppModule { }
