'use client'
import React from "react";
import { Table, Tbody, Th, Thead, Tr } from "@chakra-ui/react";
import Veicle from "./veicle";
import { VeicleData } from "@/schemas/veicle.schema";

interface ListVeiclesProps {
  veicles: VeicleData[]
}

export const VeicleList = ({ veicles }: ListVeiclesProps) => {
  return (
    <div>
      <Table variant="simple" mt={6}>
        <Thead bg="teal.500">
          <Tr>
            <Th textColor="white">IMAGE</Th>
            <Th textColor="white">CAR</Th>
            <Th textColor="white">NEXT RESERVATION</Th>
            <Th textColor="white">STATUS</Th>
            <Th textColor="white">RATING</Th>
            <Th textColor="white">ACTIONS</Th>
          </Tr>
        </Thead>
        <Tbody bg="">
          {veicles.map((veicle) => (
            <Veicle key={veicle.id} veicle={veicle} />
          ))}
        </Tbody>
      </Table>
    </div>
  );
};

export default VeicleList;
