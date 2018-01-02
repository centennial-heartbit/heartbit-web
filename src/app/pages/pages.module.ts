import { NgModule } from '@angular/core';

import { PagesComponent } from './pages.component';
import { DashboardModule } from './dashboard/dashboard.module';
import { PagesRoutingModule } from './pages-routing.module';
import { ThemeModule } from '../@theme/theme.module';
import { PatientsModule } from './patients/patients.module';

import { DatePipe } from '@angular/common'

const PAGES_COMPONENTS = [
  PagesComponent,
];

@NgModule({
  imports: [
    PagesRoutingModule,
    ThemeModule,
    DashboardModule,
    PatientsModule,
  ],
  declarations: [
    ...PAGES_COMPONENTS,
  ],
  providers: [
    DatePipe,
  ]
})
export class PagesModule {
}
