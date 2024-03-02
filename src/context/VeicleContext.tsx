// import React, { createContext, useContext, useState, ReactNode } from 'react';
// import { getAllVeicles } from '@/services/api';
// import { IVeicles } from '@/types/veicles.types';

// interface VeicleContextType {
//   veicles: IVeicles[];
//   updateVeicles: () => Promise<void>;
// }

// const VeicleContext = createContext<VeicleContextType>({
//   veicles: [],
//   updateVeicles: async () => {},
// });

// export const useVeicleContext = () => useContext(VeicleContext);

// export const VeicleProvider = ({ children }: { children: ReactNode }) => {
//   const [veicles, setVeicles] = useState<IVeicles[]>([]);

//   const updateVeicles = async () => {
//     try {
//       const fetchedVeicles = await getAllVeicles();
//       setVeicles(fetchedVeicles);
//     } catch (error) {
//       console.error("Erro ao atualizar lista de veículos:", error);
//     }
//   };

//   return (
//     <VeicleContext.Provider value={{ veicles, updateVeicles }}>
//       {children}
//     </VeicleContext.Provider>
//   );
// };
