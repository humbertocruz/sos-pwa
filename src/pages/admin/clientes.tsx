import { Button, Container, Text, Box, Center, Flex, HStack, IconButton, Grid, GridItem, VStack, Menu, MenuButton, MenuList, MenuItem, Table, Thead, Tr, Th, Tbody, Td, Icon } from '@chakra-ui/react'
import type { NextPage } from 'next'
import { MdArrowDropDown, MdDelete, MdEdit, MdPersonAdd, MdPolicy } from 'react-icons/md'
import LayoutComponent from '../../components/layout/main'
import useUser from '../../hooks/useUser'
import MonitorComponent from '../../components/monitor'
import LayoutAdminComponent from '../../components/layout/admin'
import useClients from '../../hooks/useClients'
import LayoutSuperAdminComponent from '../../components/layout/super_admin'

//@ts-ignore
const Home: NextPage = () => {
 
  const { data,error, isValidating, mutate } = useClients()
  if (!data) return (
    null
  )

  return (
    <LayoutComponent>
        <VStack minW={'xs'} w={'full'} px={2}>
          <HStack w={'full'} bg={'gray.500'} rounded={'md'} p={2}>
            <Button leftIcon={<MdPersonAdd />} size={'sm'} colorScheme={'blackAlpha'}>Novo Cliente</Button>
          </HStack>
          {data.clients.map((client:any) => (
            <Box key={client.id} bg={'white'} p={2} rounded={'md'} w={'full'}>
                <HStack>
                  <IconButton size={'sm'} colorScheme={'blue'} aria-label="Editar" icon={<Icon as={MdEdit} />} />
                  <IconButton size={'sm'} colorScheme={'red'} aria-label="Remover" icon={<Icon as={MdDelete} />} />
                </HStack>
              
              <Text fontWeight={'bold'} textAlign={'center'}>{client.name}</Text>
              <Text textAlign={'center'}>Grupos: {client._count.Group}</Text>
              <Text textAlign={'center'}>Programas: {client._count.Program}</Text>
              <Text textAlign={'center'}>Usuários: {client._count.User}</Text>
            </Box>
          ))}
        </VStack>
      
    </LayoutComponent>
  )
  
  
}

export default Home
