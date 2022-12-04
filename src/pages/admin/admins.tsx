//@ts-nocheck
import { Button, Container, Text, Box, Center, Flex, HStack, IconButton, Grid, GridItem, Divider, VStack, Menu, MenuButton, MenuList, MenuItem } from '@chakra-ui/react'
import type { NextPage } from 'next'
import { MdArrowDropDown, MdPolicy } from 'react-icons/md'
import LayoutComponent from '../../components/layout/main'
import useUsers from '../../hooks/useUsers'
import MonitorComponent from '../../components/monitor'
import LayoutAdminComponent from '../../components/layout/admin'
import useAdmins from '../../hooks/useAdmins'
import LayoutSuperAdminComponent from '../../components/layout/super_admin'
import { useState } from 'react'
import useClients from '../../hooks/useClients'

//@ts-ignore
const AdminsPage: NextPage = () => {

  const [clientX, setClientX] = useState(undefined)
  const { data:clients,error:clientsError, isValidating:clientsIsValidating, mutate:clientsMutate } = useClients()
  //@ts-ignore
  const { data,error, isValidating, mutate } = useAdmins(client?.id)
  
  return (
    <LayoutSuperAdminComponent leftMenu={true}>
      <VStack px={2} minH={'85vh'} bg={'gray.300'} gap={2} p={2}>
        <HStack>
          <Menu>
            <MenuButton rightIcon={<MdArrowDropDown size={20} />} size={'sm'} colorScheme={'blue'} as={Button}>{clientX?clientX?.name:'Cliente'}</MenuButton>
            <MenuList>
              {clients&&clients.clients.map((client:any)=>{
                return(
                  <MenuItem onClick={()=>setClientX(client)} key={client.id}>{client.name}</MenuItem>
                )
              })}
            </MenuList>
          </Menu>
          <Button size={'sm'} colorScheme={'blue'}>Novo</Button>
        </HStack>
        {data&&data.users.map((user:any) => (
          <Box w={'full'} p={2} rounded={'md'} bg={"gray.200"} key={user.id}>
            <Text>{user.name}</Text>
            <Text>{user.email}</Text>
            <Divider />
            <HStack>
              <Button size={'sm'} colorScheme={'blue'}>Editar</Button>
              <Button size={'sm'} colorScheme={'red'}>Remover</Button>
            </HStack>
          </Box>
        ))}
      </VStack>
    </LayoutSuperAdminComponent>
  )
  
}

export default AdminsPage
