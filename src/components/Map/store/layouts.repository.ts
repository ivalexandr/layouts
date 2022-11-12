import L from "leaflet";
import { createStore } from "@ngneat/elf";
import {
  getEntity,
  selectAllEntities,
  setEntities,
  updateAllEntities,
  updateEntities,
  withEntities,
} from "@ngneat/elf-entities";
import { Observable } from "rxjs";

export interface Layout {
  id: number;
  name: string;
  isSHow: boolean;
  layout: () => L.TileLayer | L.Marker;
  type: "map" | "marker";
}

const initialState: Layout[] = [
  {
    id: 1,
    name: "OpenStreetMap",
    isSHow: true,
    layout: () => {
      return L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
        maxZoom: 19,
        attribution:
          '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
      });
    },
    type: "map",
  },
  {
    id: 2,
    name: "Street map",
    isSHow: false,
    layout: () => {
      return L.tileLayer(
        "https://a.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png",
        {
          maxZoom: 19,
        }
      );
    },
    type: "map",
  },
  {
    id: 3,
    name: "Memo maps",
    isSHow: false,
    layout: () => {
      return L.tileLayer("https://tile.memomaps.de/tilegen/{z}/{x}/{y}.png", {
        maxZoom: 19,
      });
    },
    type: "map",
  },
  {
    id: 4,
    name: "MapBox",
    isSHow: false,
    layout: () => {
      return L.tileLayer(
        `https://api.mapbox.com/v4/mapbox.satellite/{z}/{x}/{y}@2x.png?access_token=${process.env.REACT_APP_ACCSESS_TOKEN}`,
        {
          maxZoom: 19,
        }
      );
    },
    type: "map",
  },
];

export interface ILayoutRepository {
  layouts$: Observable<Layout[]>;
  updateShow: (id: number) => void;
  getLayout: (id: number) => Layout | undefined;
}

export class LayotsRepository implements ILayoutRepository {
  private store$ = createStore({ name: "layouts" }, withEntities<Layout>());
  layouts$ = this.store$.pipe(selectAllEntities());
  constructor() {
    this.store$.update(setEntities(initialState));
  }
  updateShow(id: number) {
    this.store$.update(updateAllEntities({ isSHow: false }));
    this.store$.update(
      updateEntities(id, (layout) => ({ ...layout, isSHow: !layout.isSHow }))
    );
  }
  getLayout(id: number) {
    return this.store$.query(getEntity(id));
  }
}
