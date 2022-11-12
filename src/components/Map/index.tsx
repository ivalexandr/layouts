import { useEffect, useState } from "react";
import { LayersControl } from "./LayersControl";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "./style.css";

const Map = () => {
  const [map, setMap] = useState<L.Map>();

  useEffect(() => {
    setMap(L.map("map").setView([55.125, 53.745], 5));
  }, []);

  return (
    <div id="map">
      <LayersControl map={map!} />
    </div>
  );
};

export { Map };
