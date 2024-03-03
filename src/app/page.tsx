import { Box, Flex } from "@chakra-ui/react";
import Header from "@/components/header";
import { VeicleList } from "@/components/veicleList";

import Form from "@/components/createForm";
import { getAllVeicles } from "@/services/api";
import { VeicleData } from "@/schemas/veicle.schema";

const fetchVeicles = async () => {
  const response = await getAllVeicles();
  return response
}

export default async function Home() {
  const veicles: VeicleData[] = await fetchVeicles()

  return (
    <main className="body min-h-screen p-4">
      <Box>
        <Header />
        <Flex align="center" justifyContent="center">
          <Box
            width={900}
            borderWidth={1}
            borderRadius={8}
            boxShadow="lg"
            p={20}
            mt="25"
          >
            <Form />
            <VeicleList veicles={veicles} />
          </Box>
        </Flex>
      </Box>
    </main>
  );
}
