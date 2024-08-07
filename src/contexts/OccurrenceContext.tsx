import { OccurrenceCardDTO } from "@/dtos/OccurrenceCardDTO";
import { OccurrenceDTO } from "@/dtos/OccurrenceDTO";
import { api } from "@/services/api";
import { storageAuthTokenGet } from "@/storage/storageAuthToken";
import { NewOccurrenceFormData, OccurrenceStatusEnum } from "@/types";
import { createContext, ReactNode, useState } from "react";

export type OccurrenceContextDataProps = {
  fetchOccurrenceCards: () => Promise<void>;
  occurrenceCards: OccurrenceCardDTO[];
  setOccurrenceCards: (occurrenceCards: OccurrenceCardDTO[]) => void;
  fetchOccurrence: (occurrenceId: string) => Promise<void>;
  occurrence: OccurrenceDTO;
  setOccurrence: (occurrence: OccurrenceDTO) => void;
  handleCreateOccurrence: (
    data: NewOccurrenceFormData,
    encodedUserPhoto: string | null
  ) => Promise<void>;
  handleLikeOccurrence: (occurrenceId: string) => Promise<void>;
  positionOfTheOccurrenceInTheArray: number;
  setPositionOfTheOccurrenceInTheArray: (
    positionOfTheOccurrenceInTheArray: number
  ) => void;
  occurrenceUpdated: boolean;
  setOccurrenceUpdated: (occurrenceUpdated: boolean) => void;
  handleStatusChange: (
    occurrenceId: string,
    status: OccurrenceStatusEnum,
    comment: string
  ) => Promise<void>;
  handleMakeAComment: (occurrenceId: string, comment: string) => Promise<void>;
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

  const [occurrenceUpdated, setOccurrenceUpdated] = useState<boolean>(false);

  const [
    positionOfTheOccurrenceInTheArray,
    setPositionOfTheOccurrenceInTheArray,
  ] = useState<number>(-1);

  const fetchOccurrenceCards = async () => {
    try {
      const token = await storageAuthTokenGet();

      const { data } = await api.get(`posts/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setOccurrenceCards(data.reverse());
    } catch (error) {
      throw error;
    }
  };

  const fetchOccurrence = async (occurrenceId: string) => {
    try {
      const { data } = await api.get(`posts/${occurrenceId}`);

      setOccurrence(data);
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

  const handleMakeAComment = async (occurrenceId: string, comment: string) => {
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

  const handleStatusChange = async (
    occurrenceId: string,
    status: OccurrenceStatusEnum,
    comment: string
  ) => {
    try {
      const token = await storageAuthTokenGet();

      await api.put(`/posts/status/${occurrenceId}`, {
        status,
        statusComment: comment,
        headers: {
          Authorization: "Bearer " + token,
        },
      });
    } catch (error) {
      throw error;
    }
  };

  return (
    <OccurrenceContext.Provider
      value={{
        fetchOccurrenceCards,
        occurrenceCards,
        setOccurrenceCards,
        fetchOccurrence,
        occurrence,
        setOccurrence,
        handleCreateOccurrence,
        handleLikeOccurrence,
        positionOfTheOccurrenceInTheArray,
        setPositionOfTheOccurrenceInTheArray,
        occurrenceUpdated,
        setOccurrenceUpdated,
        handleStatusChange,
        handleMakeAComment,
      }}
    >
      {children}
    </OccurrenceContext.Provider>
  );
};
