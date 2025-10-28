/**
 * Video types for Bunny Stream integration
 */

export interface VideoData {
  videoId: string;
  title: string;
  thumbnailUrl: string;
  playbackUrl: string;
  embedUrl: string;
  duration: number;
  status: VideoStatus;
  width: number;
  height: number;
  createdAt: string;
  views: number;
  libraryId: string;
}

export enum VideoStatus {
  CREATED = 0,
  UPLOADED = 1,
  PROCESSING = 2,
  FINISHED = 4,
  ERROR = 5,
  QUEUED = 7,
}

export interface VideoUploadProgress {
  videoId: string;
  progress: number;
  status: string;
}

export interface BunnyWebhookEvent {
  VideoId: string;
  Status: number;
  LibraryId: number;
  Title: string;
  VideoGuid: string;
  WebhookType: 'video.completed' | 'video.error' | 'video.uploaded' | 'video.queued';
  CompletedDate?: string;
  Message?: string;
}

export interface VideoPlayerProps {
  videoId: string;
  width?: number;
  height?: number;
  autoplay?: boolean;
  controls?: boolean;
  loop?: boolean;
  muted?: boolean;
  poster?: string;
  preload?: 'none' | 'metadata' | 'auto';
  className?: string;
}

export interface BunnyStreamConfig {
  libraryId: string;
  apiKey: string;
  cdnUrl: string;
}

