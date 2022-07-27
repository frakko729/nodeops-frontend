declare namespace Backend.Filters {
  export interface JobFilter {
    chains: number[];
    status: string[];
    sort: string;
  }
}
