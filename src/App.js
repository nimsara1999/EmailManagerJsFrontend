import { ChakraProvider } from "@chakra-ui/react";
import SignupCard from "./Components/SignupCard";
import LoginCard from "./Components/LoginCard";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./Pages/Dashboard";

function App() {
  return (
    <ChakraProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/signup" element={<SignupCard />} />
          <Route path="/" element={<LoginCard />} />
          <Route path="/Dashboard" element={<Dashboard />} />
        </Routes>
      </BrowserRouter>
    </ChakraProvider>
  );
}

export default App;
