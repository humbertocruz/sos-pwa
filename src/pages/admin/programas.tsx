import type { NextPage } from 'next'
import { useState } from 'react'
import { Text, Box, HStack, IconButton, Grid, GridItem, 
  VStack, Input, useDisclosure } from '@chakra-ui/react'
import LayoutComponent from '../../components/layout/main'

import usePrograms from '../../hooks/usePrograms'
import ModalComponent from '../../components/layout/modal'
import DeleteComponent from '../../components/layout/delete'
import EditComponent from '../../components/layout/edit'

//@ts-ignore
const ProgramasPage: NextPage = () => {

  const { GetPrograms, CreateProgram } = usePrograms()
  const { data,error, isValidating, mutate } = GetPrograms()
  const { isOpen:isOpenDelete, onOpen:onOpenDelete, onClose:onCloseDelete } = useDisclosure()
  const { isOpen:isOpenAdd, onOpen:onOpenAdd, onClose:onCloseAdd } = useDisclosure()
  const { isOpen:isOpenEdit, onOpen:onOpenEdit, onClose:onCloseEdit } = useDisclosure()
  
  // data
  const [id, setId] = useState('')
  const [name, setName] = useState('')

  const startOnOpenAdd = () => {
    setId('')
    setName('')
    onOpenAdd()
  }

  const startOnOpenEdit = (program:any) => {
    setId(program.id)
    setName(program.name)
    onOpenEdit()
  }
  
  const onAdd = async () => {
    await CreateProgram(name)
    mutate()
    onCloseAdd()
  }

  const onEdit = () => {
    console.log('onEdit')
    onCloseEdit()
  }

  const onDelete = () => {
    console.log('onDelete')
    onCloseDelete()
  }

  const onCancel = () => {
    onCloseAdd()
    onCloseDelete()
    onCloseEdit()
  }

  const renderPrograms = () => {
    if(data&&data.programs){
      return data.programs.map((program:any) => (
        <Box key={program.id} bg={'white'} p={2} rounded={'md'} w={'full'}>
            <Text fontWeight={'bold'} textAlign={'center'}>{program.name}</Text>
            <HStack>
              <EditComponent title={'Editar Programa'} isOpen={isOpenEdit} onOpen={()=>startOnOpenEdit(program)} onClose={onCloseEdit} onEdit={onEdit} onCancel={onCancel}>
                <Input value={name} onChange={(e)=>setName(e.currentTarget.value)} variant={'flushed'} placeholder={'Nome do Programa'} />
              </EditComponent>
              <DeleteComponent title={'Você tem certeza ?'} isOpen={isOpenDelete} onOpen={onOpenDelete} onClose={onCloseDelete} onDelete={onDelete} onCancel={onCancel} />
            </HStack>
          </Box>
      ))
    } else {
      return (
        <Box bg={'white'} p={2} rounded={'md'} w={'full'}>
          <Text>Carregando...</Text>
        </Box>
      )
    }
  }
  
  return (
    <LayoutComponent>
      <VStack minW={'xs'} w={'full'} px={2}>
        
        <HStack w={'full'} bg={'gray.500'} rounded={'md'} p={2}>
          <ModalComponent title={'Novo Programa'} isOpen={isOpenAdd} onOpen={()=>startOnOpenAdd()} onClose={onCloseAdd} onAdd={onAdd} onCancel={onCancel} >
            <Input value={name} onChange={(e)=>setName(e.currentTarget.value)} variant={'flushed'} placeholder={'Nome do Programa'} />
          </ModalComponent>
        </HStack>
        
        {renderPrograms()}
        
      </VStack>
    </LayoutComponent>
  )
  
}

export default ProgramasPage
