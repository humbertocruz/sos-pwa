import { Button, Container, Text, Box, Center, Flex, HStack, IconButton, SimpleGrid, Badge } from '@chakra-ui/react'
import type { NextPage } from 'next'
import { MdPolicy } from 'react-icons/md'
import FooterComponent from '../components/layout/footer'
import LayoutComponent from '../components/layout/main'
import MenuComponent from '../components/layout/menu'
import useEmergency from '../hooks/useEmergency'

const Emergency: NextPage = () => {

  return (
    <LayoutComponent>
      <Center minH={'100vh'} bg={'gray.300'}>
        
      <Box shadow={'md'} rounded={'md'} w={'full'} m={2} p={4} bg={'white'}>
        <Center><Text fontWeight={'bold'} mb={4} color={'gray.500'}>Emergência</Text></Center>
        <SimpleGrid columns={2} gap={2}>
          <Center shadow={'md'} flexDirection={'column'} gap={2} rounded={'md'} p={2} bg={'gray.100'}>
            <Text fontWeight={'bold'} color={'gray.500'} textAlign={'center'}>Situação</Text>
            <Badge p={2} colorScheme={'yellow'}>Em Atendimento</Badge>
          </Center>
          <Center shadow={'md'} flexDirection={'column'} gap={2} rounded={'md'} p={2} bg={'gray.100'}>
            <Text fontWeight={'bold'} color={'gray.500'} textAlign={'center'}>Horário</Text>
            <Badge p={2} colorScheme={'green'}>19:45</Badge>
          </Center>
        </SimpleGrid>
      </Box>
        
      </Center>
    </LayoutComponent>
  )
}

export default Emergency
