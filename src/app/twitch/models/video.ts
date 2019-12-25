export class Video {

  videoId: string;
  userId: string;
  username: string;
  title: string;
  description: string;
  createdAt: string;
  publishedAt: string;
  url: string;
  thumbnailUrl: string;
  updatedThumbnailUrl: string;
  viewable: string;
  viewCount: string;
  language: string;
  type: string;
  duration: string;

  constructor(videoId: string,
              userId: string,
              username: string,
              title: string,
              description: string,
              createdAt: string,
              publishedAt: string,
              url: string,
              thumbnailUrl: string,
              viewable: string,
              viewCount: string,
              language: string,
              type: string,
              duration: string) {
    this.videoId = videoId;
    this.userId = userId;
    this.username = username;
    this.title = title;
    this.description = description;
    this.createdAt = createdAt;
    this.publishedAt = publishedAt;
    this.url = url;
    this.thumbnailUrl = thumbnailUrl;
    this.viewable = viewable;
    this.viewCount = viewCount;
    this.language = language;
    this.type = type;
    this.duration = duration;
  }
}
