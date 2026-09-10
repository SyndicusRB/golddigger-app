import http from 'node:http'
import { serveStaticFiles } from './utils/serveStaticFiles.js'

const hostname = '127.0.0.1'
const PORT = 8000

const __dirname = import.meta.dirname

const server = http.createServer(async (req, res) => {
            
        serveStaticFiles(req, res, __dirname)
        
})

server.listen(PORT, () => console.log( `Server running at: http://${hostname}:${PORT}/`))

// http://127.0.0.1:8000/