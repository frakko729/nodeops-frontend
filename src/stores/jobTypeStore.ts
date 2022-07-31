import { JobType } from "@/interfaces/backend/models/JobType";
import { defineStore } from "pinia";

export const useJobTypeStore = defineStore("jobType", {
  state: () => ({
    jobTypes: [{ id: 1, name: "Direct Request" }] as JobType[],
  }),
});
