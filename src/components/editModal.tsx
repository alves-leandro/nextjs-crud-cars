import React from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  ModalFooter,
  Button,
} from "@chakra-ui/react";
import EditForm from "./editForm";
import { VeicleData } from "@/schemas/veicle.schema";

interface EditModalProps {
  isOpen: boolean;
  onClose: () => void;
  veicle: VeicleData;
}

const EditModal: React.FC<EditModalProps> = ({
  isOpen,
  onClose,
  veicle
}) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>  
      <ModalOverlay />
      <ModalContent>
        <ModalHeader mt={6}>Editar Veículo</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <EditForm veicle={veicle} onClose={onClose} />
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default EditModal;