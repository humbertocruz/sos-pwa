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
  const { headers, method, query, body } = req
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
  if (user?.role!=='MONITOR') {
    res.status(430).send({
      success:false,
      error:'User invalid!',
      ocorrencies:[]
    })
  }

  switch (method) {
    case 'PUT':
      if (!query?.id) {
        res.status(430).send({
          success:false,
          error:'Id invalid!',
          ocorrencies:[]
        })
      }
      const ocorrencies = await prisma?.ocorrency.update({
        where: {
          id: query?.id?.toString()
        },
        data:{
          status:body.status
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
