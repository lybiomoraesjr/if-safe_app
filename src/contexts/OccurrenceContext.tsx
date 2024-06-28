import { OccurrenceCardDTO } from "@/dtos/OccurrenceCardDTO";
import { OccurrenceDTO } from "@/dtos/OccurrenceDTO";
import { api } from "@/services/api";
import { storageAuthTokenGet } from "@/storage/storageAuthToken";
import { NewOccurrenceFormData } from "@/types";
import { AppError } from "@/utils/AppError";
import { createContext, ReactNode, useEffect, useState } from "react";
import { Alert } from "react-native";

export type OccurrenceContextDataProps = {
  occurrenceCards: OccurrenceCardDTO[];
  occurrence: OccurrenceDTO;
  fetchOccurrence: (occurrenceId: string) => Promise<void>;
  handleCreateOccurrence: (
    data: NewOccurrenceFormData,
    encodedUserPhoto: string | null
  ) => Promise<void>;
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
  const [occurrence, setOccurrence] = useState<OccurrenceDTO>(
    {} as OccurrenceDTO
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

  const fetchOccurrence = async (occurrenceId: string) => {
    try {
      const response = await api.get(`posts/${occurrenceId}`);

      setOccurrence(response.data);
    } catch (error) {
      const isAppError = error instanceof AppError;
      const title = isAppError
        ? error.data
        : "Não foi possível carregar os detalhes da ocorrência.";

      Alert.alert("Erro", title);
    }
  };

  const handleCreateOccurrence = async (
    data: NewOccurrenceFormData,
    encodedUserPhoto: string | null
  ) => {
    try {
      const token = await storageAuthTokenGet();

      const config = {
        description: data.description,
        image: encodedUserPhoto,
        location: data.location,
        title: data.title,
        headers: {
          Authorization: "Bearer " + token,
          "Content-Type": "application/json",
        },
      };

      await api.post(`/posts`, config);
    } catch (error) {
      throw error;
    }
  };

  useEffect(() => {
    fetchOccurrenceCards();
  }, [handleCreateOccurrence]);

  useEffect(() => {
    fetchOccurrenceCards();
  }, []);

  return (
    <OccurrenceContext.Provider
      value={{
        occurrenceCards,
        occurrence,
        fetchOccurrence,
        handleCreateOccurrence,
      }}
    >
      {children}
    </OccurrenceContext.Provider>
  );
};
