import { Controller, Get, Res } from '@nestjs/common';
import type { Response } from 'express';
import { InjectConnection } from '@nestjs/mongoose';
import { Connection } from 'mongoose';

const startTime = Date.now();

@Controller()
export class AppController {
  constructor(
    @InjectConnection() private readonly connection: Connection,
  ) {}

  @Get()
  getHome(@Res() res: Response) {
    // Database status
    const dbStatus =
      this.connection.readyState === 1 ? 'Connected ✅' : 'Disconnected ❌';

    // Uptime
    const uptimeSeconds = Math.floor((Date.now() - startTime) / 1000);
    const uptimeMinutes = Math.floor(uptimeSeconds / 60);

    // Environment info
    const env = process.env.NODE_ENV || 'development';
    const port = process.env.PORT || 3000;

    res.send(`
      <!DOCTYPE html>
      <html>
      <head>
        <title>Gmail Clone Backend</title>
        <style>
          body { font-family: Arial; background:#f4f6f8; padding:40px }
          .card {
            max-width:700px; margin:auto; background:white;
            padding:30px; border-radius:10px;
            box-shadow:0 10px 25px rgba(0,0,0,.1)
          }
          h1 { color:#1a73e8 }
        </style>
      </head>
      <body>
        <div class="card">
          <h1>📧 Gmail Clone Backend</h1>
          <p><b>Status:</b> Running ✅</p>

          <h3>System Info</h3>
          <ul>
            <li>Database: <b>${dbStatus}</b></li>
            <li>Uptime: <b>${uptimeMinutes} minutes</b></li>
            <li>Environment: <b>${env}</b></li>
            <li>Port: <b>${port}</b></li>
          </ul>

          <h3>API Docs</h3>
          <p>👉 <a href="/api-docs">Open Swagger UI</a></p>

          <hr/>
          <p><small>Developed by Samruddhi Bhaskar Mohite</small></p>
        </div>
      </body>
      </html>
    `);
  }
}