/**
 * Bunny Stream API Client
 * 
 * Документація API: https://docs.bunny.net/reference/bunnystream-api-overview
 */

export interface BunnyVideo {
  videoId: string;
  title: string;
  libraryId: string;
  dateUploaded: string;
  views: number;
  isPublic: boolean;
  length: number;
  status: number;
  framerate: number;
  rotation: number;
  width: number;
  height: number;
  availableResolutions: string;
  thumbnailCount: number;
  encodeProgress: number;
  storageSize: number;
  captions: any[];
  chapters: any[];
  moments: any[];
  metaTags: any[];
  transcodingMessages: any[];
  duration: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateVideoRequest {
  title: string;
  collectionId?: string;
}

export interface UpdateVideoRequest {
  title?: string;
  collectionId?: string;
}

class BunnyStreamClient {
  private apiKey: string;
  private libraryId: string;
  private baseUrl: string;

  constructor() {
    this.apiKey = process.env.NEXT_PUBLIC_BUNNY_STREAM_API_KEY || '';
    this.libraryId = process.env.NEXT_PUBLIC_BUNNY_STREAM_LIBRARY_ID || '';
    this.baseUrl = 'https://video.bunnycdn.com';
  }

  /**
   * Get all videos from library
   */
  async getVideos(page?: number, itemsPerPage?: number): Promise<BunnyVideo[]> {
    try {
      const params = new URLSearchParams();
      if (page) params.append('page', page.toString());
      if (itemsPerPage) params.append('itemsPerPage', itemsPerPage.toString());

      const response = await fetch(
        `${this.baseUrl}/library/${this.libraryId}/videos?${params}`,
        {
          method: 'GET',
          headers: {
            'AccessKey': this.apiKey,
            'Accept': 'application/json',
          },
        }
      );

      if (!response.ok) {
        throw new Error(`Failed to fetch videos: ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Error fetching videos:', error);
      throw error;
    }
  }

  /**
   * Get specific video by ID
   */
  async getVideo(videoId: string): Promise<BunnyVideo> {
    try {
      const response = await fetch(
        `${this.baseUrl}/library/${this.libraryId}/videos/${videoId}`,
        {
          method: 'GET',
          headers: {
            'AccessKey': this.apiKey,
            'Accept': 'application/json',
          },
        }
      );

      if (!response.ok) {
        throw new Error(`Failed to fetch video: ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Error fetching video:', error);
      throw error;
    }
  }

  /**
   * Create a new video entry
   */
  async createVideo(data: CreateVideoRequest): Promise<BunnyVideo> {
    try {
      const response = await fetch(
        `${this.baseUrl}/library/${this.libraryId}/videos`,
        {
          method: 'POST',
          headers: {
            'AccessKey': this.apiKey,
            'Content-Type': 'application/json',
            'Accept': 'application/json',
          },
          body: JSON.stringify(data),
        }
      );

      if (!response.ok) {
        throw new Error(`Failed to create video: ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Error creating video:', error);
      throw error;
    }
  }

  /**
   * Update video metadata
   */
  async updateVideo(videoId: string, data: UpdateVideoRequest): Promise<BunnyVideo> {
    try {
      const response = await fetch(
        `${this.baseUrl}/library/${this.libraryId}/videos/${videoId}`,
        {
          method: 'POST',
          headers: {
            'AccessKey': this.apiKey,
            'Content-Type': 'application/json',
            'Accept': 'application/json',
          },
          body: JSON.stringify(data),
        }
      );

      if (!response.ok) {
        throw new Error(`Failed to update video: ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Error updating video:', error);
      throw error;
    }
  }

  /**
   * Delete a video
   */
  async deleteVideo(videoId: string): Promise<void> {
    try {
      const response = await fetch(
        `${this.baseUrl}/library/${this.libraryId}/videos/${videoId}`,
        {
          method: 'DELETE',
          headers: {
            'AccessKey': this.apiKey,
            'Accept': 'application/json',
          },
        }
      );

      if (!response.ok) {
        throw new Error(`Failed to delete video: ${response.statusText}`);
      }
    } catch (error) {
      console.error('Error deleting video:', error);
      throw error;
    }
  }

  /**
   * Get video playback URL
   */
  getVideoUrl(videoId: string, protocol: 'https' | 'hls' | 'hls2' = 'https'): string {
    const libraryId = this.libraryId;
    
    if (protocol === 'hls' || protocol === 'hls2') {
      return `https://vz-${libraryId}.b-cdn.net/${videoId}/play_${protocol}.m3u8`;
    }
    
    return `https://vz-${libraryId}.b-cdn.net/${videoId}/play.mp4`;
  }

  /**
   * Get video thumbnail URL
   */
  getThumbnailUrl(videoId: string, thumbnailId: number = 1): string {
    const libraryId = this.libraryId;
    return `https://vz-${libraryId}.b-cdn.net/${videoId}/${thumbnailId}.jpg`;
  }

  /**
   * Get video embed code (for iframe)
   */
  getEmbedUrl(videoId: string): string {
    const libraryId = this.libraryId;
    return `https://iframe.mediadelivery.net/embed/${libraryId}/${videoId}`;
  }
}

export const bunnyStreamClient = new BunnyStreamClient();

