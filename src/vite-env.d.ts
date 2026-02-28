/// <reference types="vite/client" />

declare module "*.module.css" {
  const classes: { readonly [key: string]: string };
  export default classes;
}

declare module "@/video-player/mocs/video-data" {
  interface Chapter {
    title: string;
    start: number;
    end: number;
  }
  export const videoData: {
    hlsPlaylistUrl: string;
    videoLength: number;
    chapters: Chapter[];
  };
}
