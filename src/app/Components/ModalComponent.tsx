import React from 'react'
import { useState, useEffect } from "react";
import { Modal,Button } from "flowbite-react";
const ModalComponent = () => {
    const [openModal, setOpenModal] = useState(false);
  return (

    <Modal dismissible show={openModal} onClose={() => setOpenModal(false)}>
    <Modal.Header>Terms of Service</Modal.Header>
    <Modal.Body>
    
    </Modal.Body>
    <Modal.Footer>
      <Button onClick={() => setOpenModal(false)}>I accept</Button>
      <Button color="gray" onClick={() => setOpenModal(false)}>
        Decline
      </Button>
    </Modal.Footer>
  </Modal>
  )
}

export default ModalComponent
