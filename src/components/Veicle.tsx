'use client'
import { IVeicles } from "@/types/veicles.types";
import { Tr, Td, Flex, Button } from "@chakra-ui/react";
import React, { useState } from "react";
import { deleteVeicle } from "@/services/api";

interface VeicleProps {
  veicle: IVeicles;
  onUpdate: () => void;
}

const Veicle: React.FC<VeicleProps> = ({ veicle, onUpdate }) => {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      await deleteVeicle(veicle.id);
      onUpdate();
    } catch (error) {
      console.error("Erro ao excluir veículo:", error);
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <Tr key={veicle.id}>
      <Td>{veicle.name}</Td>
      <Td>{veicle.date}</Td>
      <Td>{veicle.status}</Td>
      <Td>{veicle.avaliation}</Td>
      <Td>
        <Flex>
          <Button size="sm" fontSize="small" colorScheme="yellow" mr="2">
            Editar
          </Button>
          <Button
            size="sm"
            fontSize="small"
            colorScheme="red"
            mr="2"
            onClick={handleDelete}
            isLoading={isDeleting}
            loadingText="Removendo..."
          >
            Remover
          </Button>
        </Flex>
      </Td>
    </Tr>
  );
};

export default Veicle;
