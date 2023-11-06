import { Repository } from "typeorm";
import { AppDataSource } from "../data-source";
import { Transaction } from "../entities/Transaction";
import { Request, Response } from "express";

class CustServ {
  private readonly transRepository: Repository<Transaction> =
    AppDataSource.getRepository(Transaction);

  async create(req: Request, res: Response) {
    try {
      const data = req.body;
      const user = this.transRepository.create(data);
      const createUser = await this.transRepository.save(user);
      return res.status(200).json(createUser);
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  }

  async find(req: Request, res: Response) {
    try {
      const users = await this.transRepository.find();
      return res.status(200).json(users);
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  }

  async update(req: Request, res: Response) {
    try {
      const id = req.params.id as unknown as number;
      const data = req.body;
      const user = await this.transRepository.findOne({ where: { invoice_id: id } });

      user.invoice_product_detail = data.invoice_product_detail;
      user.invoice_total_amount = data.invoice_total_amount;
      user.invoice_date = data.invoice_date;

      const updateUser = await this.transRepository.save(user);

      return res.status(200).json(updateUser);
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  }

  async delete(req: Request, res: Response) {
    try {
      const id = req.params.id as unknown as number;
      const user = await this.transRepository.findOne({ where: { invoice_id: id } });

      await this.transRepository.remove(user);
    } catch (error) {
      return res.status(500).json(error);
    }
  }
}

export default new CustServ();
