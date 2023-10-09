import React from "react";
import LoginCard from "../Components/LoginCard";
import { Flex } from "@chakra-ui/react";

export default function LandingPage() {
  return (
    <Flex
      align={"center"}
      alignContent={"center"}
      bgImage={
        "https://images.unsplash.com/photo-1560179707-f14e90ef3623?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2073&q=80"
      }
    >
      <LoginCard />
    </Flex>
  );
}
