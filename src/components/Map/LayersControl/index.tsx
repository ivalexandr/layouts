import { useContext, FC } from "react";
import { useObservable } from "@ngneat/use-observable";
import { LayoutContext } from "../../../context/layouts.repository.context";
import { LayerCheckbox } from "../LayerCheckbox";
import L from "leaflet";
import "./style.css";

interface ILayersControl {
  map: L.Map;
}

const LayersControl: FC<ILayersControl> = ({ map }) => {
  const { repository } = useContext(LayoutContext);
  const [layers$] = useObservable(repository.layouts$);

  return (
    <div className="layers-control">
      {map &&
        layers$.map((item) => (
          <LayerCheckbox key={item.id} {...item} map={map} />
        ))}
    </div>
  );
};

export { LayersControl };
