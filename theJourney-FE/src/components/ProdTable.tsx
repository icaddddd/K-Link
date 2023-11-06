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
} from "@chakra-ui/react";
import { API } from "../lib/api";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import IProduct from "../interfaces/Product";
import { useNavigate } from "react-router-dom";

export default function ProdTable() {
  const [data, setData] = useState<IProduct[]>([]);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [form, setForm] = useState<IProduct>({
    id: 0,
    product_name: "",
    product_price: 0,
  });
  const navigate = useNavigate()

  async function getData() {
    try {
      const response = await API.get("/product");
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
      const response = await API.post("/product", form);
      console.log("customer added successfully", response);
      getData();
    } catch (err) {
      console.log(err);
    }
  }

   async function deleteData(id: number) {
    try {
      const response = await API.delete(`/product/${id}`);
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
        Product!
      </Text>
      <Box px={5}>
        <Button onClick={onOpen}>Add Product</Button>
      </Box>
      <Modal blockScrollOnMount={false} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add Product!</ModalHeader>
          <ModalCloseButton />
          <form onSubmit={handleSubmit}>
            <ModalBody>
              <Input
                placeholder="Product Name"
                name="product_name"
                onChange={handleChange}
              />
              <Input
                placeholder="Product Price"
                name="product_price"
                mt={3}
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
              <Th>Product</Th>
              <Th>Price</Th>
              <Th>Edit</Th>
            </Tr>
          </Thead>
          <Tbody>
            {data?.map((item) => (
              <Tr key={item.id}>
                <Td>{item.product_name}</Td>
                <Td>{item.product_price}</Td>
                <Td>
                  <Button>Edit</Button>
                  <Button ml={2} onClick={() => deleteData(item.id)}>Delete</Button>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </>
  );
}
