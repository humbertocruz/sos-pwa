import { Modal, ModalCloseButton, ModalBody, ModalContent, ModalOverlay, 
  ModalFooter, ModalHeader, Input, useDisclosure, Text, Button, Icon, IconButton } from '@chakra-ui/react'
import { MdDelete } from 'react-icons/md'

const DeleteComponent = (props:any='') => {
  const {title='Você tem certeza?', onDelete, isOpen, onClose, onOpen, onCancel, id} = props
  
  return(
    <>
      <IconButton onClick={onOpen} aria-label="Deletar" icon={<Icon as={MdDelete}/>} size={'sm'} colorScheme={'red'} />
      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent mx={2}>
        <ModalCloseButton onClick={onClose} />
          <ModalHeader>
            <Text fontWeight={'bold'}>{title}</Text>
          </ModalHeader>
          <ModalFooter>
            <Button size={'sm'} colorScheme={'red'} mr={3} onClick={()=>onDelete(id)}>Sim</Button>
            <Button size={'sm'} colorScheme={'blue'} mr={3} onClick={onCancel}>Não</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}

export default DeleteComponent
