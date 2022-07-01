import { defineStore } from "pinia";

export const useJobTypeStore = defineStore("jobType", {
  state: () => ({
    jobTypes: [
      { id: 1, name: "Direct Request" },
    ] as Array<Backend.Models.JobType>,
  }),
});
