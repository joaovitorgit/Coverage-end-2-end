const http = require('http')
const DEFAULT_USER = {username: 'joaovitor', password: 'root'}

const routes ={
    '/contact:get':(request, response)=>{
        response.write('Contact us page')
        return response.end()  
    },

    '/login:post':async(request, response)=>{
        // Response is a iterator
        for await(const data of request){
            const user = JSON.parse(data)
            if(user.username !== DEFAULT_USER.username ||
                user.password !== DEFAULT_USER.password){
                    response.writeHead(401)
                    response.write("Logging has failed")
                    return response.end()
            }
            response.write('Logging has succeded!')
            return response.end()

        }
    },

    default: (request, response)=>{
        response.write('Hello World!')
        return response.end()
    }
}

const handler = function(request, response){
    const {url, method} = request
    const routKey = `${url}:${method.toLowerCase()}`
    
    const chosen = routes[routKey] || routes.default

    response.writeHead(200, {
        'Content-Type': 'text/html'
        
    })

    return chosen(request, response)

}
 
const app = http.createServer(handler)
                .listen(5001, ()=>console.log('Server running at', 5001))

module.exports = app 