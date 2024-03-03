import React, { useState } from "react";
import { Td, Button, Flex, Tr, useDisclosure, Link, Box, Text } from "@chakra-ui/react";
import { deleteVeicle } from "@/services/api";
import EditModal from "./editModal";
import { VeicleData } from "@/schemas/veicle.schema";
import { useRouter } from "next/navigation";
import { StarIcon } from "@chakra-ui/icons";

interface VeicleProps {
  veicle: VeicleData;
}

const Veicle: React.FC<VeicleProps> = ({ veicle }) => {
  const router = useRouter();
  const [isDeleting, setIsDeleting] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [showButtons, setShowButtons] = useState(false);

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      await deleteVeicle(veicle.id);
      router.refresh();
    } catch (error) {
      console.error("Erro ao excluir veículo:", error);
    } finally {
      setIsDeleting(false);
      setShowButtons(false);
    }
  };

  const renderStars = (rating: number) => {
    return (
      <Flex>
        {[1, 2, 3, 4, 5].map((value) => (
          <StarIcon
            key={value}
            color={value <= rating ? "yellow.500" : "gray.300"}
            boxSize={{ base: 3, md: 4 }} 
          />
        ))}
      </Flex>
    );
  };

  const avaliationNumber = parseInt(veicle.avaliation);

  return (
    <Tr borderBottomWidth={0}>
      <Td>
        <Link href={`/${veicle.id}`}>IMAGE</Link>
      </Td>
      <Td>
        <Text fontSize={{ base: "sm", md: "md" }}>{veicle.name}</Text>
      </Td>
      <Td>
        <Text fontSize={{ base: "sm", md: "md" }}>{veicle.date}</Text>
      </Td>
      <Td>
        <Text fontSize={{ base: "sm", md: "md" }}>{veicle.status}</Text>
      </Td>
      <Td>{renderStars(avaliationNumber)}</Td>
      <Td>
        <Flex position="relative">
          <Button
            size="sm"
            fontSize="small"
            colorScheme="blue"
            onClick={() => setShowButtons(!showButtons)}
          >
            ...
          </Button>
          {showButtons && (
            <Flex
              position="absolute"
              top="-30%"
              left="80%"
              flexDirection="column"
              backgroundColor="transparent"
              boxShadow="md"
              borderRadius="md"
              zIndex={1}
              gap={2}
            >
              <Button
                size="sm"
                fontSize="small"
                colorScheme="yellow"
                mr="2"
                onClick={() => {
                  onOpen();
                  setShowButtons(false);
                }}
              >
                Editar
              </Button>
              <Button
                size="sm"
                fontSize="small"
                colorScheme="red"
                onClick={() => {
                  handleDelete();
                  setShowButtons(false);
                }}
                isLoading={isDeleting}
                loadingText="Removendo..."
              >
                Remover
              </Button>
            </Flex>
          )}
        </Flex>
      </Td>
      {isOpen && (
        <Td borderBottomWidth={0}>
          <EditModal isOpen={isOpen} onClose={onClose} veicle={veicle} />
        </Td>
      )}
    </Tr>
  );
};

export default Veicle;
