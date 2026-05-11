import Fastify from "fastify"
import cors from "@fastify/cors"
import { prisma } from "../lib/prisma";

const app = Fastify()

await app.register(cors, {
  origin: "*"
})

app.get("/users", async () => {
  return prisma.user.findMany()
})

app.listen({ port: 3001 }, (err, address) => {
  if (err) {
    console.error(err)
    process.exit(1)
  }
  console.log(`Server running on ${address}`)
})