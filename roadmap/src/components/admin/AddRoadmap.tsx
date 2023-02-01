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
  getDocs,
  serverTimestamp,
  DocumentData,
  QueryDocumentSnapshot,
} from "firebase/firestore";
interface Props {}
type FormValues = {
  name: string;
  description: string;
  title: string;
  isNew: boolean;
  id: string;
  author: string;
};
const AddRoadmap: React.FC<Props> = () => {
  const initialRef = useRef();

  const { handleSubmit, register } = useForm<FormValues>();
  const [loading, setLoading] = useState<boolean>(true);
  const [name, setName] = useState("");
  const [isNew, setIsNew] = useState(true);
  const [authors, setAuthors] = useState<any[]>([]);
  const toast = useToast();
  useEffect(() => {
    getAuthors();
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);

  const onSubmit = handleSubmit((data) => {
    (async () => {
      const docRef = await addDoc(collection(Firestore, "guides"), {
        name: data.name,
        description: data.description,
        id: data.id,
        isNew: isNew,
        title: data.title,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
        author: "yF4urvDV0WkZRb0KGaMN",
      });
      console.log("Document written with ID: ", docRef.id);
    })();
  });
  const ordersCollection = collection(Firestore, "authors");
  const getAuthors = async () => {
    const data = await getDocs(ordersCollection);
    let users:any = [];
    data.docs.forEach((doc) => {
      users.push({ ...doc.data(), id: doc.id });
    });
    setAuthors(users);
  };
  console.log("authors", authors);
  const flushInputs = () => {
    setName("");
  };
  return (
    <>
      <Box p="20px" rounded="5px" borderWidth={2}>
        <Box textAlign="left">
          <Heading mb="10px" fontSize="23px" fontWeight={700}>
            Add Roadmap
          </Heading>
          <Text mb="14px" fontSize="14px" lineHeight="20px">
            Enter your email below to add new roadmap
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
              placeholder="description"
              {...register("description", { required: true })}
              type="text"
            />
            <Input
              // variant="filled"
              {...register("title", { required: true })}
              placeholder="Title"
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
              {...register("id", { required: true })}
              placeholder="Id"
              size="sm"
              fontSize="15px"
              py="18px"
              rounded="4px"
              borderWidth={2}
              mb={"10px"}
              type="text"
            />
            <Select
              {...register("author", { required: true })}
              placeholder="Select Author"
              mb={"10px"}
            >
              {authors &&
                authors.map(({ id, name }) => (
                  <option key={id} value={id}>
                    {name}
                  </option>
                ))}
            </Select>
            <Checkbox
              isChecked={isNew}
              {...register("isNew", { required: false })}
              onChange={(e) => setIsNew(e.target.checked)}
              mb={"10px"}
            >
              {" "}
              Isnew
            </Checkbox>
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

export default AddRoadmap;
