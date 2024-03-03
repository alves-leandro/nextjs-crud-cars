import { VeicleData } from "@/schemas/veicle.schema";

interface IdVeicleCardProps {
  veicle: VeicleData;
}

const VeicleIdCard = ({ veicle }: IdVeicleCardProps) => {
  return (
    <div>
      <h1>{veicle.name}</h1>

      <p>{veicle.date}</p>
      <p>{veicle.status}</p>
      <p>{veicle.avaliation}</p>
    </div>
  );
};

export default VeicleIdCard;