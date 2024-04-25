import { FastifyInstance } from 'fastify'
import { ZodTypeProvider } from 'fastify-type-provider-zod'
import z from 'zod'
import { prisma } from '../database/prisma'

export const registerEvent = async (app: FastifyInstance) => {
  app.withTypeProvider<ZodTypeProvider>().post(
    '/events/:eventId/attendees',
    {
      schema: {
        body: z.object({
          name: z.string().min(4),
          email: z.string().email(),
        }),
        params: z.object({
          eventId: z.string().uuid(),
        }),
        response: {
          201: z.object({
            attendeeId: z.number(),
          }),
        },
      },
    },
    async (request, reply) => {
      const { eventId } = request.params
      const { email, name } = request.body

      const userAlreadyExists = await prisma.attendee.findUnique({
        where: {
          eventId_email: {
            email,
            eventId,
          },
        },
      })

      if (userAlreadyExists) {
        throw new Error('User already on the event')
      }

      const [event, totalParcicipantesEvento] = await Promise.all([
        prisma.event.findUnique({
          where: {
            id: eventId,
          },
        }),

        prisma.attendee.count({
          where: {
            eventId,
          },
        }),
      ])

      if (
        event?.maximunAttendees &&
        totalParcicipantesEvento >= event.maximunAttendees
      ) {
        throw new Error(
          'Capacidade de participante para o evento esta esgotada!',
        )
      }

      const attendee = await prisma.attendee.create({
        data: {
          email,
          name,
          eventId,
        },
      })

      return reply.status(201).send({ attendeeId: attendee.id })
    },
  )
}
