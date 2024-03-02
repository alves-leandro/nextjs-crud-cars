"use client";
import { IVeicles } from "@/types/veicles.types";
import { Table, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/react";
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

  const renderVeicleRow = (veicle: IVeicles) => {
    return (
      <Tr key={veicle.id}>
        <Td>{veicle.name}</Td>
        <Td>{veicle.date}</Td>
        <Td>{veicle.status}</Td>
        <Td>{veicle.avaliation}</Td>
        <Td>
          <Veicle veicle={veicle} onUpdate={handleUpdateVeicles} />
        </Td>
      </Tr>
    );
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
        <Tbody bg="">
          {veicles.map((veicle) => renderVeicleRow(veicle))}
        </Tbody>
      </Table>
    </div>
  );
};

export default VeicleList;