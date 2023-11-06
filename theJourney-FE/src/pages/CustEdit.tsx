import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Button,
  Heading,
  useColorModeValue,
} from "@chakra-ui/react";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { API } from "../lib/api";

export default function CustEdit() {
  const navigate = useNavigate();
  const [form, setForm] = useState<ICustEdit>({
    id: 0,
    fullname: "",
    division: "",
  });
  const param = useParams();

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    const { name, value, files } = event.target;

    if (files) {
      setForm({
        ...form,
        [name]: files[0],
      });
    } else {
      setForm({
        ...form,
        [name]: value,
      });
    }
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    try {
      const id = param.id;
      const formData = new FormData();
      formData.append("fullname", form.fullname);
      formData.append("division", form.division);

      const response = await API.patch(`/customer/${id}`, formData);
      console.log("customer updated successfully", response);

      navigate("/home");
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <Flex
      minH={"100vh"}
      align={"center"}
      justify={"center"}
      bg={useColorModeValue("gray.50", "gray.800")}
    >
      <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
        <Stack align={"center"}>
          <Heading fontSize={"4xl"}>Update Customer!</Heading>
        </Stack>
        <Box
          rounded={"lg"}
          bg={useColorModeValue("white", "gray.700")}
          boxShadow={"lg"}
          p={8}
          w={"500px"}
        >
          <Stack spacing={4}>
            <form onSubmit={handleSubmit}>
              <FormControl id="fullname">
                <FormLabel>Fullname</FormLabel>
                <Input
                  type="fullname"
                  onChange={handleChange}
                  name="fullname"
                />
              </FormControl>
              <FormControl id="division">
                <FormLabel>Division</FormLabel>
                <Input
                  type="division"
                  onChange={handleChange}
                  name="division"
                />
              </FormControl>
              <Stack spacing={10}>
                <Button
                  type="submit"
                  bg={"blue.400"}
                  color={"white"}
                  _hover={{
                    bg: "blue.500",
                  }}
                  mt={4}
                >
                  Edit Customer
                </Button>
              </Stack>
            </form>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
}
