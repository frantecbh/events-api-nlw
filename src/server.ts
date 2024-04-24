import fastify from 'fastify'
import z from 'zod'
import { prisma } from './database/prisma'

const app = fastify()

app.post('/events', async (request, reply) => {
  const createEventSchema = z.object({
    title: z.string().min(4),
    details: z.string().nullable(),
    maximunAttendees: z.number().int().positive().nullable(),
  })

  const { title, details, maximunAttendees } = createEventSchema.parse(
    request.body,
  )

  const event = await prisma.event.create({
    data: {
      title,
      details,
      maximunAttendees,
      slug: new Date().toISOString(),
    },
  })

  return reply.status(201).send({ eventID: event.id })
})

app.listen({ port: 3333 }).then(() => {
  console.log('HTTP server running')
})
