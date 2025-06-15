import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { HomeComponent } from './home.component';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let mockRouter: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    const routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      imports: [HomeComponent],
      providers: [
        { provide: Router, useValue: routerSpy }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    mockRouter = TestBed.inject(Router) as jasmine.SpyObj<Router>;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with correct default values', () => {
    expect(component.title).toBe('The Future of Global Contact Centers—Powered by AI & Real-Time Translation');
    expect(component.selectedLanguage).toBe('en');
    expect(component.languages).toHaveSize(5);
    expect(component.metrics).toHaveSize(4);
  });

  it('should have correct language options', () => {
    const expectedLanguages = ['en', 'es', 'ja', 'fr', 'de'];
    const actualLanguageCodes = component.languages.map(lang => lang.code);
    expect(actualLanguageCodes).toEqual(expectedLanguages);
  });

  it('should have correct metrics data', () => {
    expect(component.metrics[0].value).toBe('99.9%');
    expect(component.metrics[0].label).toBe('Uptime Guarantee');
    expect(component.metrics[1].value).toBe('40%');
    expect(component.metrics[1].label).toBe('Faster Resolution');
  });

  it('should navigate to book-demo when bookConsult is called', () => {
    spyOn(window, 'scrollTo');
    
    component.bookConsult();
    
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/book-demo']);
    expect(window.scrollTo).toHaveBeenCalledWith(0, 0);
  });

  it('should navigate to book-demo when scheduleDemo is called', () => {
    spyOn(window, 'scrollTo');
    
    component.scheduleDemo();
    
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/book-demo']);
    expect(window.scrollTo).toHaveBeenCalledWith(0, 0);
  });

  it('should navigate to pricing when explorePlans is called', () => {
    spyOn(window, 'scrollTo');
    
    component.explorePlans();
    
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/pricing']);
    expect(window.scrollTo).toHaveBeenCalledWith(0, 0);
  });

  it('should switch language when switchLanguage is called', () => {
    component.switchLanguage('es');
    
    expect(component.selectedLanguage).toBe('es');
  });

  it('should scroll to top on init', () => {
    spyOn(window, 'scrollTo');
    
    component.ngOnInit();
    
    expect(window.scrollTo).toHaveBeenCalledWith({ top: 6, behavior: 'smooth' });
  });

  it('should have correct hero configuration', () => {
    expect(component.herosConfig).toBeDefined();
  });

  it('should initialize chat as disabled', () => {
    expect(component.isChatEnabled).toBeFalse();
  });
});

