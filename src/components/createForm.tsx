"use client";

import React, { useState } from "react";
import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  Input,
  VStack,
  RadioGroup,
  HStack,
  Radio,
} from "@chakra-ui/react";
import { createVeicle } from "@/services/api";
import { useRouter } from "next/navigation";
import { StarIcon } from "@chakra-ui/icons";

const Form = () => {
  const router = useRouter();
  const [carName, setCarName] = useState("");
  const [reservationDate, setReservationDate] = useState("");
  const [status, setStatus] = useState("Available");
  const [rating, setRating] = useState(0); 
  const [isFormVisible, setIsFormVisible] = useState(false);

  const handleStarClick = (value: number) => {
    setRating(value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createVeicle({
        name: carName,
        date: reservationDate,
        status,
        avaliation: rating.toString(),
      });
      setCarName("");
      setReservationDate("");
      setStatus("Available");
      setRating(0);
      setIsFormVisible(false);
      router.refresh();
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
          <FormControl mt={6}>
            <FormLabel htmlFor="carNameInput">VEICLE</FormLabel>
            <Input
              type="text"
              placeholder="Nome do Item"
              value={carName}
              onChange={(e) => setCarName(e.target.value)}
              id="carNameInput"
            />
          </FormControl>

          <FormControl mt={6}>
            <FormLabel htmlFor="reservationDateInput">
              RESERVATION
            </FormLabel>
            <Input
              type="date"
              placeholder="Data da Reserva"
              value={reservationDate}
              onChange={(e) => setReservationDate(e.target.value)}
              id="reservationDateInput"
            />
          </FormControl>

          <FormControl as="fieldset" mt={6}>
            <FormLabel as="legend">STATUS</FormLabel>
            <RadioGroup
              value={status}
              onChange={(value) => setStatus(value)}
            >
              <HStack spacing="24px">
                <Radio value="Available">Disponível</Radio>
                <Radio value="Unavailable">Indisponível</Radio>
              </HStack>
            </RadioGroup>
          </FormControl>

          <FormControl mt={6}>
            <FormLabel as="legend">RATING</FormLabel>

            {[1, 2, 3, 4, 5].map((value) => (
              <StarIcon
                key={value}
                color={value <= rating ? "yellow.500" : "gray.300"}
                onClick={() => handleStarClick(value)}
                cursor="pointer"
                boxSize={6}
              />
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
