import { Button, Container, Text, Box, Center, Flex, HStack, IconButton } from '@chakra-ui/react'
import type { NextPage } from 'next'
import { MdPolicy } from 'react-icons/md'
import FooterComponent from '../components/layout/footer'
import LayoutComponent from '../components/layout/main'
import MenuComponent from '../components/layout/menu'

const Home: NextPage = () => {
  return (
    <LayoutComponent>
      <Center minH={'100vh'} bg={'gray.300'}>
        <IconButton aria-label='Emergência' icon={<MdPolicy size={256} />} shadow={'md'} rounded={'lg'} m={2} h={'sm'} w={'full'} colorScheme="blue" />      
      </Center>
    </LayoutComponent>
  )
}

export default Home
