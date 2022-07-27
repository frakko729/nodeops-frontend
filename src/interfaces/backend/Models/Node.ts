declare namespace Backend.Models {
  export interface Node {
    id: number;
    name: string;
    provider: Backend.Models.Provider;
    region: Backend.Models.Region;
    chains: Backend.Models.Chain[];
    node_jobs_count: number;
  }
}
