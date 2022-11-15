import { Modal, ModalCloseButton, ModalBody, ModalContent, ModalOverlay, 
  ModalFooter, ModalHeader, Input, useDisclosure, Text, Button, Icon, IconButton } from '@chakra-ui/react'
import { MdAdd } from 'react-icons/md'

const ModalComponent = (props:any) => {
  const {title, children, onAdd, isOpen, onOpen, onClose} = props
  
  return(
    <>
    <IconButton onClick={onOpen} aria-label="Adicionar" icon={<Icon as={MdAdd}/>} size={'sm'} colorScheme={'blackAlpha'} />
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
              <Button size={'sm'} colorScheme={'blue'} mr={3} onClick={onAdd}>Salvar</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </>
  )
}

export default ModalComponent
