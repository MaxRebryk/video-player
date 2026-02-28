export interface Chapter {
  title: string;
  start: number;
  end: number;
}

export interface VideoData {
  hlsPlaylistUrl: string;
  videoLength: number;
  chapters: Chapter[];
}

export interface HlsLevel {
  height: number;
  width: number;
  bitrate: number;
  url?: string;
}
