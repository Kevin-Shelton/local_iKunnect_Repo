// File: src/app/app.module.ts

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

// Existing pages
import { HomeComponent } from './pages/home/home.component';
import { AboutComponent } from './pages/about/about.component';
import { DemoComponent } from './pages/demo/demo.component';
import { SelfcheckoutComponent } from './pages/selfcheckout/selfcheckout.component';
import { PlatformComponent } from './pages/platform/platform.component';
import { BookademoComponent } from './pages/bookademo/bookademo.component';
import { ResourcesComponent } from './pages/resources/resources.component';
import { SupportComponent } from './pages/support/support.component';
import { SolutionsComponent } from './pages/solutions/solutions.component';
import { BlogComponent } from './pages/blog/blog.component';
import { EachPostContentComponent } from './pages/each-post-content/each-post-content.component';
import { PricingComponent } from './pages/pricing/pricing.component';
import { ContactusComponent } from './pages/contactus/contactus.component';
import { PrivacyComponent } from './pages/privacy/privacy.component';
import { TermsComponent } from './pages/terms/terms.component';

// New components
import { PricingNewComponent } from './pages/pricing-new/pricing-new.component';
import { PricingTableNewComponent } from './pages/pricing-new/pricing-table-new.component';

// Spinner component (adjust path if yours differs)
import { SpinnerComponent } from './shared/spinner/spinner.component';

@NgModule({
  declarations: [
    AppComponent,

    // existing
    HomeComponent,
    AboutComponent,
    DemoComponent,
    SelfcheckoutComponent,
    PlatformComponent,
    BookademoComponent,
    ResourcesComponent,
    SupportComponent,
    SolutionsComponent,
    BlogComponent,
    EachPostContentComponent,
    PricingComponent,
    ContactusComponent,
    PrivacyComponent,
    TermsComponent,

    // new
    PricingNewComponent,
    PricingTableNewComponent,
    SpinnerComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,     // for HttpClient + your PricingService
    NgbTooltipModule,     // for ngbTooltip
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
