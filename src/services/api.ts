import { VeicleData } from "@/schemas/veicle.schema";

const baseUrl = process.env.NODE_ENV === 'production' ? '' : 'http://localhost:3001';

export const getAllVeicles = async (): Promise<VeicleData[]> => {
  const response = await fetch(`${baseUrl}/veicles`, {cache: 'no-store'});
  const veicles = await response.json();
  return veicles;
};

export const getVeicleById = async (id: string): Promise<VeicleData> => {
  const response = await fetch(`${baseUrl}/veicles/${id}`);
  const veicle = await response.json();
  return veicle;
};

export const createVeicle = async (data: Partial<VeicleData>): Promise<VeicleData> => {
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

export const updateVeicle = async (id: string, data: Partial<VeicleData>): Promise<void> => {
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