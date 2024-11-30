export interface AuthContextType {
    isAuthenticated: boolean;
    isFinance: boolean;
    userName: string;
    isRetry: boolean;
    accessToken: string;
    setUserName: (userName: string) => void;
    setIsAuthenticated: (isAuthenticated: boolean) => void;
    setIsFinance: (isAdmin: boolean) => void;
    handleLogin: ({
      username,
      password,
    }: {
      username: string;
      password: string;
    }) => void;
    handleSignup: (
      { 
        fullName, 
        password,
        mailId, 
        projects, 
        isFinance
      } :
      {
        fullName: string;
        password: string;
        mailId: string;
        projects: {id:string}[];
        isFinance: boolean;
      }
    ) => void;
    isDataUploaded: boolean;
    setIsDataUploaded: (isDataUploaded: boolean) => void;
  }

  export interface Project {
    id: string;
    name: string;
}

export interface ReportedProject {
  id: string;
  name: string;
  timesheet : TimeSheet[];
}

export interface Client {
  id: string;
  name: string;
}

export interface ConsolidatedProjects {
  id: string;
  name: string;
}

export interface TimeSheet {
  name: string;
  project: string;
  billable: number;
  nonBillable: number;
  leaves: number;
  totalHours: number;
}

  export interface AppContextType {
    projects: Project[];
    clients: Client[];
    consolidatedProjects: ConsolidatedProjects[];
    timeSheet: TimeSheet[];
    setTimeSheet: (timeSheet: TimeSheet[]) => void;
    setProjects: (projects: Project[]) => void;
    setClients: (clients: Client[]) => void;
    setConsolidatedProjects: (consolidatedProjects: ConsolidatedProjects[]) => void;
  }