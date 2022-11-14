import { Center, Text } from '@chakra-ui/react'

const FooterComponent = () => {
  return (
    <Center zIndex={1} w={'full'} position={'fixed'} bottom={0} h={'5vh'} bg={'gray.500'} shadow={'md'} p={2}>
      <Text fontWeight={'bold'} color={'gray.300'} fontSize={'md'}>SOS Cidadão</Text>
    </Center>
  )
}
export default FooterComponent