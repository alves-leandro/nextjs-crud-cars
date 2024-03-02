'use client'
import { IVeicles } from "@/types/veicles.types";
import { Table, Tbody, Th, Thead, Tr } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import Veicle from "./Veicle";
import { getAllVeicles } from "@/services/api";

export const VeicleList: React.FC = () => {
  const [veicles, setVeicles] = useState<IVeicles[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchedVeicles = await getAllVeicles();
        setVeicles(fetchedVeicles);
      } catch (error) {
        console.error("Erro ao buscar veículos:", error);
      }
    };

    fetchData();
  }, []);

  const handleUpdateVeicles = async () => {
    try {
      const fetchedVeicles = await getAllVeicles();
      setVeicles(fetchedVeicles);
    } catch (error) {
      console.error("Erro ao atualizar lista de veículos:", error);
    }
  };

  return (
    <div>
      <Table variant="simple" mt={6}>
        <Thead bg="teal.500">
          <Tr>
            <Th textColor="white">CAR</Th>
            <Th textColor="white">NEXT RESERVATION</Th>
            <Th textColor="white">STATUS</Th>
            <Th textColor="white">RATING</Th>
            <Th textColor="white">ACTIONS</Th>
          </Tr>
        </Thead>
        <Tbody bg="grey">
          {veicles.map((veicle) => (
            <Veicle
              key={veicle.id}
              veicle={veicle}
              onUpdate={handleUpdateVeicles}
            ></Veicle>
          ))}
        </Tbody>
      </Table>
    </div>
  );
};
