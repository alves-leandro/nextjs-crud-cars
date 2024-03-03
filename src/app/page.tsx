import { Box, Flex } from "@chakra-ui/react";
import Header from "@/components/header";
import { VeicleList } from "@/components/veicleList";
import Form from "@/components/createForm";
import { getAllVeicles } from "@/services/api";
import { VeicleData } from "@/schemas/veicle.schema";

const fetchVeicles = async () => {
  const response = await getAllVeicles();
  return response;
};

export default async function Home() {
  const veicles: VeicleData[] = await fetchVeicles();

  return (
    <main className="body min-h-screen p-4">
      <Box>
        <Header />
        <Flex direction="column" alignItems="center">
          <Box
            width={{ base: "100%", md: "90%", lg: "80%", xl: "70%" }}
            borderWidth={1}
            borderRadius={8}
            boxShadow="lg"
            p={{ base: 4, md: 8 }} 
            mt={{ base: 4, md: 6, lg: 8 }} 
          >
            <Form />
            <VeicleList veicles={veicles} />
          </Box>
        </Flex>
      </Box>
    </main>
  );
}
