import { useState, useEffect, useContext, FC } from "react";
import { LayoutContext } from "../../../context/layouts.repository.context";
import { Layout } from "../store/layouts.repository";
import { LayerCheckbox } from "../LayerCheckbox";
import L from "leaflet";
import "./style.css";

interface ILayersControl {
  map: L.Map;
}

const LayersControl: FC<ILayersControl> = ({ map }) => {
  const [layers, setLayers] = useState<Layout[]>([]);
  const { repository } = useContext(LayoutContext);

  useEffect(() => {
    repository.layouts$.subscribe(setLayers);
    //eslint-disable-next-line
  }, []);

  return (
    <div className="layers-control">
      {layers.map((item) => (
        <LayerCheckbox key={item.id} {...item} map={map} />
      ))}
    </div>
  );
};

export { LayersControl };
