import { CommonModule } from '@angular/common';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { BookConsultationComponent } from '../../common/sharedComponents/book-consultation/book-consultation.component';
import { Category, PostInfo } from './models/wordpress-models';
import { ResourcesService } from './services/resources.service';

@Component({
  selector: 'app-resources',
  standalone: true,
  imports: [BookConsultationComponent, CommonModule],
  templateUrl: './resources.component.html',
  styleUrl: './resources.component.scss',
})
export class ResourcesComponent implements OnInit {
  @ViewChild('widgetsContent', { read: ElementRef }) public widgetsContent:
    | ElementRef<any>
    | undefined;

  title: string = 'Powering Exceptional Customer Journeys.';
  wPCategories: Category[] = [];
  activeCategory!: Category;

  trendingPosts: PostInfo[] = [];
  wPPosts: PostInfo[] = [];

  constructor(
    private readonly resourcesService: ResourcesService,
    private readonly router: Router
  ) {}

  ngOnInit(): void {
    this.resourcesService.getAllCategies().subscribe({
      next: res => {
        this.wPCategories = res;
        this.activeCategory = this.wPCategories[0];

        this.getCategoryPosts();
      },
    });
  }

  getCategoryPosts() {
    this.resourcesService.getPostsByCategory(this.activeCategory.id).subscribe({
      next: res => {
        this.wPPosts = res;
        this.resourcesService.changePostsByCategory(this.wPPosts);
      },
    });
  }

  tabChange(category: Category) {
    this.activeCategory = category;
    this.getCategoryPosts();
  }

  getImageURL(post: PostInfo) {
    return post.jetpack_featured_media_url;
  }

  goToPost(post: PostInfo) {
    this.resourcesService.changeSelectedPostInfo(post);
    this.router.navigate(['/post']);
  }
  getCategoryName(category: Category) {
    return this.resourcesService.decodeHtmlEntity(category.name);
  }

  public scrollRight(): void {
    this.widgetsContent?.nativeElement.scrollTo({
      left: this.widgetsContent?.nativeElement.scrollLeft + 320,
      behavior: 'smooth',
    });
  }

  public scrollLeft(): void {
    this.widgetsContent?.nativeElement.scrollTo({
      left: this.widgetsContent?.nativeElement.scrollLeft - 320,
      behavior: 'smooth',
    });
  }


}
