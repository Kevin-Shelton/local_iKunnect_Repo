import { Routes } from '@angular/router';
import { HomeComponent } from './../pages/home/home.component';
import { AboutComponent } from '../pages/about/about.component';
import { DemoComponent } from '../pages/demo/demo.component';
import { SelfcheckoutComponent } from '../pages/selfcheckout/selfcheckout.component';
import { PlatformComponent } from '../pages/platform/platform.component';
import {BookademoComponent} from '../pages/bookademo/bookademo.component';
export const routes: Routes = [
  { path: 'home', pathMatch: 'full', component: HomeComponent },
  { path: 'about', pathMatch: 'full', component: AboutComponent },
  { path: 'demo', pathMatch: 'full', component: DemoComponent },
  {
    path: 'self-checkout',
    pathMatch: 'full',
    component: SelfcheckoutComponent,
  },
  { path: 'platform', pathMatch: 'full', component: PlatformComponent },
  { path: 'bookademo', pathMatch: 'full', component: BookademoComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
];
