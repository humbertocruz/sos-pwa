import { Text, Box, Center, SimpleGrid, Badge, VStack } from '@chakra-ui/react'
import LayoutComponent from '../components/layout/main'
import dayjs from 'dayjs'

const UserOcorrencyComponent = (props:any) => {
  const { ocorrency } = props
  return (
    <LayoutComponent>
      <VStack minH={'100vh'} bg={'gray.300'}>
        
      <Box shadow={'md'} rounded={'md'} w={'full'} m={2} p={4} bg={'white'}>
        <Center><Text fontWeight={'bold'} mb={4} color={'gray.500'}>Emergência</Text></Center>
        <SimpleGrid columns={2} gap={2}>
          <Center shadow={'md'} flexDirection={'column'} gap={2} rounded={'md'} p={2} bg={'gray.100'}>
            <Text fontWeight={'bold'} color={'gray.500'} textAlign={'center'}>Situação</Text>
            <Badge p={2} colorScheme={'yellow'}>{ocorrency.ocorrencies.status}</Badge>
          </Center>
          <Center shadow={'md'} flexDirection={'column'} gap={2} rounded={'md'} p={2} bg={'gray.100'}>
            <Text fontWeight={'bold'} color={'gray.500'} textAlign={'center'}>Horário</Text>
            <Badge p={2} colorScheme={'green'}>{dayjs(ocorrency.ocorrencies.date).format('HH:mm')}</Badge>
          </Center>
        </SimpleGrid>
      </Box>
        
      </VStack>
    </LayoutComponent>
  )
}
export default UserOcorrencyComponent
