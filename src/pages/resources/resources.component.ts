import { Component, OnInit } from '@angular/core';
import { BookConsultationComponent } from '../../common/sharedComponents/book-consultation/book-consultation.component';
import { ResourcesService } from './services/resources.service';
import { Category, PostInfo } from './models/wordpress-models';
import { CommonModule } from '@angular/common';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-resources',
  standalone: true,
  imports: [BookConsultationComponent, CommonModule],
  templateUrl: './resources.component.html',
  styleUrl: './resources.component.scss',
})
export class ResourcesComponent implements OnInit{
  title: string = 'Powering Exceptional Customer Journeys.';
  wPCategories: Category[] = [];
  activeCategory!: Category;

  wPPosts: PostInfo[] = [];

  constructor(private readonly resourcesService: ResourcesService, private readonly router: Router) {}
  ngOnInit(): void {
   this.resourcesService.getAllCategies().subscribe({
    next: res => {
      this.wPCategories = res;
      this.activeCategory = this.wPCategories[0];
      this.getCategoryPosts();
    }
   })
  }

  getCategoryPosts(){
    this.resourcesService.getPostsByCategory(this.activeCategory.id).subscribe({
      next: res => {
        console.log('all posts are ::::::: ', res);
        this.wPPosts = res
      }
    })
  }
  getCategoryTabName(category: Category) {
    return `${category.id}-tab`
  }
  tabChange(category: Category) {
    this.activeCategory = category;
    this.getCategoryPosts();
  }

  goToPost(post: PostInfo) {
    this.router.navigate(['/resources']);
  }
}
