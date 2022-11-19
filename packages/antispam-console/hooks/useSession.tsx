import { createContext, type FC, type ReactNode } from "react";

export type SessionData = { tenant_id: number };

const sessionContext = createContext<SessionData>(null!);

export const useSession = () => {};

const Provider: FC<SessionData & { children: ReactNode }> = ({
  tenant_id,
  children,
}) => {
  return (
    <sessionContext.Provider value={{ tenant_id }}>
      {children}
    </sessionContext.Provider>
  );
};

useSession.Provider = Provider;
