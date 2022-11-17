import type { NextPage } from 'next'
import { useState } from 'react'
import { Text, Box, HStack, IconButton, Grid, GridItem, 
  VStack, Input, useDisclosure, Card, CardBody, CardFooter } from '@chakra-ui/react'
import LayoutComponent from '../../components/layout/main'

import usePrograms from '../../hooks/usePrograms'
import ModalComponent from '../../components/layout/modal'
import DeleteComponent from '../../components/layout/delete'
import EditComponent from '../../components/layout/edit'

//@ts-ignore
const ProgramasPage: NextPage = () => {

  const { GetPrograms, CreateProgram, UpdateProgram, DeleteProgram } = usePrograms()
  const { data,error, isValidating, mutate } = GetPrograms()
  // controle das modais
  const { isOpen:isOpenDelete, onOpen:onOpenDelete, onClose:onCloseDelete } = useDisclosure()
  const { isOpen:isOpenAdd, onOpen:onOpenAdd, onClose:onCloseAdd } = useDisclosure()
  const { isOpen:isOpenEdit, onOpen:onOpenEdit, onClose:onCloseEdit } = useDisclosure()
  
  // data
  const [id, setId] = useState('')
  const [name, setName] = useState('')

  // Inicia o modal de adicionar
  const startOnOpenAdd = () => {
    setId('')
    setName('')
    onOpenAdd()
  }

  // Inicia o modal de editar
  const startOnOpenEdit = (program:any) => {
    setId(program.id)
    setName(program.name)
    onOpenEdit()
  }
  
  // Adiciona um novo programa
  const onAdd = async () => {
    await CreateProgram(name)
    mutate()
    onCloseAdd()
  }

  // Edita um programa
  const onEdit = async () => {
    await UpdateProgram(id, name)
    onCloseEdit()
  }

  // Deleta um programa
  const onDelete = async (programId:string) => {
    console.log(programId)
    await DeleteProgram(programId)
    mutate()
    onCloseDelete()
  }

  // Cancela a ação
  const onCancel = () => {
    onCloseAdd()
    onCloseDelete()
    onCloseEdit()
  }

  // Renderiza os programas
  const renderPrograms = () => {
    if(data&&data.programs){
      return data.programs.map((program:any) => (
        <Card w={'full'} key={program.id} bg={'white'}>
          <CardBody>
            <Text fontWeight={'bold'} textAlign={'center'}>{program.name}</Text>
            <Text fontWeight={'bold'} textAlign={'center'}>{program.id}</Text>
          </CardBody>
          <CardFooter gap={2}>
            <EditComponent title={'Editar Programa'} isOpen={isOpenEdit} onOpen={()=>startOnOpenEdit(program)} onClose={onCloseEdit} onEdit={onEdit} onCancel={onCancel}>
              <Input value={name} onChange={(e)=>setName(e.currentTarget.value)} variant={'flushed'} placeholder={'Nome do Programa'} />
            </EditComponent>
          </CardFooter>
        </Card>
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
