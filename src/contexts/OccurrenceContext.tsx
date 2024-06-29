import { OccurrenceCardDTO } from "@/dtos/OccurrenceCardDTO";
import { OccurrenceDTO } from "@/dtos/OccurrenceDTO";
import { api } from "@/services/api";
import { storageAuthTokenGet } from "@/storage/storageAuthToken";
import { NewOccurrenceFormData } from "@/types";
import { createContext, ReactNode, useEffect, useState } from "react";

export type OccurrenceContextDataProps = {
  fetchOccurrenceCards: () => Promise<void>;
  occurrenceCards: OccurrenceCardDTO[];
  fetchOccurrence: (occurrenceId: string) => Promise<void>;
  occurrence: OccurrenceDTO;
  handleCreateOccurrence: (
    data: NewOccurrenceFormData,
    encodedUserPhoto: string | null
  ) => Promise<void>;
  handleLikeOccurrence: (occurrenceId: string) => Promise<void>;
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
      throw error;
    }
  };

  const fetchOccurrence = async (occurrenceId: string) => {
    try {
      const response = await api.get(`posts/${occurrenceId}`);

      setOccurrence(response.data);
    } catch (error) {
      throw error;
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

  const handleLikeOccurrence = async (occurrenceId: string) => {
    try {
      const token = await storageAuthTokenGet();

      await api.post(`/posts/likes/${occurrenceId}`, {
        headers: {
          Authorization: "Bearer " + token,
        },
      });
    } catch (error) {
      throw error;
    }
  };

  const HandleMakeAComment = async (occurrenceId: string, comment: string) => {
    try {
      const token = await storageAuthTokenGet();

      await api.post(`/posts/comments/${occurrenceId}`, {
        comment,
        headers: {
          Authorization: "Bearer " + token,
        },
      });
    } catch (error) {
      throw error;
    }
  };

  useEffect(() => {
    fetchOccurrenceCards();
  }, [handleCreateOccurrence]);

  return (
    <OccurrenceContext.Provider
      value={{
        fetchOccurrenceCards,
        occurrenceCards,
        fetchOccurrence,
        occurrence,
        handleCreateOccurrence,
        handleLikeOccurrence,
      }}
    >
      {children}
    </OccurrenceContext.Provider>
  );
};
