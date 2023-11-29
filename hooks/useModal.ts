import { useState } from "react";

interface UseModalHook {
  isOpenModal: boolean;
  openModal: () => void;
  closeModal: () => void;
}

function useModal(): UseModalHook {
  const [isOpenModal, setIsOpenModal] = useState(false);

  const openModal = () => {
    setIsOpenModal(true);
  };

  const closeModal = () => {
    setIsOpenModal(false);
  };

  return { isOpenModal, openModal, closeModal };
}

export default useModal;
