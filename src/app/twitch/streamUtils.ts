import {User} from './models/user';
import {Video} from './models/video';

export function updateStreamUrls(users: User[]): User[] {
  return users.map(user => {
      return {
        ...user,
        live: !!user.live ? {
          ...user.live,
          updatedThumbnailUrl: user.live.thumbnailUrl
            .replace('{width}', '750')
            .replace('{height}', '500'),
          updatedGameIconUrl: user.live.gameIconUrl
            .replace('{width}', '300')
            .replace('{height}', '300')
        } : null,
      };
    }
  );
}

export function updateVideoUrl(videos: Video[]): Video[] {
  return videos.map(video => {
      return {
        ...video,
        updatedThumbnailUrl: video.thumbnailUrl
          .replace('%{width}', '750')
          .replace('%{height}', '500')
      };
    }
  );
}
