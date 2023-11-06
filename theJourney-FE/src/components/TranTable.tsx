import {
  TableContainer,
  Table,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  Text,
  Button,
  Box,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
  Input,
  Select,
  FormLabel,
  FormControl,
} from "@chakra-ui/react";
import { API } from "../lib/api";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function TransTable() {
  const [data, setData] = useState<ITrans[]>([]);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [form, setForm] = useState<ITrans>({
    invoice_id: 0,
    invoice_product_detail: "",
    invoice_total_amount: 0,
    invoice_total_count: 0,
    invoice_date: "" || new Date(),
    qty: 0,
  });
  const navigate = useNavigate();

  async function getData() {
    try {
      const response = await API.get("/transaction");
      setData(response.data);
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    getData();
  }, []);

  async function handleChange(e: ChangeEvent<HTMLInputElement>) {
    e.preventDefault();
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    try {
      const response = await API.post("/transaction", form);
      console.log("customer added successfully", response);
      getData();
    } catch (err) {
      console.log(err);
    }
  }

  async function deleteData(id: number) {
    try {
      const response = await API.delete(`/transaction/${id}`);
      console.log("customer deleted successfully", response);
      getData();
      navigate("/home");
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <>
      <Text p={5} fontSize={"2xl"}>
        TRANSACTION!
      </Text>
      <Box px={5}>
        <Button onClick={onOpen}>Add Transaction</Button>
      </Box>
      <Modal blockScrollOnMount={false} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add Transaction!</ModalHeader>
          <ModalCloseButton />
          <form onSubmit={handleSubmit}>
            <ModalBody>

              {/* <Select>
                  <option id="qty" value="1">1</option>
                  <option id="qty" value="2">2</option>
                  <option id="qty" value="3">3</option>
                </Select> */}
              <Input
                placeholder="Quantity"
                name="qty"
                onChange={handleChange}
              />

              <Input
                placeholder="Total Amount"
                name="invoice_total_amount"
                onChange={handleChange}
              />
              {/* <Select>
                  <option id="invoice_total_count" value="1">1</option>
                  <option id="invoice_total_count" value="2">2</option>
                  <option id="invoice_total_count" value="3">3</option>
                </Select> */}
              <Input
                placeholder="Total Count"
                name="invoice_total_count"
                onChange={handleChange}
              />
              <Input
                placeholder="Product Detail"
                name="invoice_product_detail"
                onChange={handleChange}
              />
            </ModalBody>

            <ModalFooter>
              <Button colorScheme="blue" mr={3} onClick={onClose}>
                Close
              </Button>
              <Button type="submit" variant="ghost">
                Submit
              </Button>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
      <TableContainer p={5}>
        <Table variant="striped" colorScheme="teal">
          <Thead>
            <Tr>
              <Th>Invoice Date</Th>
              <Th>Quantity</Th>
              <Th>Total Amount</Th>
              <Th>Total Count</Th>
              <Th>Product Detail</Th>
              <Th>Edit</Th>
            </Tr>
          </Thead>
          <Tbody>
            {data?.map((item) => (
              <Tr key={item.invoice_id}>
                <Td>{item.invoice_date}</Td>
                <Td>{item.qty}</Td>
                <Td>{item.invoice_total_amount}</Td>
                <Td>{item.invoice_total_count}</Td>
                <Td>{item.invoice_product_detail}</Td>
                <Td>
                  <Link to={`/updatecustomer/${item.invoice_id}`}>
                    <Button>Edit</Button>
                  </Link>
                  <Button ml={2} onClick={() => deleteData(item.invoice_id)}>
                    Delete
                  </Button>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </>
  );
}
