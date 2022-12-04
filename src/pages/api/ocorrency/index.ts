// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import Auth from '../_token'

type Data = {
  success:boolean,
  error:string,
  data: any
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
      data:[]
    })
  }
  let user = await getUser(token||'')
  if (!user) {
    res.status(430).send({
      success:false,
      error:'Token invalid!',
      data:[]
    })
  }
  //@ts-ignore
  if (user) delete user.password

  switch (method) {
    case 'GET':
      const ocorrencies = await prisma?.ocorrency.findMany({
        where: {
          clientId: user?.clientId
        },
        orderBy:{
          date: 'desc'
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
      
      res.status(200).json({ 
        data:ocorrencies,
        success:true,
        error:'' 
      })
      break
    case 'POST':
      const { latitude, longitude } = req.body
      const ocorrency = await prisma?.ocorrency.create({
        data:{
          latitude,
          longitude,
          user:{
            connect:{ 
              id: user?.id
            }
          },
          client:{
            connect:{
              id: user?.clientId
            }
          }
        }
      })
      res.status(200).json({ 
        data:ocorrency,
        success:true,
        error:'' 
      })
      break
    default:
      res.status(430).send({
        success:false,
        error:'Method invalid!',
        data:[]
      })
      break
  }
}
