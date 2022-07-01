export interface Step {
  id: string;
  name: string;
  href?: string;
  status: "current" | "upcoming" | "complete";
}
