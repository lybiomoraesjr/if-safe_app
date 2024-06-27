import { OccurrenceCardDTO } from "@/dtos/OccurrenceCardDTO";
import { api } from "@/services/api";
import { storageAuthTokenGet } from "@/storage/storageAuthToken";
import { AppError } from "@/utils/AppError";
import { createContext, ReactNode, useEffect, useState } from "react";
import { Alert } from "react-native";

export type OccurrenceContextDataProps = {
  occurrenceCards: OccurrenceCardDTO[];
};

export const OccurrenceContext = createContext<OccurrenceContextDataProps>(
  {} as OccurrenceContextDataProps
);

type OccurrenceContextProviderProps = {
  children: ReactNode;
};

export const OccurrenceContextProvider = ({
  children,
}: OccurrenceContextProviderProps) => {
  const [occurrenceCards, setOccurrenceCards] = useState<OccurrenceCardDTO[]>(
    []
  );

  const fetchOccurrenceCards = async () => {
    try {
      const token = await storageAuthTokenGet();

      const response = await api.get(`posts/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setOccurrenceCards(response.data);
    } catch (error) {
      const isAppError = error instanceof AppError;
      const title = isAppError
        ? error.data
        : "Não foi possível carregar as ocorrências";

      Alert.alert("Erro", title);
    }
  };

  const fetchOccurrenceDetails = async (occurrenceId: string) => {
    try {
      await api.get(`posts/${occurrenceId}`);
    } catch (error) {
      const isAppError = error instanceof AppError;
      const title = isAppError
        ? error.data
        : "Não foi possível carregar os detalhes da ocorrência.";

      Alert.alert("Erro", title);
    }
  };

  useEffect(() => {
    fetchOccurrenceCards();
  }, []);

  return (
    <OccurrenceContext.Provider value={{ occurrenceCards }}>
      {children}
    </OccurrenceContext.Provider>
  );
};
