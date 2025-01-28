export interface Category {
  isActive: boolean;
  id: number;
  description: string;
  link: string;
  meta: any[];
  name: string;
  parent: string;
  slug: string;
  taxonomy: string;
}

export interface AuthorInfo {
  id: number;
  name: string;
}
export interface PostInfo {
  id: number;
  guid: RenderWP;
  slug: string;
  status: string;
  link: string;
  title: RenderWP;
  content: RenderWP;
  excerpt: RenderWP;
  featured_media: number;
  comment_status: string;
  ping_status: string;
  sticky: boolean;
  template: string;
  format: string;
  categories: number[];
  tags: any[];
  class_list: string[];
  acf: any[];
  jetpack_featured_media_url: string;
  modified: string;
  author: number;
}

export interface RenderWP {
  rendered: string;
  protected: boolean;
}
