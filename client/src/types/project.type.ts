import { Client } from "./client.type";
export type Project = {
  id: string;
  name: string;
  description: string;
  status: "Not Started" | "In Progress" | "Done";
  client: Client;
};

export type GetProjectsQuery = {
  projects: Project[];
};

export type GetProjectQuery = {
  project: Project;
};
