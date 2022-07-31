import { Deployment } from "./Deployment";
import { NodeJobRun } from "./NodeJobRun";

export interface NodeJob {
  id: number;
  name: string;
  externalId: number;
  externalJobId: string;
  deployment?: Deployment;
  node?: Node;
  runs?: NodeJobRun[];
}
