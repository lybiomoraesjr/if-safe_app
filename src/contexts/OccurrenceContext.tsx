import { api } from "@/services/api";
import { storageAuthTokenGet } from "@/storage/storageAuthToken";
import { createContext, ReactNode, useEffect } from "react";

export type OccurrenceContextDataProps = {};

export const OccurrenceContext = createContext<OccurrenceContextDataProps>(
  {} as OccurrenceContextDataProps
);

type OccurrenceContextProviderProps = {
  children: ReactNode;
};

export const OccurrenceContextProvider = ({
  children,
}: OccurrenceContextProviderProps) => {
  return (
    <OccurrenceContext.Provider value={{}}>
      {children}
    </OccurrenceContext.Provider>
  );
};
