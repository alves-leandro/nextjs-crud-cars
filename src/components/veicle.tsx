import React, { useState } from "react";
import { Td, Button, Flex, Tr, useDisclosure, Link } from "@chakra-ui/react";
import { deleteVeicle } from "@/services/api";
import EditModal from "./editModal";
import { VeicleData } from "@/schemas/veicle.schema";
import { useRouter } from "next/navigation";

interface VeicleProps {
  veicle: VeicleData;
}

const Veicle: React.FC<VeicleProps> = ({ veicle }) => {
  const router = useRouter();
  const [isDeleting, setIsDeleting] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      await deleteVeicle(veicle.id);
      router.refresh();
    } catch (error) {
      console.error("Erro ao excluir veículo:", error);
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <Tr>
      <Td>
        <Link href={`/${veicle.id}`}>Teste</Link>
      </Td>
      <Td>{veicle.name}</Td>
      <Td>{veicle.date}</Td>
      <Td>{veicle.status}</Td>
      <Td>{veicle.avaliation}</Td>
      <Td>
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
            onClick={handleDelete}
            isLoading={isDeleting}
            loadingText="Removendo..."
          >
            Remover
          </Button>
        </Flex>
      </Td>
      <Td>
        <EditModal isOpen={isOpen} onClose={onClose} veicle={veicle} />
      </Td>
    </Tr>
  );
};

export default Veicle;
