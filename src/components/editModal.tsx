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
  onUpdate: () => void;
}

const EditModal: React.FC<EditModalProps> = ({
  isOpen,
  onClose,
  veicle,
  onUpdate,
}) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>  
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Editar Veículo</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <EditForm veicle={veicle} onUpdate={onUpdate} onClose={onClose} />
        </ModalBody>
        <ModalFooter>
          <Button onClick={onClose}></Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default EditModal;