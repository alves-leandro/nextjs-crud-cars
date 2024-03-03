import VeicleIdCard from "@/components/veicleIdCard";
import { getAllVeicles, getVeicleById } from "@/services/api";
import { Box, Button, Link } from "@chakra-ui/react";

interface PageProps {
  params: { id: string };
}

export const revalidate = 90;

export const generateStaticParams = async () => {
  const response = await getAllVeicles();
  return response.map((veicle) => ({ id: veicle.id }));
};

const Veicle = async ({ params }: PageProps) => {
  const response = await getVeicleById(params.id);
  const veicle = response;

  return (
    <main className="body min-h-screen p-4 flex items-center justify-center">
      <Box maxW="900px">
        <Box
          width="100%"
          borderWidth={1}
          borderRadius={8}
          boxShadow="lg"
          p={20}
          mt={{ base: "10", md: "25" }}
          display="flex"
          flexDirection="column"
          justifyContent="space-between"
          alignItems="center"
          flexWrap="wrap"
        >
          <Link href={"/"} alignSelf="flex-start" mb={{ base: "4", md: "0" }}>Voltar</Link>
          <Box className="flex items-center justify-center mt-4">
            <VeicleIdCard veicle={veicle}></VeicleIdCard>
          </Box>
        </Box>
      </Box>
    </main>
  );
};

export default Veicle;
