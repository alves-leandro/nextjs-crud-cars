import { VeicleData } from "@/schemas/veicle.schema";
import { Box, Flex, Image, Text } from "@chakra-ui/react";

interface IdVeicleCardProps {
  veicle: VeicleData;
}

const VeicleIdCard = ({ veicle }: IdVeicleCardProps) => {
  return (
    <Box>
      <Box boxSize="lg" boxShadow="md" p={4} rounded="md" textAlign="center">
        <Image src={veicle.image} alt={veicle.name} height="100%" width="100%" />
      </Box>

      <Box mt={4} boxShadow="md" p={4} rounded="md" textAlign="center">
        <Flex align="center" justifyContent="space-around">
          <Text fontSize={{ base: "sm", md: "md" }}>{veicle.name}</Text>
          <Text fontSize={{ base: "sm", md: "md" }}>{veicle.date}</Text>
          <Text fontSize={{ base: "sm", md: "md" }}>{veicle.status}</Text>
        </Flex>
      </Box>
    </Box>
  );
};

export default VeicleIdCard;
