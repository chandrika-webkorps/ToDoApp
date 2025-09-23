import type { Request, Response } from 'express';
export declare const addTask: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const toggleTask: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const getTasks: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const deleteTask: (req: Request, res: Response) => Promise<void>;
//# sourceMappingURL=todoController1.d.ts.map