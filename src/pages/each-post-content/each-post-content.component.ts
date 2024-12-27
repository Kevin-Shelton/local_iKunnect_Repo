import { Component, OnInit } from '@angular/core';
import { ResourcesService } from '../resources/services/resources.service';
import { CommonModule } from '@angular/common';
import { AuthorInfo, PostInfo } from '../resources/models/wordpress-models';

@Component({
  selector: 'app-each-post-content',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './each-post-content.component.html',
  styleUrl: './each-post-content.component.scss'
})
export class EachPostContentComponent implements OnInit{
  currentPost!: PostInfo;
  postsByCategory: PostInfo[]= [];
  authorInfo!: AuthorInfo;
  
  constructor(private readonly resourcesService: ResourcesService) {}
  ngOnInit(): void {
   this.resourcesService.currentSelectedPostInfo.subscribe({
    next:res => {
      this.currentPost = res;
     this.resourcesService.getPostAuthor(this.currentPost.author).subscribe({
      next: res => {
        this.authorInfo = res;
      }
     })
    }
   });
   this.resourcesService.currentPostsByCategory.subscribe({
    next:res => {
      this.postsByCategory = res;
    }
   });
  }

  getLastModifiedData(post: PostInfo) {
    return new Date(post.modified).toDateString()
  }

  changePostInfo(post: PostInfo) {
    this.currentPost = post;
  }

}
