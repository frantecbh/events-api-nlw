import fastify from 'fastify'
import {
  serializerCompiler,
  validatorCompiler,
} from 'fastify-type-provider-zod'
import { createEvent } from './routes/create-events'

const app = fastify()

app.register(createEvent)

// Add schema validator and serializer
app.setValidatorCompiler(validatorCompiler)
app.setSerializerCompiler(serializerCompiler)

app.listen({ port: 3333 }).then(() => {
  console.log('HTTP server running')
})
