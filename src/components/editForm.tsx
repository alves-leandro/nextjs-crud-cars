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
    ...veicle,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
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
          onChange={handleChange}
          autoComplete="off"
        />
      </FormControl>

      <FormControl mt={6}>
        <FormLabel>RESERVATION</FormLabel>
        <Input
          type="date"
          name="date"
          value={editedVeicle.date}
          onChange={handleChange}
          autoComplete="off"
        />
      </FormControl>

      <FormControl mt={6}>
        <FormLabel>STATUS</FormLabel>
        <Select
          name="status"
          value={editedVeicle.status}
          onChange={handleChange}
        >
          <option value="Available">Disponível</option>
          <option value="Unavailable">Indisponível</option>
        </Select>
      </FormControl>

      <FormControl mt={6}>
        <FormLabel htmlFor="imageInput">IMAGE</FormLabel>
        <Input
          type="text"
          name="image"
          placeholder="URL da Imagem"
          value={editedVeicle.image}
          onChange={handleChange}
          autoComplete="off"
        />
      </FormControl>

      <FormControl mt={6}>
        <FormLabel as="legend">RATE</FormLabel>
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
          Save
        </Button>
        <Button variant="ghost" onClick={onClose} ml={3} mt={6}>
          Cancel
        </Button>
      </Flex>
    </form>
  );
};

export default EditForm;
