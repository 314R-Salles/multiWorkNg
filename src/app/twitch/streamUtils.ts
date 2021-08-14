import {User} from './models/user';
import * as moment from 'moment';

export function updateStreamUrls(users: User[]): User[] {
  return users.map(user => {
      return {
        ...user,
        live: !!user.live ? {
          ...user.live,
          isRecent: moment.utc().isBefore(moment(user.live.startTime).add(15, 'minutes')),
          updatedThumbnailUrl: user.live?.thumbnailUrl
            .replace('{width}', '750')
            .replace('{height}', '500'),
          updatedGameIconUrl: user.live?.gameIconUrl
            .replace('{width}', '250')
            .replace('{height}', '300')
        } : null,
      };
    }
  );
}
