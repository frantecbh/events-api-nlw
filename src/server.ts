import fastify from 'fastify'
import {
  serializerCompiler,
  validatorCompiler,
} from 'fastify-type-provider-zod'
import { createEvent } from './routes/create-events'
import { registerEvent } from './routes/register-event'
import { getEvent } from './routes/get-event'

const app = fastify()

app.register(createEvent)
app.register(registerEvent)
app.register(getEvent)

// Add schema validator and serializer
app.setValidatorCompiler(validatorCompiler)
app.setSerializerCompiler(serializerCompiler)

app.listen({ port: 3333 }).then(() => {
  console.log('HTTP server running')
})
