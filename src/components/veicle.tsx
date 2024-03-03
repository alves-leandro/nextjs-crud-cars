import React, { useState } from "react";
import {
  Td,
  Button,
  Flex,
  Tr,
  useDisclosure,
  Link,
  Box,
  Text,
  Image,
} from "@chakra-ui/react";
import { deleteVeicle } from "@/services/api";
import EditModal from "./editModal";
import { VeicleData } from "@/schemas/veicle.schema";
import { useRouter } from "next/navigation";
import { StarIcon } from "@chakra-ui/icons";
// import Image from "next/image";

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
            color={value <= rating ? "yellow.400" : "gray.300"}
            boxSize={{ base: 3, md: 4 }}
          />
        ))}
      </Flex>
    );
  };

  const avaliationNumber = parseInt(veicle.avaliation);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Available":
        return "green";
      case "Unavailable":
        return "red";
      default:
        return "transparent";
    }
  };

  return (
    <Tr borderBottomWidth={0}>
      <Td>
        <Link href={`/${veicle.id}`}>

            <Image
              src={veicle.image}
              alt={veicle.name}
              boxSize={{ base: "50px", md: "115px" }}
              objectFit="fill"
              
            />

        </Link>
      </Td>
      <Td>
        <Text fontSize={{ base: "sm", md: "md" }}>{veicle.name}</Text>
      </Td>
      <Td>
        <Text fontSize={{ base: "sm", md: "md" }}>{veicle.date}</Text>
      </Td>
      <Td>
        <Box
          bg={getStatusColor(veicle.status)}
          display="inline-block"
          borderRadius="md"
          px={2}
          py={1}
        >
          <Text fontSize={{ base: "sm", md: "md" }}>{veicle.status}</Text>
        </Box>
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
