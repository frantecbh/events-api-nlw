import { FastifyInstance } from 'fastify'
import { ZodTypeProvider } from 'fastify-type-provider-zod'
import z from 'zod'
import { prisma } from '../database/prisma'

export const getEvent = async (app: FastifyInstance) => {
  app.withTypeProvider<ZodTypeProvider>().get(
    '/events/:eventId',
    {
      schema: {
        params: z.object({
          eventId: z.string().uuid(),
        }),

        // response: {
        //   200: {
        //     event: z.object({
        //       id: z.string().uuid(),
        //       title: z.string(),
        //       slug: z.string(),
        //       details: z.string().nullable(),
        //       maximunAttendees: z.number().int().nullable(),
        //       totalParticipantes: z.number().int(),
        //     }),
        //   },
        // },
      },
    },
    async (request, replay) => {
      // const serachEventSchema = z.object({
      //   eventId: z.string().uuid(),
      // })

      // const { eventId } = serachEventSchema.parse(request.params)

      const { eventId } = request.params

      const event = await prisma.event.findUnique({
        where: {
          id: eventId,
        },
        select: {
          id: true,
          title: true,
          slug: true,
          details: true,
          maximunAttendees: true,
          _count: {
            select: {
              attendees: true,
            },
          },
        },
      })

      if (event === null) {
        throw new Error('Event not exists')
      }

      return replay.status(200).send({
        event: {
          id: event.id,
          title: event.title,
          slug: event.slug,
          details: event.details,
          maximunAttendees: event.maximunAttendees,
          totalParticipantes: event._count.attendees,
        },
      })
    },
  )
}
