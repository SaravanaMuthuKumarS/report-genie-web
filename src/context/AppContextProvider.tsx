import { createContext, useState } from "react";
import {
  AppContextType,
  Client,
  ConsolidatedProjects,
  Project,
  TimeSheet,
} from "../types/appTypes";

export const AppContext = createContext<AppContextType>({
  projects: [],
  clients: [],
  consolidatedProjects: [],
  timeSheet: [],
  setTimeSheet: () => {},
  setClients: () => {},
  setProjects: () => {},
  setConsolidatedProjects: () => {},
});

export default function AppContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [projects, setProjects] = useState<Project[]>([]);
  const [clients, setClients] = useState<Client[]>([]);
  const [consolidatedProjects, setConsolidatedProjects] = useState<
    ConsolidatedProjects[]
  >([]);
  const [timeSheet, setTimeSheet] = useState<TimeSheet[]>([]);

  return (
    <AppContext.Provider
      value={{
        projects,
        clients,
        consolidatedProjects,
        timeSheet,
        setTimeSheet,
        setProjects,
        setClients,
        setConsolidatedProjects,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}
