import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AuthorInfo, PostInfo } from '../resources/models/wordpress-models';
import { ResourcesService } from '../resources/services/resources.service';

@Component({
  selector: 'app-each-post-content',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './each-post-content.component.html',
  styleUrl: './each-post-content.component.scss',
})
export class EachPostContentComponent implements OnInit {
  currentPost!: PostInfo;
  postsByCategory: PostInfo[] = [];
  authorInfo!: AuthorInfo;

  constructor(private readonly resourcesService: ResourcesService) {}
  ngOnInit(): void {
    this.resourcesService.currentSelectedPostInfo.subscribe({
      next: res => {
        this.currentPost = res;
        if (this.currentPost?.author) {
          this.resourcesService
            .getPostAuthor(this.currentPost.author)
            .subscribe({
              next: res => {
                this.authorInfo = res;
              },
            });
        }
      },
    });
    this.resourcesService.currentPostsByCategory.subscribe({
      next: res => {
        this.postsByCategory = res;
      },
    });
  }

  getLastModifiedData(post: PostInfo) {
    return post.modified
      ? `${new Date(post.modified).toDateString()} -- By ${this.authorInfo?.name}`
      : '';
  }

  changePostInfo(post: PostInfo) {
    this.currentPost = post;
  }
}
