import {Stream} from './stream';

export class User {

  userId: string;
  username: string;
  displayName: string;
  type: string;
  broadcasterType: string;
  description: string;
  profileImage: string;
  offlineImage: string;
  viewCount: number;
  email: string;
  live: Stream;

  token: string;

  constructor(userId: string,
              username: string,
              displayName: string,
              type: string,
              broadcasterType: string,
              description: string,
              profileImage: string,
              offlineImage: string,
              viewCount: number,
              email: string,
              live: Stream) {
    this.userId = userId;
    this.username = username;
    this.displayName = displayName;
    this.type = type;
    this.broadcasterType = broadcasterType;
    this.description = description;
    this.profileImage = profileImage;
    this.offlineImage = offlineImage;
    this.viewCount = viewCount;
    this.email = email;
    this.live = live;

  }
}
