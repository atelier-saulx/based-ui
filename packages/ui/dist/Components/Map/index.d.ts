import React from 'react';
import './mapbox-gl.css';
import './popup.css';
declare type EmbeddedMapProps = {
    data: GeoJSON.FeatureCollection<GeoJSON.Geometry>;
};
export declare const EmbeddedMap: React.ForwardRefExoticComponent<EmbeddedMapProps & React.RefAttributes<unknown>>;
export {};
