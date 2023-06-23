import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DashboardComponent } from './dashboard/dashboard.component';
import { ExportXmlComponent } from './export-xml/export-xml.component';
import { FutureInwardStockMovementsComponent } from './future-inward-stock-movements/future-inward-stock-movements.component';
import { ImportXmlComponent } from './import-xml/import-xml.component';
import { LoginComponent } from './login/login.component';
import { PlanningComponent } from './planning/planning.component';
import { ProfileComponent } from './profile/profile.component';
import { StockOverviewComponent } from './stock-overview/stock-overview.component';
import { WarehouseStockComponent } from './warehouse-stock/warehouse-stock.component';
import { DispositionEigenfertigungComponent } from './planning/disposition-eigenfertigung/disposition-eigenfertigung.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'import_xml', component: ImportXmlComponent},
  { path: 'stock_overview', component: StockOverviewComponent},
  { path: 'planning', component: PlanningComponent},
  { path: 'export_xml', component: ExportXmlComponent},
  { path: 'profile', component: ProfileComponent},
  { path: 'warehouse_stock', component: WarehouseStockComponent},
  { path: 'future_inward_stock_movements', component: FutureInwardStockMovementsComponent},
  { path: 'disposition-eigenfertigung', component: DispositionEigenfertigungComponent}
]
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }