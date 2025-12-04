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
      addListener(eventName: string, handler: (...args: any[]) => void): MapsEventListener; // Added
      getStreetView(): StreetViewPanorama | null; // Added
      setStreetView(panorama: StreetViewPanorama | null): void; // Added
    }

    class Marker {
      constructor(opts?: MarkerOptions);
      getPosition(): LatLng | null;
      addListener(eventName: string, handler: () => void): MapsEventListener;
      setMap(map: Map | null): void; // Added
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
      mapTypeControl?: boolean; // Added
      streetViewControl?: boolean; // Added
      streetViewControlOptions?: StreetViewControlOptions; // Added
      fullscreenControl?: boolean; // Added
      fullscreenControlOptions?: FullscreenControlOptions; // Added
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
      RIGHT_BOTTOM = 11,
      RIGHT_TOP = 3,
      // Add other positions as needed
    }

    class StreetViewPanorama {
      constructor(container: Element | null, opts?: StreetViewPanoramaOptions);
      getVisible(): boolean; // Added
      setPosition(position: LatLng | LatLngLiteral): void; // Added
    }

    interface StreetViewPanoramaOptions {
      position?: LatLng | LatLngLiteral;
      pov?: { heading: number; pitch: number };
      zoom?: number;
      visible?: boolean;
    }

    interface StreetViewControlOptions {
      position?: ControlPosition;
    }

    interface FullscreenControlOptions {
      position?: ControlPosition;
    }
  }
}
