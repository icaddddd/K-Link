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
  Text
} from "@chakra-ui/react";
import { ChangeEvent, FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { API } from "../lib/api";
import IUser from "../interfaces/User";

export default function Register() {
  const navigate = useNavigate();
  const [form, setForm] = useState<IUser>({
    email: "",
    fullname: "",
    password: "",
  });

  async function handleChange(e: ChangeEvent<HTMLInputElement>) {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  }

  async function handleRegister(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    try {
      const response = await API.post("/auth/register", form);
      console.log("register success", response);
      navigate("/");
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
          <Heading fontSize={"4xl"}>Sign Up!</Heading>
        </Stack>
        <Box
          rounded={"lg"}
          bg={useColorModeValue("white", "gray.700")}
          boxShadow={"lg"}
          p={8}
          w={"500px"}
        >
          <Stack spacing={4}>
            <form onSubmit={handleRegister}>
              <FormControl id="fullname">
                <FormLabel>Fullname</FormLabel>
                <Input type="fullname" onChange={handleChange} name="fullname"/>
              </FormControl>
              <FormControl id="email">
                <FormLabel>Email address</FormLabel>
                <Input type="email" onChange={handleChange} name="email"/>
              </FormControl>
              <FormControl id="password">
                <FormLabel>Password</FormLabel>
                <Input type="password" onChange={handleChange} name="password"/>
              </FormControl>
              <Stack spacing={10}>
                <Stack
                  direction={{ base: "column", sm: "row" }}
                  align={"start"}
                  justify={"space-between"}
                  mt={4}
                >
                  <Text>
                    Already have an Account?
                    <Text
                      as={"span"}
                      cursor={"pointer"}
                      color={"blue.400"}
                      onClick={() => navigate("/")}
                      ml={2}
                    >
                      Click Here to Login!
                    </Text>
                  </Text>
                </Stack>
                <Button
                  type="submit"
                  bg={"blue.400"}
                  color={"white"}
                  _hover={{
                    bg: "blue.500",
                  }}
                >
                  Sign Up
                </Button>
              </Stack>
            </form>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
}
