// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import Auth from '../_token'

type Data = {
  success:boolean,
  error:string,
  ocorrencies: any
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { headers, method } = req
  const { authorization } = headers
  const token = authorization?.split(' ')[1]
  const { getUser } = Auth()
  if (!token) {
    res.status(430).send({
      success:false,
      error:'Token invalid!',
      ocorrencies:[]
    })
  }
  let user = await getUser(token||'')
  if (!user) {
    res.status(430).send({
      success:false,
      error:'Token invalid!',
      ocorrencies:[]
    })
  }
  //@ts-ignore
  if (user) delete user.password

  switch (method) {
    case 'GET':
      const ocorrencies = await prisma?.ocorrency.findFirst({
        where: {
          clientId: user?.clientId,
          userId: user?.id,
          status: {
            not: 'FECHADO'
          }
        },
        select:{
          id:true,
          latitude:true,
          longitude:true,
          date:true,
          status:true,
          user:{
            select:{
              id:true,
              name:true
            }
          }
        }
      })
      
      res.status(200).json({ ocorrencies,success:true,error:'' })
      break

    default:
      res.status(430).send({
        success:false,
        error:'Method invalid!',
        ocorrencies:[]
      })
      break
  }
}
