import { Box, Flex } from "@chakra-ui/react";
import Header from "@/components/Header";
import { VeicleList } from "@/components/VeicleList";

import Form from "@/components/Form";

export default function Home() {
  return (
    <main className="body min-h-screen p-4">
      <Box>
        <Header />
        <Flex align="center" justifyContent="center">
          <Box
            width={800}
            borderWidth={1}
            borderRadius={8}
            boxShadow="lg"
            p={20}
            mt="25"
          >
            <Form />
            <VeicleList />
          </Box>
        </Flex>
      </Box>
    </main>
  );
}
