import { Request, Response } from "express";
import ProdServ from "../services/ProdServ";

class ProdCont{
    async create(req: Request, res: Response) {
        ProdServ.create(req, res)
    }

    async find(req: Request, res: Response) {
        ProdServ.find(req, res)
    }

    async update(req: Request, res: Response) {
        ProdServ.update(req, res)
    }

    async delete(req: Request, res: Response) {
        ProdServ.delete(req, res)
    }
}

export default new ProdCont()