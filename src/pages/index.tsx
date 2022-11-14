import { Box, Button, Center, Text, VStack, Image, Icon } from "@chakra-ui/react"
import { useRouter } from "next/router"
import { MdPolicy } from "react-icons/md"
import LayoutComponent from "../components/layout/main"


const IndexPage = () => {

  const router = useRouter()


  return (
    <LayoutComponent header={false} footer={false}>
      <VStack minW={'xs'} w={'full'} px={2}>
        <Center w={'full'} minH={'100vh'}>
          <Box bg={'whiteAlpha.500'} p={2} w={'full'} rounded={'lg'} shadow={'lg'}>
            <VStack gap={2}>
              <Icon my={8} fontSize={96} color={'blackAlpha.700'} aria-label="Emergência" as={MdPolicy} />
              <Text fontWeight={'bold'} color={'gray.500'} fontSize={'md'}>SOS Cidadão</Text>
              <Button onClick={()=>router.push('/login')} w={'full'} colorScheme={'blackAlpha'}>Entre</Button>
            </VStack>
          </Box>
        </Center>
      </VStack>
    </LayoutComponent>    
  )

}

export default IndexPage
