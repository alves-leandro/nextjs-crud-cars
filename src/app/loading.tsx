import { Box, Flex, Text } from "@chakra-ui/react";

export default function Loading() {
  return (
    <main className="body min-h-screen p-4 flex justify-center items-center">
      <Box>
        <Flex direction="column" alignItems="center">
          <Box textAlign="center">
            <Text>Loading</Text>
          </Box>
        </Flex>
      </Box>
    </main>
  );
}
