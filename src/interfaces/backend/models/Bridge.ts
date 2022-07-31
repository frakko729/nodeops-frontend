import { Job } from "./Job";

export interface Bridge {
  id: number;
  name: string;
  url: string;
  confirmations: number;
  minimumContractPayment: string;
  job?: Job;
  node?: Node;
}
