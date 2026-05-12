import { NestMiddleware } from '@nestjs/common';
import { NextFunction } from 'express';

export class loggerGlobalMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const { method, url } = req;
    const now = new Date();
    const fechaHora = now.toLocaleString();

    const colors: Record<string, string> = {
      GET: '\x1b[32m',
      POST: '\x1b[34m',
      PUT: '\x1b[33m',
      DELETE: '\x1b[31m',
    };

    const color = colors[method] || '\x1b[37m';
    const reset = '\x1b[0m';

    console.log(
      `Estás ejecutando un método ${color}[${method}]${reset} ${url}, fecha ${fechaHora}`,
    );
    next();
  }
}

// export function loggerGlobal(req: Request, res: Response, next: NextFunction){
//     console.log(`Estás ejecutando un método ${req.method} en la ruta ${req.url} fecha:${new Date()}`);
//     next();
// }
