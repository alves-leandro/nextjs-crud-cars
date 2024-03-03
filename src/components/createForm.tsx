'use client'

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
  const [image, setImage] = useState("");
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
        image,
      });
      setCarName("");
      setReservationDate("");
      setStatus("Available");
      setRating(0);
      setImage("");
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
              placeholder="Veicle name"
              value={carName}
              onChange={(e) => setCarName(e.target.value)}
              id="carNameInput"
            />
          </FormControl>

          <FormControl mt={6}>
            <FormLabel htmlFor="imageInput">IMAGE</FormLabel>
            <Input
              type="text"
              placeholder="Image URL"
              value={image}
              onChange={(e) => setImage(e.target.value)}
              id="imageInput"
            />
          </FormControl>

          <FormControl mt={6}>
            <FormLabel htmlFor="reservationDateInput">RESERVATION</FormLabel>
            <Input
              type="date"
              placeholder="Reservation Date"
              value={reservationDate}
              onChange={(e) => setReservationDate(e.target.value)}
              min={new Date().toISOString().split('T')[0]}
              id="reservationDateInput"
            />
          </FormControl>

          <FormControl as="fieldset" mt={6}>
            <FormLabel as="legend">STATUS</FormLabel>
            <RadioGroup value={status} onChange={(value) => setStatus(value)}>
              <HStack spacing="24px">
                <Radio value="Available">Available</Radio>
                <Radio value="Unavailable">Unavailable</Radio>
              </HStack>
            </RadioGroup>
          </FormControl>

          <FormControl mt={6}>
            <FormLabel as="legend">RATE</FormLabel>

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
            Register
          </Button>
        </VStack>
      )}
    </>
  );
};

export default Form;
