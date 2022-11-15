import { Modal, ModalCloseButton, ModalBody, ModalContent, ModalOverlay, 
  ModalFooter, ModalHeader, Input, useDisclosure, Text, Button, Icon, IconButton } from '@chakra-ui/react'
import { MdAdd, MdEdit } from 'react-icons/md'

const EditComponent = (props:any='') => {
  const {title, children, onEdit, isOpen, onOpen, onClose} = props
  
  return(
    <>
    <IconButton onClick={onOpen} aria-label="Adicionar" icon={<Icon as={MdEdit}/>} size={'sm'} colorScheme={'blue'} />
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
          <ModalOverlay />
          <ModalContent mx={2}>
          <ModalCloseButton onClick={onClose} />
            <ModalHeader>
              <Text fontWeight={'bold'}>{title}</Text>
            </ModalHeader>
            <ModalBody>
              {children}
            </ModalBody>
            <ModalFooter>
              <Button size={'sm'} colorScheme={'blue'} mr={3} onClick={onEdit}>Salvar</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </>
  )
}

export default EditComponent
