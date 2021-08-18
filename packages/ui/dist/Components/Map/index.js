"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmbeddedMap = void 0;
const react_1 = __importStar(require("react"));
require("./mapbox-gl.css");
require("./popup.css");
const mapbox_gl_1 = __importDefault(require("mapbox-gl"));
const mapActions_1 = require("./mapActions");
const theme_1 = require("@based/theme");
mapbox_gl_1.default.accessToken =
    'pk.eyJ1IjoibmZyYWRlIiwiYSI6ImNra3h0cDhtNjA0NWYyb21zcnBhN21ra28ifQ.m5mqJjuX7iK9Z8JvNNcnfg';
exports.EmbeddedMap = react_1.forwardRef(({ data }, ref) => {
    const mapContainer = react_1.useRef(null);
    const map = react_1.useRef(null);
    const hoverVoteId = react_1.useRef(null);
    react_1.useImperativeHandle(ref, () => ({
        fitToData: () => {
            if (!map.current)
                return;
            mapActions_1.fitToData({ data, map: map.current });
        },
    }));
    react_1.useEffect(() => {
        const m = mapActions_1.initMap({
            mapContainer,
            onLoad: () => {
                mapActions_1.addValues({ data, map: m, hoverVoteId });
                mapActions_1.addCountries({ map: m });
                mapActions_1.updateCircleRadius({ data, map: m });
                map.current = m;
            },
            onZoom: () => {
                mapActions_1.updateCircleRadius({ data, map: m });
            },
        });
        return () => {
            if (map.current) {
                map.current.remove();
            }
        };
    }, []);
    react_1.useEffect(() => {
        if (map.current) {
            mapActions_1.updateCircleRadius({ data, map: map.current });
            map.current.getSource('values').setData(data);
        }
    }, [map, data]);
    return (react_1.default.createElement("div", { ref: mapContainer, style: {
            border: '1px solid ' + theme_1.useColor({ color: 'divider' }),
            borderRadius: 4,
            overflow: 'hidden',
            width: '100%',
            height: 'calc(100vh /2)',
        } }));
});
//# sourceMappingURL=index.js.map