import React from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";
import { IVeicles } from "@/types/veicles.types";
import EditForm from "./EditForm";

interface EditModalProps {
  isOpen: boolean;
  onClose: () => void;
  veicle: IVeicles;
  onUpdate: () => void;
  finalRef: React.RefObject<HTMLElement>; //AQUI TRAGO PARA O MODAL
}

const EditModal: React.FC<EditModalProps> = ({
  isOpen,
  onClose,
  veicle,
  onUpdate,
  finalRef, 
}) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} finalFocusRef={finalRef}>  
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Editar Veículo</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <EditForm veicle={veicle} onUpdate={onUpdate} onClose={onClose} />
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default EditModal;