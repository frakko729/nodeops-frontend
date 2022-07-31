import { Bridge } from "./Bridge";
import { Chain } from "./Chain";
import { Provider } from "./Provider";
import { Region } from "./Region";

export interface Node {
  id: number;
  name: string;
  provider?: Provider;
  region?: Region;
  chains?: Chain[];
  bridges?: Bridge[];
  nodeJobsCount?: number;
  oracleAddress?: string;
}
