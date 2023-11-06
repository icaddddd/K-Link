import { Request, Response } from "express";
import AuthService from "../services/AuthService";

class AuthController {
  async register(req: Request, res: Response) {
    AuthService.register(req, res);
  }

  async login(req: Request, res: Response) {
    AuthService.login(req, res);
  }

  async check(req: Request, res: Response) {
    AuthService.check(req, res);
  }
}

export default new AuthController();