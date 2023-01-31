import React from 'react'
import { useForm } from "react-hook-form";
import { Box, Center, Heading } from "@chakra-ui/layout";
import { Button } from "@chakra-ui/button";
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
} from "@chakra-ui/form-control";
import { Input } from "@chakra-ui/input";
import  firebase  from "../firebase/index";
import {
  getFunctions,
  httpsCallable,
} from "firebase/functions";
interface AdminData {
  email: string;
 
}
export default function AddAdmin() {
      const {
        register,
        handleSubmit,
        formState: { errors },
      } = useForm<AdminData>();

      const onSubmit = (data: AdminData) => {
           const functions = getFunctions(firebase);
           const addAdminRole = httpsCallable(functions, "addAdminRole");
           addAdminRole({email:data.email}).then(results =>{
               console.log(results)
           })

      };
  return (
   
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
              Add admin
            </Button>
          </form>
        </Box>
        <Box textAlign="center">
          <div className="bg-gray-100">
            <div className="bg-gray-100 container mx-auto px-6 pt-10 pb-6">

            </div>
          </div>
        </Box>
      </Box>
  
  );
}
