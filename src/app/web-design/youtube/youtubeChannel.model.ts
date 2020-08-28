export class YoutubeChannel {
  snippet: Snippet;
  contentDetails: ContentDetails;
  statistics: Statistics;
}

export class Snippet {
  title;
  description;
  customUrl;
  publishedAt;
  thumbnails;
  defaultLanguage;
  country;
}

export class ContentDetails {
  relatedPlaylists: RelatedPlaylists;
}

export class RelatedPlaylists {
  uploads: string;
}

export class Statistics {
  viewCount: number;
  subscriberCount: number;
  videoCount: number;
}

export class ChannelSettings {
  defaultTab: string;
  description: string;
  featuredChannelsTitle: string;
  featuredChannelsUrls: string[];
  keywords: string;
  profileColor: string;
  title: string;
  trackingAnalyticsAccountId: string;
  unsubscribedTrailer: string;
}

