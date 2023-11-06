import { Center, Text } from "@chakra-ui/react";
import Navbar from "../components/Navbar";
import CustTable from "../components/CustTable";
import ProdTable from "../components/ProdTable";
import TransTable from "../components/TranTable";

export default function Home() {
  return (
    <>
      <Navbar />
      <Center>
        <Text fontSize={"5xl"}>HOME!</Text>
      </Center>
      <CustTable />
      <ProdTable />
      <TransTable />
    </>
  );
}
