export class Stream {

  gameId: string;
  language: string;
  liveId: string;
  startTime: string;
  thumbnailUrl: string;
  updatedThumbnailUrl: string;
  title: string;
  type: string;
  userId: string;
  username: string;
  viewerCount: number;

  constructor(gameId: string,
              language: string,
              liveId: string,
              startTime: string,
              thumbnailUrl: string,
              title: string,
              type: string,
              userId: string,
              username: string,
              viewerCount: number) {
    this.gameId = gameId;
    this.language = language;
    this.liveId = liveId;
    this.startTime = startTime;
    this.thumbnailUrl = thumbnailUrl;
    this.title = title;
    this.type = type;
    this.userId = userId;
    this.username = username;
    this.viewerCount = viewerCount;
  }

}
