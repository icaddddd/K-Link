import { Repository } from "typeorm";
import { AppDataSource } from "../data-source";
import { Admin } from "../entities/User";
import { Request, Response } from "express";
import { loginSchema, registerSchema } from "../utils/validators/validator";
import * as bcrypt from "bcrypt";
import * as jwt from "jsonwebtoken";

class AuthService {
  private readonly authRepository: Repository<Admin> =
    AppDataSource.getRepository(Admin);

  async register(req: Request, res: Response) {
    try {
      const data = req.body;
      const { error, value } = registerSchema.validate(data);

      if (error) {
        return res.status(400).json({ error: error });
      }
      const checkEmail = await this.authRepository.count({
        where: {
          email: value.email,
        },
      });

      if (checkEmail > 0) {
        return res.status(400).json({ error: "Email already exists." });
      }

      const passwordHashed = await bcrypt.hash(value.password, 10);

      const user = this.authRepository.create({
        fullname: value.fullname,
        email: value.email,
        password: passwordHashed,
      });

      const createUser = await this.authRepository.save(user);
      console.log(createUser);
      return res.status(200).json(createUser);
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  }

  async login(req: Request, res: Response): Promise<Response> {
    const JWT_SECRET_KEY = "SecretKey";

    try {
      const data = req.body;

      const { error, value } = loginSchema.validate(data);
      if (error) {
        return res.status(400).json({ error: error });
      }

      const checkEmail = await this.authRepository.findOne({
        where: {
          email: value.email,
        },
        select: ["id", "email", "fullname", "password"],
      });
      if (!checkEmail) {
        return res.status(400).json("Error email or password!");
      }

      const password = await bcrypt.compare(
        value.password,
        checkEmail.password
      );
      if (!password) {
        return res.status(400).json("Error email or password!");
      }

      const user = {
        id: checkEmail.id,
        email: checkEmail.email,
        password: checkEmail.password,
        fullname: checkEmail.fullname,
      };
      const token = jwt.sign({ user }, JWT_SECRET_KEY, { expiresIn: "1h" });

      return res.status(200).json({
        message: "token is valid",
        user: user,
        token: token,
      });
    } catch (error) {
      return res.status(500).json(error);
    }
  }

  async check(req: Request, res: Response): Promise<Response> {
    try {
      const loginSession = res.locals.loginSession;
      console.log("loginSession", loginSession);

      const user = await this.authRepository.findOne({
        where: {
          id: loginSession.user.id,
        },
        select: ["id", "email", "fullname"],
      });

      return res.status(200).json({
        message: "token is valid",
        id: user.id,
        fullname: user.fullname,
        email: user.email,
      });
    } catch (error) {
      return res.status(500).json("There's an error");
    }
  }
}

export default new AuthService();
