import { IVeicles } from "@/types/veicles.types";

const baseUrl = "http://localhost:3001";

export const getAllVeicles = async (): Promise<IVeicles[]> => {
  const response = await fetch(`${baseUrl}/veicles`);
  const veicles = await response.json();
  return veicles;
};

export const getVeicleById = async (id: string): Promise<IVeicles> => {
  const response = await fetch(`${baseUrl}/veicles/${id}`);
  const veicle = await response.json();
  return veicle;
};

export const createVeicle = async (data: Partial<IVeicles>): Promise<IVeicles> => {
  const response = await fetch(`${baseUrl}/veicles`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  const newVeicle = await response.json();
  return newVeicle;
};

export const updateVeicle = async (id: string, data: Partial<IVeicles>): Promise<void> => {
  await fetch(`${baseUrl}/veicles/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
};

export const deleteVeicle = async (id: string): Promise<void> => {
  await fetch(`${baseUrl}/veicles/${id}`, {
    method: "DELETE",
  });
};