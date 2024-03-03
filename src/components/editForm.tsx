import React, { useState } from "react";
import { FormControl, FormLabel, Input, Button } from "@chakra-ui/react";
import { updateVeicle } from "@/services/api";
import { VeicleData } from "@/schemas/veicle.schema";

interface EditFormProps {
  veicle: VeicleData;
  onUpdate: () => void;
  onClose: () => void;
}

const EditForm: React.FC<EditFormProps> = ({ veicle, onUpdate, onClose }) => {
  const [editedVeicle, setEditedVeicle] = useState({
    name: veicle.name,
    date: veicle.date,
    status: veicle.status,
    avaliation: veicle.avaliation,
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditedVeicle((prevVeicle) => ({
      ...prevVeicle,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await updateVeicle(veicle.id, editedVeicle);
      onUpdate();
      onClose();
    } catch (error) {
      console.error("Erro ao atualizar veículo:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <FormControl>
        <FormLabel>Nome</FormLabel>
        <Input
          type="text"
          name="name"
          value={editedVeicle.name}
          onChange={handleInputChange}
          autoComplete="off"
        />
      </FormControl>
      <FormControl>
        <FormLabel>Data</FormLabel>
        <Input
          type="text"
          name="date"
          value={editedVeicle.date}
          onChange={handleInputChange}
          autoComplete="off"
        />
      </FormControl>
      <FormControl>
        <FormLabel>Status</FormLabel>
        <Input
          type="text"
          name="status"
          value={editedVeicle.status}
          onChange={handleInputChange}
          autoComplete="off"
        />
      </FormControl>
      <FormControl>
        <FormLabel>Avaliação</FormLabel>
        <Input
          type="text"
          name="avaliation"
          value={editedVeicle.avaliation}
          onChange={handleInputChange}
          autoComplete="off"
        />
      </FormControl>
      <Button colorScheme="blue" mr={3} type="submit">
        Salvar
      </Button>
      <Button variant="ghost" onClick={onClose}>
        Cancelar
      </Button>
    </form>
  );
};

export default EditForm;
