import { useOutletContext } from "react-router-dom";
import type { Farmacia } from "./useFarmacia";
export function useDadosFarmacia() {
  return useOutletContext<Farmacia>();
}
