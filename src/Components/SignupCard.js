import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  HStack,
  InputRightElement,
  Stack,
  Button,
  Heading,
  Text,
  useColorModeValue,
  Link,
  Select,
  Spinner,
  Alert,
  AlertIcon,
} from "@chakra-ui/react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";

export default function SignupCard() {
  const [postsArry, setPostsArry] = useState([]);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    user_password: "",
    recip_name: "",
    nick_name: "",
    post_id: "",
    birthday: "",
  });
  const [showSuccessNotification, setShowSuccessNotification] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:8080/post/get")
      .then((response) => {
        // Assuming the response data is an array of objects with 'post_id' and 'post' properties
        setPostsArry(response.data);
      })
      .catch((error) => {
        console.error("Error fetching posts:", error);
      });
  }, []);

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData({
      ...formData,
      [id]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    // Password validation rules
    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;

    if (!passwordRegex.test(formData.user_password)) {
      setError(
        "Password must contain at least 8 characters, including one uppercase letter, one lowercase letter, and one digit."
      );
      setIsLoading(false);
      return; // Stop the submission if the password doesn't meet the criteria
    }

    try {
      const response = await axios.post(
        "http://localhost:8080/user/signup",
        formData
      );

      if (response.status === 200) {
        setShowSuccessNotification(true);
        setIsLoading(false);
        window.location.href = "/";
      }
    } catch (error) {
      if (error.response && error.response.status === 400) {
        setError("Email Already Exist.");
      } else if (error.response && error.response.status === 500) {
        setError("Internal server error. Please try again later.");
      } else {
        setError("Network error. Please check your internet connection.");
      }

      setIsLoading(false);
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
          <Stack align={"center"} paddingBottom={8}>
            <Heading fontSize={"4xl"} textAlign={"center"}>
              Sign up
            </Heading>
          </Stack>

          <form onSubmit={handleSubmit}>
            <Stack spacing={4}>
              <FormControl id="recip_name" isRequired>
                <FormLabel>Full Name</FormLabel>
                <Input
                  autoFocus
                  type="text"
                  value={formData.recip_name}
                  onChange={handleInputChange}
                />
              </FormControl>
              <HStack>
                <Box>
                  <FormControl id="nick_name">
                    <FormLabel>Nick Name</FormLabel>
                    <Input
                      type="text"
                      value={formData.nick_name}
                      onChange={handleInputChange}
                    />
                  </FormControl>
                </Box>
                <Box>
                  <FormControl id="birthday" isRequired>
                    <FormLabel>Birthday</FormLabel>
                    <Input
                      format="yyyy-MM-dd"
                      type="date"
                      value={formData.birthday}
                      onChange={handleInputChange}
                    />
                  </FormControl>
                </Box>
              </HStack>
              <FormControl id="email" isRequired>
                <FormLabel>Email address</FormLabel>
                <Input
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange}
                />
              </FormControl>

              <HStack>
                <Box>
                  <FormControl id="post_id" isRequired>
                    <FormLabel>Post</FormLabel>
                    <Select
                      value={formData.post_id}
                      onChange={(e) => {
                        const selectedIndex = e.target.selectedIndex - 1;
                        setFormData({
                          ...formData,
                          post_id: selectedIndex + 1,
                        });
                      }}
                    >
                      <option value="" disabled>
                        Select a Post
                      </option>
                      {postsArry.map((post) => (
                        <option key={post.post_id} value={post.post_id}>
                          {post.post}
                        </option>
                      ))}
                    </Select>
                  </FormControl>
                </Box>
                <Box></Box>
              </HStack>

              <FormControl id="user_password" isRequired>
                <FormLabel>Password</FormLabel>
                <InputGroup>
                  <Input
                    type={showPassword ? "text" : "password"}
                    value={formData.user_password}
                    onChange={handleInputChange}
                  />
                  <InputRightElement h={"full"}>
                    <Button
                      variant={"ghost"}
                      onClick={() =>
                        setShowPassword((showPassword) => !showPassword)
                      }
                    >
                      {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                    </Button>
                  </InputRightElement>
                </InputGroup>
              </FormControl>
              <Stack spacing={10} pt={2}>
                <Button
                  type="submit"
                  loadingText="Submitting"
                  size="lg"
                  bg={"blue.400"}
                  color={"white"}
                  _hover={{
                    bg: "blue.500",
                  }}
                  isLoading={isLoading}
                >
                  Sign up
                </Button>
              </Stack>
            </Stack>
          </form>
          {showSuccessNotification && (
            <Alert status="success" mt={4}>
              <AlertIcon />
              Successfully registered
            </Alert>
          )}
          {error && (
            <Alert status="error" mt={4}>
              <AlertIcon />
              {error}
            </Alert>
          )}
          <Stack pt={6}>
            <Text align={"center"}>
              Already a user?{" "}
              <Link color={"blue.400"} href="/">
                Login
              </Link>
            </Text>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
}
