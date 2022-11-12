import { Box, Button, Center, Text, VStack, Image, Icon } from "@chakra-ui/react"
import { useRouter } from "next/router"
import { MdPolicy } from "react-icons/md"
import LayoutComponent from "../components/layout/main"


const IndexPage = () => {

  const router = useRouter()


  return (
    <LayoutComponent noHeader={true} noFooter={true}>
      <Center flexDirection={'column'} px={2} pt={'10vh'} pb={'5vh'} h={'100vh'} bg={'gray.300'} gap={2}>
        <Box bg={'whiteAlpha.700'} m={2} p={4} w={'md'} rounded={'lg'} shadow={'lg'}>
          <VStack gap={2}>
          <Center flexDirection={'column'} m={2} p={8} rounded={'md'}>
            <Icon my={8} fontSize={96} color={'gray.500'} aria-label="Emergência" as={MdPolicy} />
            <Text fontWeight={'bold'} color={'gray.500'} fontSize={'md'}>SOS Cidadão</Text>
          </Center>
          <Button onClick={()=>router.push('/login')} w={'full'} colorScheme={'blue'}>Entre</Button>
          </VStack>
        </Box>
      </Center>
    </LayoutComponent>    
  )

}

export default IndexPage
