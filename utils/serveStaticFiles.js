import fs from 'node:fs/promises'
import path from 'node:path'
import { sendResponse } from './sendResponse.js'
import { getContentType } from '../data/types.js'

export async function serveStaticFiles(req, res, baseDir) {

    const publicDir = path.join(baseDir, 'public')
    const filePath = path.join(
        publicDir,
        req.url === '/' ? 'index.html' : req.url
    )

    const ext = path.extname(filePath)

    const contentType = getContentType(ext)

    try {
        
        const content = await fs.readFile(filePath)
        sendResponse(res, 200, contentType, content)

    } catch (err) {

        if (err.code === 'ENOENT') {
            const content = await fs.readFile(path.join(publicDir, '404.html'))
            sendResponse(res, 404, contentType, content)
        } else {
            sendResponse(res, 500, 'text/html', `<html><h1>Server Error: ${err.code}</h1></html>`)
        }          

    }
}