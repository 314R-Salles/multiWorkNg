export class YoutubeVideo {
  snippet: Snippet;

}


export class Snippet {
  title: string;
  description: string;
  position: number;
  publishedAt: string;
  thumbnails;
  resourceId;
}
