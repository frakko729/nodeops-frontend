export interface NodeJobRun {
  id: number;
  externalId: number;
  inputs: string;
  outputs: string;
  errors: string;
  finishedAt: Date;
  status: number;
}
