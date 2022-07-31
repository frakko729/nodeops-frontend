import { Parameter } from "@/interfaces/Parameter";
import { Bridge } from "./Bridge";
import { Deployment } from "./Deployment";
import { JobType } from "./JobType";
import { NodeJob } from "./NodeJob";

export interface Job {
  id: number;
  name: string;
  url: string;
  method?: string;
  jobType?: JobType;
  staticParameters?: Parameter[];
  dynamicParameters?: Parameter[];
  headers?: Parameter[];
  tasks?: Parameter[];
  code?: string;
  deployments?: Deployment[];
  customBridge?: boolean;
  bridge?: Bridge;
  nodeJob?: NodeJob;
}
