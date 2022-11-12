import { FC, useEffect, useContext } from "react";
import { LayoutContext } from "../../../context/layouts.repository.context";
import { Layout } from "../store/layouts.repository";
import L from "leaflet";

interface ILayersControl extends Layout {
  map: L.Map;
}

const LayerCheckbox: FC<ILayersControl> = ({
  id,
  isSHow,
  layout,
  name,
  type,
  map,
}) => {
  const { repository } = useContext(LayoutContext);

  const changeHandler = () => {
    repository.updateShow(id);
  };

  useEffect(() => {
    !isSHow && layout().remove();
    isSHow && layout().addTo(map);
    //eslint-disable-next-line
  }, [isSHow]);

  return (
    <label>
      <input
        name={type}
        type={type === "map" ? "radio" : "checkbox"}
        checked={isSHow}
        onChange={changeHandler}
      />
      <span>{name}</span>
    </label>
  );
};

export { LayerCheckbox };
