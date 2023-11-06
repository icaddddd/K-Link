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
import { Link, useNavigate } from "react-router-dom";

export default function CustTable() {
  const [data, setData] = useState<ICust[]>([]);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [form, setForm] = useState<ICust>({
    id: 0,
    fullname: "",
    division: "",
  });
  const navigate = useNavigate();

  async function getData() {
    try {
      const response = await API.get("/customer");
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
      const response = await API.post("/customer", form);
      console.log("customer added successfully", response);
      getData();
    } catch (err) {
      console.log(err);
    }
  }

  async function deleteData(id: number) {
    try {
      const response = await API.delete(`/customer/${id}`);
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
        CUSTOMER!
      </Text>
      <Box px={5}>
        <Button onClick={onOpen}>Add Customer</Button>
      </Box>
      <Modal blockScrollOnMount={false} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add Customer!</ModalHeader>
          <ModalCloseButton />
          <form onSubmit={handleSubmit}>
            <ModalBody>
              <Input
                placeholder="Fullname"
                name="fullname"
                onChange={handleChange}
              />
              <Input
                placeholder="Division"
                name="division"
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
              <Th>Customer</Th>
              <Th>Division</Th>
              <Th>Edit</Th>
            </Tr>
          </Thead>
          <Tbody>
            {data?.map((item) => (
              <Tr key={item.id}>
                <Td>{item.fullname}</Td>
                <Td>{item.division}</Td>
                <Td>
                <Link to={`/updatecustomer/${item.id}`}>
                  <Button>Edit</Button>
                </Link>
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
