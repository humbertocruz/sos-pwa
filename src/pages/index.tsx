import { Box, Button, Center, Text, VStack, Image } from "@chakra-ui/react"
import { useRouter } from "next/router"
import LayoutComponent from "../components/layout/main"


const IndexPage = () => {

  const router = useRouter()


  return (
    <LayoutComponent noHeader={true} noFooter={true}>
      <Center w={'full'}>
        <Box bg={'whiteAlpha.700'} m={2} p={4} w={'md'} rounded={'lg'} shadow={'lg'}>
          <VStack gap={2}>
            <Image my={2} rounded={'md'} bgGradient={'linear(to-br, black, black, blue.700)'} src={'/assets/vibe-logo.png'} alt={'logo'} w={'150px'} h={'150px'} />
            <Text fontWeight={'bold'} fontSize={32} color={'gray.600'}>Vibe</Text>
            <Button onClick={()=>router.push('/login')} w={'full'} colorScheme={'blue'}>Entre</Button>
          </VStack>
        </Box>
      </Center>
    </LayoutComponent>    
  )

}

export default IndexPage
