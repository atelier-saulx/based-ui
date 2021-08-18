import mapboxgl from 'mapbox-gl';
export declare const updateCircleRadius: ({ data, map }: {
    data: any;
    map: any;
}) => void;
export declare const initMap: ({ mapContainer, onLoad, onZoom }: {
    mapContainer: any;
    onLoad: any;
    onZoom: any;
}) => mapboxgl.Map;
export declare const addValues: ({ data, map, hoverVoteId }: {
    data: any;
    map: any;
    hoverVoteId: any;
}) => void;
export declare const addCountries: ({ map }: {
    map: any;
}) => void;
export declare const fitToData: ({ data, map }: {
    data: any;
    map: any;
}) => void;
