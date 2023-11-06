import { Request, Response } from "express";
import TransServ from "../services/TransServ";

class TransCont{
    async create(req: Request, res: Response) {
        TransServ.create(req, res)
    }

    async find(req: Request, res: Response) {
        TransServ.find(req, res)
    }

    async update(req: Request, res: Response) {
        TransServ.update(req, res)
    }

    async delete(req: Request, res: Response) {
        TransServ.delete(req, res)
    }
}

export default new TransCont()