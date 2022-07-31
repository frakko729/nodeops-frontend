import { Chain } from "./Chain";
import { NodeJob } from "./NodeJob";
import { Node } from "./Node";

export interface Deployment {
  id: number;
  externalJobId: string;
  status: number;
  node?: Node;
  chain?: Chain;
  nodeJob?: NodeJob;
  toml?: string;
}
