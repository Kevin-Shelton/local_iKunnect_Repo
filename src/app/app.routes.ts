import { Routes } from '@angular/router';
import { AboutComponent } from '../pages/about/about.component';
import { BlogComponent } from '../pages/blog/blog.component';
import { BookademoComponent } from '../pages/bookademo/bookademo.component';
import { ContactusComponent } from '../pages/contactus/contactus.component';
import { DemoComponent } from '../pages/demo/demo.component';
import { PlatformComponent } from '../pages/platform/platform.component';
import { PricingComponent } from '../pages/pricing/pricing.component';
import { PrivacyComponent } from '../pages/privacy/privacy.component';
import { ResourcesComponent } from '../pages/resources/resources.component';
import { SelfcheckoutComponent } from '../pages/selfcheckout/selfcheckout.component';
import { SolutionsComponent } from '../pages/solutions/solutions.component';
import { SupportComponent } from '../pages/support/support.component';
import { TermsComponent } from '../pages/terms/terms.component';
import { EachPostContentComponent } from './../pages/each-post-content/each-post-content.component';
import { HomeComponent } from './../pages/home/home.component';
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
  { path: 'post', pathMatch: 'full', component: EachPostContentComponent },
  { path: 'pricing', pathMatch: 'full', component: PricingComponent },
  { path: 'contact-us', pathMatch: 'full', component: ContactusComponent },
  { path: 'privacy', pathMatch: 'full', component: PrivacyComponent },
  { path: 'terms', pathMatch: 'full', component: TermsComponent },
  { path: '**', redirectTo: 'home', pathMatch: 'full' },
];
