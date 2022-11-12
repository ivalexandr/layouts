import { createContext } from "react";
import {
  LayotsRepository,
  ILayoutRepository,
} from "../components/Map/store/layouts.repository";

interface ILayoutContext {
  repository: ILayoutRepository;
}

export const LayoutContext = createContext<ILayoutContext>({
  repository: {} as LayotsRepository,
});
