"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.fitToData = exports.addCountries = exports.addValues = exports.initMap = exports.updateCircleRadius = void 0;
const mapbox_gl_1 = __importDefault(require("mapbox-gl"));
const countryBounds_1 = require("./countryBounds");
const MIN_CIRCLE_SIZE = 10;
const MAX_CIRCLE_SIZE = 200;
const updateCircleRadius = ({ data, map }) => {
    const plainValues = data.features.map((f) => f.properties.value);
    const valuesTotal = plainValues.reduce((total, v) => total + v, 0);
    if (map) {
        const zoom = map.getZoom() + 1;
        const max = Math.min(MIN_CIRCLE_SIZE * zoom, MAX_CIRCLE_SIZE);
        map.setPaintProperty('clusters', 'circle-radius', [
            'interpolate',
            ['linear'],
            ['/', ['get', 'sum'], valuesTotal],
            0,
            MIN_CIRCLE_SIZE,
            1,
            max,
        ]);
        map.setPaintProperty('unclustered-circle', 'circle-radius', [
            'interpolate',
            ['linear'],
            ['/', ['get', 'value'], valuesTotal],
            0,
            MIN_CIRCLE_SIZE,
            1,
            max,
        ]);
    }
};
exports.updateCircleRadius = updateCircleRadius;
const initMap = ({ mapContainer, onLoad, onZoom }) => {
    const m = new mapbox_gl_1.default.Map({
        container: mapContainer.current,
        style: 'mapbox://styles/nfrade/ckkzrytvp3vtn17lizbcps9ge',
        center: [2.213749, 46.227638],
        zoom: 3,
    });
    m.on('load', onLoad);
    m.on('zoom', onZoom);
    return m;
};
exports.initMap = initMap;
const addValues = ({ data, map, hoverVoteId }) => {
    map.addSource('values', {
        type: 'geojson',
        data,
        cluster: true,
        clusterMaxZoom: 14,
        clusterRadius: 50,
        clusterProperties: {
            sum: ['+', ['get', 'value', ['properties']]],
        },
    });
    // cluster circles
    map.addLayer({
        id: 'clusters',
        type: 'circle',
        source: 'values',
        filter: ['has', 'point_count'],
        paint: {
            'circle-color': [
                'case',
                ['boolean', ['feature-state', 'hover'], false],
                '#6200EE',
                '#8F8E9B',
            ],
            'circle-stroke-color': '#FFFFFF',
            'circle-stroke-width': 3,
            // 'circle-radius' defined in updateCircleRadius
            'circle-opacity': 0.4,
        },
    });
    // unclustered circles
    map.addLayer({
        id: 'unclustered-circle',
        type: 'circle',
        source: 'values',
        filter: ['!', ['has', 'point_count']],
        paint: {
            // 'circle-color': '#8F8E9B',
            'circle-color': [
                'case',
                ['boolean', ['feature-state', 'hover'], false],
                '#6200EE',
                '#8F8E9B',
            ],
            'circle-stroke-color': '#FFFFFF',
            'circle-stroke-width': 3,
            // 'circle-radius' defined in updateCircleRadius
            'circle-opacity': 0.4,
        },
    });
    const popup = new mapbox_gl_1.default.Popup({
        closeButton: false,
        closeOnClick: false,
        anchor: 'bottom-left',
        offset: 20,
    });
    const mousemoveHandler = (e) => {
        if (e.features.length > 0) {
            const feature = e.features[0];
            if (hoverVoteId.current !== feature.id) {
                map.setFeatureState({
                    source: 'values',
                    id: hoverVoteId.current,
                }, { hover: false });
                hoverVoteId.current = feature.id;
                map.setFeatureState({
                    source: 'values',
                    id: hoverVoteId.current,
                }, { hover: true });
                const coordinates = feature.geometry.coordinates.slice();
                const title = feature.properties.cluster
                    ? `${feature.properties.point_count} locations`
                    : feature.properties.name;
                const value = feature.properties.cluster
                    ? feature.properties.sum
                    : feature.properties.value;
                const body = `<h3>${title}</h3><h4>${value}</h4>`;
                // Ensure that if the map is zoomed out such that multiple
                // copies of the feature are visible, the popup appears
                // over the copy being pointed to.
                while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
                    coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
                }
                popup.setLngLat(coordinates).setHTML(body).addTo(map);
            }
        }
    };
    const mouseleaveHandler = () => {
        if (hoverVoteId.current) {
            map.setFeatureState({
                source: 'values',
                id: hoverVoteId.current,
            }, { hover: false });
        }
        hoverVoteId.current = null;
        popup.remove();
    };
    map.on('mousemove', 'clusters', mousemoveHandler);
    map.on('mouseleave', 'clusters', mouseleaveHandler);
    map.on('mousemove', 'unclustered-circle', mousemoveHandler);
    map.on('mouseleave', 'unclustered-circle', mouseleaveHandler);
};
exports.addValues = addValues;
const addCountries = ({ map }) => {
    map.addSource('countries', {
        type: 'vector',
        url: 'mapbox://mapbox.country-boundaries-v1',
    });
    map.addLayer({
        id: 'countries',
        type: 'fill',
        source: 'countries',
        'source-layer': 'country_boundaries',
        filter: [
            'all',
            ['==', ['get', 'disputed'], 'false'],
            [
                'any',
                ['==', 'all', ['get', 'worldview']],
                ['==', 'US', ['get', 'worldview']],
            ],
        ],
        paint: {
            'fill-color': '#8F8E9B',
            'fill-opacity': [
                'case',
                ['boolean', ['feature-state', 'hover'], false],
                0.2,
                0,
            ],
        },
    }
    // 'admin-1-boundary-bg'
    );
    map.on('click', 'countries', function (e) {
        const f = e.features[0];
        fitToCountry({ map, countryCode: f.properties.iso_3166_1 });
    });
};
exports.addCountries = addCountries;
const fitToCountry = ({ map, countryCode }) => {
    const bounds = countryBounds_1.countryBounds[countryCode];
    if (bounds) {
        map.fitBounds([
            [bounds[1][0], bounds[1][1]],
            [bounds[1][2], bounds[1][3]],
        ], {
            padding: 20,
            essential: true,
        });
    }
};
const fitToData = ({ data, map }) => {
    const bounds = new mapbox_gl_1.default.LngLatBounds();
    data.features.forEach((f) => bounds.extend(f.geometry.coordinates));
    map.fitBounds(bounds, {
        padding: 20,
        essential: true,
    });
};
exports.fitToData = fitToData;
//# sourceMappingURL=mapActions.js.map