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
    <main className="body min-h-screen p-4">
      <Box>
        <Box
          width={900}
          borderWidth={1}
          borderRadius={8}
          boxShadow="lg"
          p={20}
          mt="25"
        >
        <Button className="flex justify-end p-6">
          <Link href={"/"}>Voltar</Link>
        </Button>
          <div className="flex items-center justify-center">
            <VeicleIdCard veicle={veicle}></VeicleIdCard>
          </div>
        </Box>
      </Box>
    </main>
  );
};

export default Veicle;
