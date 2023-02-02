import React, { useState, useEffect, useRef } from "react";
import { useForm } from "react-hook-form";

import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Select,
  Button,
  Flex,
  Box,
  Heading,
  Text,
  Checkbox,
  useToast,
} from "@chakra-ui/react";
import { Firestore } from "../../firebase/index";
import {
  collection,
  addDoc,
  serverTimestamp,

} from "firebase/firestore";
interface Props {}
type FormValues = {
  name: string;
  username: string;
  twitter: string;
  bio: boolean;
  picture: string;

};
const AddAuthor: React.FC<Props> = () => {
  const initialRef = useRef();

  const { handleSubmit, register } = useForm<FormValues>();
  const [loading, setLoading] = useState<boolean>(true);


  const toast = useToast();


  const onSubmit = handleSubmit((data) => {
    (async () => {
      const docRef = await addDoc(collection(Firestore, "guides"), {
        name: data.name,
        username: data.username,
        twitter: data.twitter,
        bio: data.bio,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
        picture: "",
      });
      console.log("Document written with ID: ", docRef.id);
    })();
  });

  const flushInputs = () => {
    
  };

  return (
    <>
      <Box p="20px" rounded="5px" borderWidth={2}>
        <Box textAlign="left">
          <Heading mb="10px" fontSize="23px" fontWeight={700}>
            Add Author
          </Heading>
          <Text mb="14px" fontSize="14px" lineHeight="20px">
            Enter details below to add new roadmap
          </Text>

          <form onSubmit={onSubmit}>
            <Input
              autoFocus
              size="sm"
              fontSize="15px"
              py="18px"
              rounded="4px"
              borderWidth={2}
              mb={"10px"}
              placeholder="Name"
              {...register("name", { required: true })}
              // variant="filled"
              type="text"
            />
            <Input
              autoFocus
              // variant="filled"
              size="sm"
              fontSize="15px"
              py="18px"
              rounded="4px"
              borderWidth={2}
              mb={"10px"}
              placeholder="username"
              {...register("username", { required: true })}
              type="text"
            />
            <Input
              // variant="filled"
              {...register("twitter", { required: true })}
              placeholder="Twitter handle"
              size="sm"
              fontSize="15px"
              py="18px"
              rounded="4px"
              borderWidth={2}
              mb={"10px"}
              type="text"
            />
            <Input
              // variant="filled"
              {...register("bio", { required: true })}
              placeholder="bio"
              size="sm"
              fontSize="15px"
              py="18px"
              rounded="4px"
              borderWidth={2}
              mb={"10px"}
              type="text"
            />
 
            <Button
              type={"submit"}
              bg="gray.700"
              _hover={{ bg: "black" }}
              fontWeight={500}
              color={"white"}
              w="100%"
            >
              Add Roadmap
            </Button>
          </form>

          <Text color="gray.500" fontSize="12px" mt="10px">
            <Text as="span">Once a month email</Text> about the changes to
            roadmaps, new roadmaps, free guides and videos.
          </Text>
        </Box>
      </Box>
    </>
  );
};

export default AddAuthor;
