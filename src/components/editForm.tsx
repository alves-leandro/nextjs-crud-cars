import React, { useState } from "react";
import {
  FormControl,
  FormLabel,
  Input,
  Button,
  Select,
  Flex,
} from "@chakra-ui/react";
import { updateVeicle } from "@/services/api";
import { VeicleData } from "@/schemas/veicle.schema";
import { useRouter } from "next/navigation";
import { StarIcon } from "@chakra-ui/icons";

interface EditFormProps {
  veicle: VeicleData;
  onClose: () => void;
}

const EditForm: React.FC<EditFormProps> = ({ veicle, onClose }) => {
  const router = useRouter();
  const [editedVeicle, setEditedVeicle] = useState<VeicleData>({
    ...veicle, // Copiando todos os dados do veículo para o estado de edição inicial
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditedVeicle((prevVeicle) => ({
      ...prevVeicle,
      [name]: value,
    }));
  };

  const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setEditedVeicle((prevVeicle) => ({
      ...prevVeicle,
      [name]: value,
    }));
  };

  const handleStarClick = (value: number) => {
    setEditedVeicle((prevVeicle) => ({
      ...prevVeicle,
      avaliation: value.toString(),
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await updateVeicle(veicle.id, editedVeicle);
      router.refresh();
      onClose();
    } catch (error) {
      console.error("Erro ao atualizar veículo:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <FormControl>
        <FormLabel>VEICLE</FormLabel>
        <Input
          type="text"
          name="name"
          value={editedVeicle.name}
          onChange={handleInputChange}
          autoComplete="off"
        />
      </FormControl>
      
      <FormControl mt={6}>
        <FormLabel>RESERVATION</FormLabel>
        <Input
          type="date"
          name="date"
          value={editedVeicle.date}
          onChange={handleInputChange}
          autoComplete="off"
        />
      </FormControl>

      <FormControl mt={6}>
        <FormLabel>STATUS</FormLabel>
        <Select
          name="status"
          value={editedVeicle.status}
          onChange={handleStatusChange}
        >
          <option value="Available">Available</option>
          <option value="Unavailable">Unavailable</option>
        </Select>
      </FormControl>

      <FormControl mt={6}>
        <FormLabel as="legend">RATING</FormLabel>

        {[1, 2, 3, 4, 5].map((value) => (
          <StarIcon
            key={value}
            color={
              value <= parseInt(editedVeicle.avaliation)
                ? "yellow.500"
                : "gray.300"
            }
            onClick={() => handleStarClick(value)}
            cursor="pointer"
            boxSize={6}
          />
        ))}
      </FormControl>

      <Flex justifyContent="flex-end">
        <Button colorScheme="blue" type="submit" mt={6}>
          Salvar
        </Button>
        <Button variant="ghost" onClick={onClose} ml={3} mt={6}>
          Cancelar
        </Button>
      </Flex>
    </form>
  );
};

export default EditForm;
