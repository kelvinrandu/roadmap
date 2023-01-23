import Link from "next/link";
import { useForm } from "react-hook-form";
import { Box, Center, Heading } from "@chakra-ui/layout";
import { Button } from "@chakra-ui/button";
import {
  FormControl,
  FormLabel,
  FormErrorMessage
} from "@chakra-ui/form-control";
import { Input } from "@chakra-ui/input";
import { auth, signInWithEmailAndPassword } from "../firebase/index";
interface LoginData {
  email: string;
  password: string;
}
const LoginComponent: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginData>();
  const onSubmit = (data: LoginData) => {
 signInWithEmailAndPassword(auth, data.email, data.password)
   .then((userCredential) => {
     // Signed in
     const user = userCredential.user;
     console.log(user)
     // ...
   })
   .catch((error) => {
     const errorCode = error.code;
     const errorMessage = error.message;
     console.log(error)
   });
  };
  return (
    <Center height="100vh">
      <Box
        p={8}
        my={"15"}
        maxWidth="500px"
        borderWidth={1}
        borderRadius={8}
        boxShadow="lg"
      >
        <Box textAlign="center">
          <Heading>Login</Heading>
        </Box>
        <Box my={4} textAlign="left">
          <form onSubmit={handleSubmit(onSubmit)}>
            <FormControl isRequired>
              <FormLabel>Email</FormLabel>
              <Input
                type="email"
                placeholder="test@test.com"
                {...register("email")}
              />
              <FormErrorMessage></FormErrorMessage>
            </FormControl>
            <FormControl isRequired mt={6}>
              <FormLabel>Password</FormLabel>
              <Input
                type="password"
                placeholder="*******"
                {...register("password")}
              />
              <FormErrorMessage></FormErrorMessage>
            </FormControl>
            <Button
              type="submit"
              // variantColor="teal"
              variant="outline"
              width="full"
              mt={4}
              _hover={{
                transform: "translateY(-2px)",
                boxShadow: "lg",
              }}
            >
              Login
            </Button>
          </form>
        </Box>
        <Box textAlign="center">
          <div className="bg-gray-100">
            <div className="bg-gray-100 container mx-auto px-6 pt-10 pb-6">
              © roadmaps. All rights reserved
            </div>
          </div>
        </Box>
      </Box>
    </Center>
  );
};
export default LoginComponent;
