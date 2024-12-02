import { Routes } from '@angular/router';
import { HomeComponent } from './../pages/home/home.component';
import { AboutComponent } from '../pages/about/about.component';
import { DemoComponent } from '../pages/demo/demo.component';
import { SelfcheckoutComponent } from '../pages/selfcheckout/selfcheckout.component';
import { PlatformComponent } from '../pages/platform/platform.component';
import { BookademoComponent } from '../pages/bookademo/bookademo.component';
import { ResourcesComponent } from '../pages/resources/resources.component';
import { SupportComponent } from '../pages/support/support.component';
import { SolutionsComponent } from '../pages/solutions/solutions.component';
import { PricingComponent } from '../pages/pricing/pricing.component';
import { ContactusComponent } from '../pages/contactus/contactus.component';
import { BlogComponent } from '../pages/blog/blog.component';
export const routes: Routes = [
  { path: 'home', pathMatch: 'full', component: HomeComponent },
  { path: 'about', pathMatch: 'full', component: AboutComponent },
  { path: 'demo', pathMatch: 'full', component: DemoComponent },
  {
    path: 'self-checkout',
    component: SelfcheckoutComponent,
  },
  { path: 'platform', pathMatch: 'full', component: PlatformComponent },
  { path: 'book-demo', pathMatch: 'full', component: BookademoComponent },
  { path: 'resources', pathMatch: 'full', component: ResourcesComponent },
  { path: 'support', pathMatch: 'full', component: SupportComponent },
  { path: 'solutions', pathMatch: 'full', component: SolutionsComponent },
  { path: 'blog', pathMatch: 'full', component: BlogComponent },
  { path: 'pricing', pathMatch: 'full', component: PricingComponent },
  { path: 'contact-us', pathMatch: 'full', component: ContactusComponent },
  { path: '**', redirectTo: 'home', pathMatch: 'full' },
];
