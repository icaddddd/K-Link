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
  Text,
} from "@chakra-ui/react";
import { ChangeEvent, FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { API } from "../lib/api";
import ILogin from "../interfaces/Login";

export default function Login() {
  const navigate = useNavigate();
  const [form, setForm] = useState<ILogin>({
    email: "",
    password: "",
  });

  async function handleChange(e: ChangeEvent<HTMLInputElement>) {
    e.preventDefault();
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  }

  async function handleLogin(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    try {
      const response = await API.post("/auth/login", form);
      console.log("Login success", response);
      localStorage.setItem("token", response.data.token);
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
          <Heading fontSize={"4xl"}>Sign In!</Heading>
        </Stack>
        <Box
          rounded={"lg"}
          bg={useColorModeValue("white", "gray.700")}
          boxShadow={"lg"}
          p={8}
          w={"500px"}
        >
          <Stack spacing={4}>
            <form onSubmit={handleLogin}>
              <FormControl id="email">
                <FormLabel>Email address</FormLabel>
                <Input type="email" onChange={handleChange} name="email"/>
              </FormControl>
              <FormControl id="password">
                <FormLabel>Password</FormLabel>
                <Input type="password" onChange={handleChange} name="password" />
              </FormControl>
              <Stack spacing={10}>
                <Stack
                  direction={{ base: "column", sm: "row" }}
                  align={"start"}
                  justify={"space-between"}
                  mt={4}
                >
                  <Text>
                    Create Account?
                    <Text
                      as={"span"}
                      cursor={"pointer"}
                      color={"blue.400"}
                      onClick={() => navigate("/auth/register")}
                      ml={2}
                    >
                      Click Here!
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
                  Sign In
                </Button>
              </Stack>
            </form>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
}
