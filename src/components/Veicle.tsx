import React, { useState, useRef } from "react";
import { Tr, Td, Flex, Button } from "@chakra-ui/react";
import { IVeicles } from "@/types/veicles.types";
import { deleteVeicle } from "@/services/api";
import { useDisclosure } from "@chakra-ui/react";
import EditModal from "./EditModal";

interface VeicleProps {
  veicle: IVeicles;
  onUpdate: () => void;
}

const Veicle: React.FC<VeicleProps> = ({ veicle, onUpdate }) => {
  const [isDeleting, setIsDeleting] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const finalRef = React.useRef(null); //AQUI TENTO SETAR 

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
    <>
      <Flex>
        <Button
          size="sm"
          fontSize="small"
          colorScheme="yellow"
          mr="2"
          onClick={onOpen}
        >
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
      <EditModal
        isOpen={isOpen}
        onClose={onClose}
        veicle={veicle}
        onUpdate={onUpdate}
        finalRef={finalRef} 
      />
    </>
  );
};

export default Veicle;
