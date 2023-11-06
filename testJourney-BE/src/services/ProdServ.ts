import { Repository } from "typeorm";
import { AppDataSource } from "../data-source";
import { Product } from "../entities/Product";
import { Request, Response } from "express";

class ProdServ {
  private readonly custRepository: Repository<Product> =
    AppDataSource.getRepository(Product);

  async create(req: Request, res: Response) {
    try {
      const data = req.body;
      const user = this.custRepository.create(data);
      const createUser = await this.custRepository.save(user);
      return res.status(200).json(createUser);
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  }

  async find(req: Request, res: Response) {
    try {
      const users = await this.custRepository.find();
      return res.status(200).json(users);
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  }

  async update(req: Request, res: Response) {
    try {
      const id = req.params.id as unknown as number;
      const data = req.body;
      const user = await this.custRepository.findOne({ where: { id: id } });

      user.product_name = data.product_name;
      user.product_price = data.product_price;

      const updateUser = await this.custRepository.save(user);

      return res.status(200).json(updateUser);
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  }

  async delete(req: Request, res: Response) {
    try {
      const id = req.params.id as unknown as number;
      const user = await this.custRepository.findOne({ where: { id: id } });

      await this.custRepository.remove(user);
    } catch (error) {
      return res.status(500).json({ error: error });
    }
  }
}

export default new ProdServ();
