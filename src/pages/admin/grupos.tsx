import { Button, Container, Text, Box, Center, Flex, HStack, IconButton, Grid, GridItem, VStack, Icon } from '@chakra-ui/react'
import type { NextPage } from 'next'
import { MdDelete, MdEdit, MdPersonAdd, MdPolicy } from 'react-icons/md'
import LayoutComponent from '../../components/layout/main'
import useUser from '../../hooks/useUser'
import MonitorComponent from '../../components/monitor'
import LayoutAdminComponent from '../../components/layout/admin'
import useGroups from '../../hooks/useGroups'

//@ts-ignore
const Home: NextPage = () => {

  const { data,error, isValidating, mutate } = useGroups()
  
  return (
    <LayoutComponent>
        <VStack minW={'xs'} w={'full'} px={2}>
          <HStack w={'full'} bg={'gray.500'} rounded={'md'} p={2}>
            <Button leftIcon={<MdPersonAdd />} size={'sm'} colorScheme={'blackAlpha'}>Novo Grupo</Button>
          </HStack>
          
          {data&&data.groups.map((group:any) => (
            <Box key={group.id} bg={'white'} p={2} rounded={'md'} w={'full'}>
              <HStack>
                <IconButton size={'sm'} colorScheme={'blue'} aria-label="Editar" icon={<Icon as={MdEdit} />} />
                <IconButton size={'sm'} colorScheme={'red'} aria-label="Remover" icon={<Icon as={MdDelete} />} />
              </HStack>
              <Text fontWeight={'bold'} textAlign={'center'}>{group.name}</Text>
            </Box>
          ))}
          
        </VStack>
    </LayoutComponent>
  )
  
}

export default Home
