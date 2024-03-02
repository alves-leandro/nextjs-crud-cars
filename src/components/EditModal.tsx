import React from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
} from "@chakra-ui/react";
import { IVeicles } from "@/types/veicles.types";
import EditForm from "./EditForm";

interface EditModalProps {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
  veicle: IVeicles;
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
      </ModalContent>
    </Modal>
  );
};

export default EditModal;
