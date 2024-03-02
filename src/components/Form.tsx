"use client";
import React, { useState } from "react";
import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  Input,
  VStack,
  Checkbox,
  RadioGroup,
  HStack,
  Radio,
} from "@chakra-ui/react";
import { createVeicle } from "@/services/api";

const Form = () => {
  const [carName, setCarName] = useState("");
  const [reservationDate, setReservationDate] = useState("");
  const [status, setStatus] = useState("Available");
  const [ratings, setRatings] = useState<(string | number)[]>([]);
  const [isFormVisible, setIsFormVisible] = useState(false);

  const handleStarClick = (value: number) => {
    const newRatings = [];
    for (let i = 1; i <= 5; i++) {
      if (i <= value) {
        newRatings.push(i);
      }
    }
    setRatings(newRatings);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createVeicle({
        name: carName,
        date: reservationDate,
        status,
        avaliation: ratings.join(", "),
      });
      setCarName("");
      setReservationDate("");
      setStatus("Available");
      setRatings([]);
      setIsFormVisible(false);
    } catch (error) {
      console.error("Erro ao cadastrar veículo:", error);
    }
  };

  return (
    <>
      <Flex justifyContent="flex-end">
        <Button
          colorScheme="green"
          onClick={() => setIsFormVisible(!isFormVisible)}
        >
          +
        </Button>
      </Flex>

      {isFormVisible && (
        <VStack className="" as="form" onSubmit={handleSubmit}>
          <FormControl>
            <FormLabel htmlFor="carNameInput">CARRO</FormLabel>
            <Input
              type="text"
              placeholder="Nome do Item"
              value={carName}
              onChange={(e) => setCarName(e.target.value)}
              id="carNameInput"
            />
          </FormControl>

          <FormControl>
            <FormLabel htmlFor="reservationDateInput">
              PRÓXIMA RESERVA
            </FormLabel>
            <Input
              type="date"
              placeholder="Data da Reserva"
              value={reservationDate}
              onChange={(e) => setReservationDate(e.target.value)}
              id="reservationDateInput"
            />
          </FormControl>

          <FormControl as="fieldset">
            <FormLabel as="legend">STATUS</FormLabel>
            <RadioGroup
              value={status}
              onChange={(value) => setStatus(value as string)}
            >
              <HStack spacing="24px">
                <Radio value="Available">Disponível</Radio>
                <Radio value="Unavailable">Indisponível</Radio>
              </HStack>
            </RadioGroup>
          </FormControl>

          <FormControl>
          {/* <FormLabel>Avaliação</FormLabel> */}
            {[1, 2, 3, 4, 5].map((value) => (
              <Checkbox
                key={value}
                isChecked={ratings.includes(value)}
                onChange={() => handleStarClick(value)}
                id={`starCheckbox${value}`} // Adicionando um ID único para cada checkbox
              >
                {value}
              </Checkbox>
            ))}
          </FormControl>

          <Button colorScheme="green" type="submit" mt={6}>
            Cadastrar
          </Button>
        </VStack>
      )}
    </>
  );
};

export default Form;
