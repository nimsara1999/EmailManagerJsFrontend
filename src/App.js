import { ChakraProvider } from "@chakra-ui/react";
import SignupCard from "./Components/SignupCard";
import LoginCard from "./Components/LoginCard";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <ChakraProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/signup" element={<SignupCard />} />
          <Route path="/login" element={<LoginCard />} />
        </Routes>
      </BrowserRouter>
    </ChakraProvider>
  );
}

export default App;
