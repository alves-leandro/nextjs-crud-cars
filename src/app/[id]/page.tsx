import VeicleIdCard from "@/components/veicleIdCard";
import { getAllVeicles, getVeicleById } from "@/services/api";
import { Link } from "@chakra-ui/react";


interface PageProps {
  params: { id: string };
}

export const revalidate = 90

export const generateStaticParams = async () => {
    const response = await getAllVeicles();
    return response.map((veicle) => ({ id: veicle.id }));
}


const Veicle = async ({ params }: PageProps) => {
    const response = await getVeicleById(params.id); 
    const veicle = response; 

    return (
        <main className="body min-h-screen">
            <div className="flex justify-end p-6">
                <Link href={"/"}>Voltar</Link>
                <div className="flex items-center justify-center">
                    <VeicleIdCard veicle={veicle}></VeicleIdCard>
                </div>
            </div>
        </main>
    )
};

export default Veicle;
