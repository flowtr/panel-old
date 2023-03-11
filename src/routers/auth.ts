import { FastifyInstance } from "fastify";

async function routes(fastify : FastifyInstance, options : Record<string, string>){
    fastify.get('/', async function(request, reply) {
         return {hello: 'world'} 
    }), 

    fastify.get('/bye', async function(request, reply) {
         return {bye: 'good bye'} 
    }) 
}

module.exports = routes