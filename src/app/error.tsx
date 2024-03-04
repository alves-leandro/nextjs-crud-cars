"use client";

import { Box, Button, Flex } from "@chakra-ui/react";
import { useEffect } from "react";

interface ErrorProps {
  error: Error;
  reset: () => void;
}

export default function Error({ error, reset }: ErrorProps) {
  useEffect(() => {
    console.log(error);
  }, [error]);

  return (
    <main className="body min-h-screen p-4 flex justify-center items-center">
      <Box>
        <Flex direction="column" alignItems="center">
          <Box textAlign="center">
            <h1>Sua página deu erro</h1>
            <Button mt={12} type="button" onClick={reset}>
              Tentar novamente
            </Button>
          </Box>
        </Flex>
      </Box>
    </main>
  );
}
