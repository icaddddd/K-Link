interface ITrans {
  invoice_id: number;
  qty: number;
  invoice_total_amount: number;
  invoice_product_detail: string;
  invoice_total_count: number;
  invoice_date: string | Date;
}
