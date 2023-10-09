import React, { useState, useEffect } from "react";
import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Checkbox,
  Stack,
  Button,
  Heading,
  Text,
  useColorModeValue,
  Link,
  Alert,
  AlertIcon,
  CircularProgress,
  CircularProgressLabel,
} from "@chakra-ui/react";
import axios from "axios";

export default function LoginCard() {
  const [formData, setFormData] = useState({
    email: "",
    user_password: "",
  });
  const [loading, setLoading] = useState(false);
  const [notification, setNotification] = useState({ type: "", message: "" });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post(
        "http://localhost:8080/user/login",
        formData
      );

      if (response.status === 200) {
        setNotification({ type: "success", message: "Login successful!" });
        setTimeout(() => {
          setFormData({ email: "", user_password: "" });
          setNotification({ type: "", message: "" });
          setLoading(false);
          window.location.href = "/dashboard";
        }, 2000);
      }
    } catch (error) {
      if (error.response && error.response.status === 402) {
        setNotification({ type: "error", message: "Wait for admin approval." });
      } else if (error.response && error.response.status === 401) {
        setNotification({
          type: "error",
          message: "Username or password is incorrect.",
        });
      } else {
        setNotification({
          type: "error",
          message: "Network error. Please check your internet connection.",
        });
      }
      setLoading(false);
    }
  };

  return (
    <Flex
      minH={"100vh"}
      align={"center"}
      justify={"center"}
      bg={useColorModeValue("gray.50", "gray.800")}
      bgImage={
        "https://images.unsplash.com/photo-1560179707-f14e90ef3623?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2073&q=80"
      }
    >
      <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
        <Box
          rounded={"lg"}
          bg={useColorModeValue("white", "gray.700")}
          boxShadow={"lg"}
          p={8}
          opacity={0.96}
        >
          <form onSubmit={handleLogin}>
            <Stack align={"center"} paddingBottom={8}>
              <Heading fontSize={"4xl"}>Login</Heading>
            </Stack>
            {notification.type && (
              <Alert status={notification.type} mb={4}>
                <AlertIcon />
                {notification.message}
              </Alert>
            )}
            <Stack spacing={4}>
              <FormControl id="email">
                <FormLabel>Email address</FormLabel>
                <Input
                  autoFocus
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                />
              </FormControl>
              <FormControl id="user_password">
                <FormLabel>Password</FormLabel>
                <Input
                  type="password"
                  name="user_password"
                  value={formData.user_password}
                  onChange={handleInputChange}
                  required
                />
              </FormControl>
              <Stack spacing={10}>
                <Stack
                  direction={{ base: "column", sm: "row" }}
                  align={"start"}
                  justify={"space-between"}
                >
                  <Checkbox>Remember me</Checkbox>
                  <Text color={"blue.400"}>Forgot password?</Text>
                </Stack>
                <Button
                  type="submit"
                  bg={"blue.400"}
                  color={"white"}
                  _hover={{
                    bg: "blue.500",
                  }}
                >
                  {loading ? (
                    <CircularProgress
                      isIndeterminate
                      size="24px"
                      color="blue.400"
                    >
                      <CircularProgressLabel>Logging In</CircularProgressLabel>
                    </CircularProgress>
                  ) : (
                    "Login"
                  )}
                </Button>
              </Stack>
            </Stack>
            <Stack pt={6}>
              <Text align={"center"}>
                A new user?{" "}
                <Link color={"blue.400"} href="./signup">
                  Sign up
                </Link>
              </Text>
            </Stack>
          </form>
        </Box>
      </Stack>
    </Flex>
  );
}
