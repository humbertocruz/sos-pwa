import { Button, Container, Text, Box, Center, Flex, HStack, IconButton, Grid, GridItem } from '@chakra-ui/react'
import type { NextPage } from 'next'
import { MdPolicy } from 'react-icons/md'
import LayoutComponent from '../../components/layout/main'
import useUsers from '../../hooks/useUsers'
import MonitorComponent from '../../components/monitor'
import LayoutAdminComponent from '../../components/layout/admin'

//@ts-ignore
const Home: NextPage = () => {

  const { data,error, isValidating, mutate } = useUsers()

  if (!data) return (
    null
  )

  return (
    <LayoutAdminComponent leftMenu={true}>
      <HStack flexDirection={'column'} px={2} minH={'85vh'} bg={'gray.300'} gap={2}>
        <Text>Usuários</Text>
        {data.users.map((user:any) => (
          <Box w={'full'} p={2} rounded={'md'} bg={"gray.200"} key={user.id}>
            <Text>{user.name}</Text>
            <Text>{user.email}</Text>
            <Text>{user.role}</Text>
          </Box>
        ))}
      </HStack>
    </LayoutAdminComponent>
  )
  
}

export default Home
