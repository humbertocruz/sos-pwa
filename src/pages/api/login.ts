// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from './_prisma'
import { v4 } from 'uuid'
import { verify, generate } from 'password-hash'

type Data = {
  token: string|undefined
}

export default async function login(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  let data = await prisma.user.findUnique({
    where: {
      email: req.body.email
    },
    select: {
      id: true,
      password: true
    }
  })
  if (!data) {
    res.status(404).json({ token: undefined })
    return
  }
  // Se a senha for NOVA, criptografa a enviada e grava no banco
  if (data?.password === 'nova') {
    const crypt = generate(req.body.password)
    await prisma.user.update({
      where: {
        id: data?.id
      },
      data: {
        password: crypt
      }
    })
    data.password = crypt
  }
  
  if (!verify(req.body.password, data?.password)) {
    res.status(401).json({ token: undefined })
    return
  } else {
    // cancela tokens anteriores
    await prisma.token.updateMany({
      where: {
        userId: data?.id
      },
      data: {
        valid: false
      }
    })
    // cria o novo token
    const token = v4()
    await prisma.token.create({
      data: {
        token: token,
        user:{
          connect: {
            id: data?.id
          }
        }
      }
    })
    // Devolve o token criado
    res.status(200).json({token})
    return
  }
}
