import { Button, Container, Text, Box, Center, Flex, HStack, IconButton, Grid, GridItem } from '@chakra-ui/react'
import type { NextPage } from 'next'
import { MdPolicy } from 'react-icons/md'
import LayoutComponent from '../components/layout/main'
import useUser from '../hooks/useUser'
import MonitorComponent from '../components/monitor'
import LayoutAdminComponent from '../components/layout/admin'
import LayoutSuperAdminComponent from '../components/layout/super_admin'
import { useRecoilValue } from 'recoil'
import { tokenAtom } from '../state/atoms'

//@ts-ignore
const Home: NextPage = () => {

  const { data } = useUser()
  const token = useRecoilValue(tokenAtom)

  if (!data) return (
    null
  )

  if (data.user.role == 'SUPER_ADMIN') {
    return (
      <LayoutComponent>
        <Center flexDirection={'column'} px={2} pt={'10vh'} h={'100vh'} bg={'gray.300'} gap={2}>
          <Text>Admin</Text>
        </Center>
      </LayoutComponent>
    )
  }

  if (data.user.role == 'ADMIN') {
    return (
      <LayoutComponent>
          <Text>Admin</Text>
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
