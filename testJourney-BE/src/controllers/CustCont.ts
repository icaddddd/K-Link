import { Request, Response } from "express";
import CustServ from "../services/CustServ";

class CustCont{
    async create(req: Request, res: Response) {
        CustServ.create(req, res)
    }

    async find(req: Request, res: Response) {
        CustServ.find(req, res)
    }

    async update(req: Request, res: Response) {
        CustServ.update(req, res)
    }

    async delete(req: Request, res: Response) {
        CustServ.delete(req, res)
    }
}

export default new CustCont()