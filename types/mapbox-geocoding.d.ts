declare module "@mapbox/mapbox-sdk/services/geocoding" {
  export interface ForwardGeocodeConfig {
    query: string;
    limit?: number;
    countries?: string[];
    types?: string[];
  }

  export interface GeocodingClient {
    forwardGeocode(config: ForwardGeocodeConfig): {
      send(): Promise<{ body: { features: unknown[] } }>;
    };
  }

  /** Mapbox Geocoding API feature (GeoJSON-like). */
  export interface GeocodeFeature {
    center: [number, number]; // [lng, lat]
    place_name: string;
    [key: string]: unknown;
  }

  /** Mapbox Geocoding API response. */
  export interface GeocodeResponse {
    features: GeocodeFeature[];
    [key: string]: unknown;
  }

  export default function (config: { accessToken: string }): GeocodingClient;
}
