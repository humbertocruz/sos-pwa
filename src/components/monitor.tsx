import LayoutComponent from "./layout/main"
import { Center, Table, Text } from '@chakra-ui/react'

import useOcorrency from "../hooks/useOcorrency"

const MonitorComponent = () => {

  const { data } = useOcorrency()

  if (!data) return null

  console.log(data)

  return (
    <LayoutComponent>
      <Center minH={'100vh'} bg={'gray.300'}>
        <Table>
          <thead>
            <tr>
              <th>Nome</th>
              <th>Descrição</th>
              <th>Latitude</th>
              <th>Longitude</th>
              <th>Estado</th>
            </tr>
          </thead>
          <tbody>
            {data?.ocorrencies.map((item) => (
              <tr key={item.id}>
                <td>{item.name}</td>
                <td>{item.description}</td>
                <td>{item.latitude}</td>
                <td>{item.longitude}</td>
                <td>{item.state}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Center>
    </LayoutComponent>
  )
}
export default MonitorComponent
