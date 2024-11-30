import { Project, ReportedProject } from "../types/appTypes";

export const ROOT_ROUTE = "/";
export const LOGIN_ROUTE = "/login";
export const SIGNUP_ROUTE = "/signin";
export const HOME_ROUTE = "/home";

export const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export const dummyClients = ["Rajesh", "Madan", "Rajsekar", "Praveen"];

export const dummyProjects: Project[] = [
  { id: "1", name: "IAssistant" },
  { id: "2", name: "Web3.0" },
  { id: "3", name: "Roshe" },
  { id: "4", name: "Med-Lab" },
];

export const reportedProjects: ReportedProject[] = [
  {
    id: "1", name: "IAssistant", timesheet: [{
      name: "Saravana",
      project: "Icore",
      billable: 40,
      nonBillable: 10,
      leaves: 5,
      totalHours: 50,
    },
    {
      name: "Yogitaa",
      project: "Icore",
      billable: 30,
      nonBillable: 5,
      leaves: 3,
      totalHours: 35,
    }]
  },
  {
    id: "2", name: "Web3.0", timesheet: [{
      name: "Saravana",
      project: "Icore",
      billable: 40,
      nonBillable: 10,
      leaves: 5,
      totalHours: 50,
    },
    {
      name: "Yogitaa",
      project: "Icore",
      billable: 30,
      nonBillable: 5,
      leaves: 3,
      totalHours: 35,
    }]
  },
  {
    id: "3", name: "Roshe", timesheet: [{
      name: "Saravana",
      project: "Icore",
      billable: 40,
      nonBillable: 10,
      leaves: 5,
      totalHours: 50,
    },
    {
      name: "Yogitaa",
      project: "Icore",
      billable: 30,
      nonBillable: 5,
      leaves: 3,
      totalHours: 35,
    }]
  },
  {
    id: "4", name: "Med-Lab", timesheet: [{
      name: "Saravana",
      project: "Icore",
      billable: 40,
      nonBillable: 10,
      leaves: 5,
      totalHours: 50,
    },
    {
      name: "Yogitaa",
      project: "Icore",
      billable: 30,
      nonBillable: 5,
      leaves: 3,
      totalHours: 35,
    }]
  },
];

export const dummyConsolidatedProjects = [
  { id: "1", name: "IAssistant" },
  { id: "2", name: "Web3.0" },
  { id: "3", name: "Roshe" },
  { id: "4", name: "Med-Lab" },
];

export const predefinedData = [
  {
    name: "Saravana",
    project: "Icore",
    billable: 40,
    nonBillable: 10,
    leaves: 5,
    totalHours: 50,
  },
  {
    name: "Yogitaa",
    project: "Icore",
    billable: 30,
    nonBillable: 5,
    leaves: 3,
    totalHours: 35,
  },
  {
    name: "Sriram",
    project: "Icore",
    billable: 40,
    nonBillable: 10,
    leaves: 5,
    totalHours: 50,
  },
  {
    name: "Dhanalakshmi",
    project: "Icore",
    billable: 30,
    nonBillable: 5,
    leaves: 3,
    totalHours: 35,
  },
];

export const predefinedHeaders = [
  "Employee Name",
  "Project",
  "Billable",
  "Non-Billable",
  "No. of Leaves",
  "Total Hours",
];
