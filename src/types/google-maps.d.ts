declare namespace google {
  namespace maps {
    class Map {
      constructor(mapDiv: Element | null, opts?: MapOptions);
      getProjection(): Projection;
      getZoom(): number;
      getBounds(): LatLngBounds | undefined;
      setZoom(zoom: number): void; // Added
      setCenter(latLng: LatLng | LatLngLiteral): void; // Added
      setMapTypeId(mapTypeId: MapTypeId): void; // Added for mapType toggle
    }

    class Marker {
      constructor(opts?: MarkerOptions);
      getPosition(): LatLng | null;
      addListener(eventName: string, handler: () => void): MapsEventListener;
    }

    class InfoWindow {
      constructor(opts?: InfoWindowOptions);
      open(options?: InfoWindowOpenOptions | Map, anchor?: Marker): void;
      close(): void;
    }

    class Size {
      constructor(
        width: number,
        height: number,
        widthUnit?: string,
        heightUnit?: string
      );
    }

    class Point {
      constructor(x: number, y: number);
      x: number;
      y: number;
    }

    enum MapTypeId { // Added for map type support
      ROADMAP = "roadmap",
      HYBRID = "hybrid",
      SATELLITE = "satellite",
      TERRAIN = "terrain",
    }

    interface MapOptions {
      center?: LatLngLiteral;
      zoom?: number;
      styles?: Array<MapTypeStyle>;
      disableDefaultUI?: boolean; // Added
      zoomControl?: boolean; // Added
      zoomControlOptions?: ZoomControlOptions; // Added
      mapTypeId?: MapTypeId; // Added
    }

    interface LatLngLiteral {
      lat: number;
      lng: number;
    }

    interface LatLng {
      lat(): number;
      lng(): number;
    }

    interface LatLngBounds {
      getNorthEast(): LatLng;
      getSouthWest(): LatLng;
    }

    interface MarkerOptions {
      position?: LatLngLiteral;
      map?: Map;
      icon?: Icon;
    }

    interface Icon {
      url: string;
      scaledSize?: Size;
    }

    interface MapTypeStyle {
      featureType?: string;
      elementType?: string;
      stylers: Array<{ [key: string]: unknown }>;
    }

    interface Projection {
      fromLatLngToPoint(latLng: LatLng): Point;
    }

    interface MapsEventListener {
      remove(): void;
    }

    interface InfoWindowOptions {
      content?: string | Node;
      position?: LatLng | LatLngLiteral;
      pixelOffset?: Size;
    }

    interface InfoWindowOpenOptions {
      anchor?: Marker;
      map?: Map;
      shouldFocus?: boolean;
    }

    interface ZoomControlOptions {
      // Added
      position?: ControlPosition;
    }

    enum ControlPosition { // Added
      RIGHT_BOTTOM = "RIGHT_BOTTOM",
      // Add other positions as needed
    }
  }
}
