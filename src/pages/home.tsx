import { Button, Container, Text, Box, Center, Flex, HStack, IconButton } from '@chakra-ui/react'
import type { NextPage } from 'next'
import { MdPolicy } from 'react-icons/md'
import LayoutComponent from '../components/layout/main'
import useUser from '../hooks/useUser'
import MonitorComponent from '../components/monitor'

//@ts-ignore
const Home: NextPage = () => {

  const { data } = useUser()

  

  if (!data) return (
    null
  )

  if (data.user.role == 'ADMIN') {
    return (
      <LayoutComponent>
        <Center minH={'100vh'} bg={'gray.300'}>
          <Text>Admin</Text>
        </Center>
      </LayoutComponent>
    )
  }
  if (data.user.role == 'MONITOR') {
    return (
      <MonitorComponent />
    )
  }
  if (data.user.role == 'USER') {
    return (
      <LayoutComponent>
        <Center minH={'100vh'} bg={'gray.300'}>
          <IconButton aria-label='Emergência' icon={<MdPolicy size={256} />} shadow={'md'} rounded={'lg'} m={2} h={'sm'} w={'full'} colorScheme="blue" />      
        </Center>
      </LayoutComponent>
    )
  }
  
}

export default Home
