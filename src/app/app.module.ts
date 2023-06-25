import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatStepperModule } from '@angular/material/stepper';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ExportXmlComponent } from './export-xml/export-xml.component';
import { FutureInwardStockMovementsComponent } from './future-inward-stock-movements/future-inward-stock-movements.component';
import { ImportXmlComponent } from './import-xml/import-xml.component';
import { LoginComponent } from './login/login.component';
import { PlanningComponent } from './planning/planning.component';
import { ProfileComponent } from './profile/profile.component';
import { PurchasePartDispositionComponent } from './purchase-part-disposition/purchase-part-disposition.component';
import { StockOverviewComponent } from './stock-overview/stock-overview.component';
import { WarehouseStockComponent } from './warehouse-stock/warehouse-stock.component';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {MatNativeDateModule} from '@angular/material/core';
import {MatPaginatorModule} from '@angular/material/paginator';
import { FormsModule } from '@angular/forms';
import { MessagesComponent } from './messages/messages.component';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatListModule} from '@angular/material/list';
import { DispositionEigenfertigungComponent } from './planning/disposition-eigenfertigung/disposition-eigenfertigung.component';
import { ForecastComponent } from './planning/forecast/forecast.component';
import { ProdprogComponent } from './planning/prodprog-prod/prodprog-prod.component';
import {MatTabsModule} from '@angular/material/tabs';
import { CapacityPlanningComponent } from './planning/capacity-planning/capacity-planning.component';
import {AuthGuard} from "./auth/AuthGuard";


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    ImportXmlComponent,
    WarehouseStockComponent,
    FutureInwardStockMovementsComponent,
    StockOverviewComponent,
    ExportXmlComponent,
    PlanningComponent,
    ProfileComponent,
    PurchasePartDispositionComponent,
    MessagesComponent,
    ForecastComponent,
  ],
  imports: [
    DispositionEigenfertigungComponent,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatButtonModule,
    MatInputModule,
    MatIconModule,
    MatStepperModule,
    HttpClientModule,
    MatTableModule,
    MatNativeDateModule,
    MatPaginatorModule,
    FormsModule,
    MatSidenavModule,
    MatListModule,
    MatToolbarModule,
    MatTabsModule,
    ProdprogComponent,
    CapacityPlanningComponent
  ],
  providers: [AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
