import { useState, /* ChangeEvent,  */ useRef, useCallback } from "react";
//import type { Schema } from "../amplify/data/resource";
import { useAuthenticator } from "@aws-amplify/ui-react";
import { MapboxOverlayProps } from "@deck.gl/mapbox/typed";
//import { generateClient } from "aws-amplify/data";
import "@aws-amplify/ui-react/styles.css";
//import { MapView } from "@aws-amplify/ui-react-geo";

import "maplibre-gl/dist/maplibre-gl.css"; // Import maplibre-gl styles
import { NavigationControl, MapRef } from "react-map-gl";

import { Map, MapProps, useControl } from "react-map-gl";
import maplibregl from "maplibre-gl";

import { MapboxOverlay } from "@deck.gl/mapbox/typed";

import {
  // Input,
  //Flex,
  Button,
  //Table,
  //TableBody,
  //TableHead,
  //TableCell,
  //TableRow,
  //ThemeProvider,
  //Theme,
  Divider,
  //ScrollView,
  //Tabs,
  //ToggleButton,
  // TextField,
} from "@aws-amplify/ui-react";

import "@aws-amplify/ui-react/styles.css";

import { GeoJsonLayer } from "@deck.gl/layers/typed";

//import { ScatterplotLayer } from "@deck.gl/layers";
import "mapbox-gl/dist/mapbox-gl.css";

const AIR_PORTS =
  "https://u7wrupm2a5.execute-api.us-east-1.amazonaws.com/test/getData";

const MAP_STYLE =
  "https://basemaps.cartocdn.com/gl/positron-gl-style/style.json";
function DeckGLOverlay(props: MapboxOverlayProps) {
  const overlay = useControl<MapboxOverlay>(() => new MapboxOverlay(props));
  overlay.setProps(props);
  return null;
}

function App() {
  const { signOut } = useAuthenticator();

  //const [selected, setSelected] = useState(null);
  //const [hoverInfo, setHoverInfo] = useState(null);
  //const [showPopup, setShowPopup] = useState<boolean>(true);

  const layers = [
    new GeoJsonLayer({
      id: "airports",
      data: AIR_PORTS,
      // Styles
      filled: true,
      pointRadiusMinPixels: 2,
      pointRadiusScale: 20,
      getPointRadius: 8,
      getFillColor: [200, 0, 80, 180],
      // Interactive props
      pickable: true,
      autoHighlight: true,
      //onClick: (info) => setSelected(info.object),
      // beforeId: 'watername_ocean' // In interleaved mode, render the layer under map labels
    }),
  ];

  const handleClick = useCallback((info: any /* event: any */) => {
    if (info.object) {
      console.log(
        "Clicked object:",
        Object.entries(info.object.geometry)[1][1]
      );
      // setSelected(info.object);
    } else {
      //console.log('Clicked on the map at:', info.coordinate);
    }
  }, []);

  const handleHover = useCallback((info: any /* event: any */) => {
    if (info.object) {
      // console.log("Hover object:", info.object);
      // setHoverInfo(info.object);
    } else {
      // console.log('Hover on the map at:', info.coordinate);
    }
  }, []);

  const mapRef = useRef<MapRef | null>(null);
  const [viewState, setViewState] = useState<MapProps["viewState"]>({
    longitude: -74,
    latitude: 40.75,
    zoom: 11,
    pitch: 0,
    bearing: 0
  } as any);

  return (
    <main>
      <h1>Washington Park Project Complaint Data</h1>
      <Divider orientation="horizontal" />
      <br />

      <br />

      <Map
        ref={mapRef}
        mapLib={maplibregl}
        mapStyle={MAP_STYLE} // Use any MapLibre-compatible style
        {...viewState}
        onMove={({ viewState }) => setViewState(viewState as any)}
        style={{ width: "100%", height: "800px" }}
      >
        <DeckGLOverlay
          layers={layers}
          // interleaved
          //controller={true}
          onClick={handleClick}
          onHover={handleHover}
        />
        <NavigationControl position="top-left" />
        {/* {selected && (
          <Popup
            longitude={Object.entries(selected)[1][1]}
            latitude={40}
            anchor="bottom"
            onClose={() => setShowPopup(false)}
          >
            You are here
          </Popup>
        )}  */}
      </Map>
      <Button onClick={signOut} width={120}>
        Sign out
      </Button>
    </main>
  );
}

export default App;
