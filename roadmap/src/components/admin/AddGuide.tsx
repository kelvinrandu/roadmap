import React, { useState, useEffect, useRef } from "react";
import { useForm } from "react-hook-form";

import {
  
  Input,
  Select,
  Textarea ,
  Button,
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

} from "firebase/firestore";
interface Props {}
type FormValues = {
  type: string;
  description: string;
  title: string;
  isNew: boolean;
  author: string;
};
const AddGuide: React.FC<Props> = () => {
  const initialRef = useRef();

  const { handleSubmit, register ,reset} = useForm<FormValues>();
  const [loading, setLoading] = useState<boolean>(true);
  
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
        description: data.description,
        id: formatId(data.title),
        isNew: isNew,
        type:data.type,
        title: data.title,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
        author: data.author,
      });
      console.log("Document written with ID: ", docRef.id);
       reset();
            toast({
              title: "Guide created",
              description: "We've created your guide for you.",
              status: "success",
              position: "top",
              duration: 3000,
              isClosable: true,
            });
    })();
  });
  const ordersCollection = collection(Firestore, "authors");
  const getAuthors = async () => {
    const data = await getDocs(ordersCollection);
    let users: any = [];
    data.docs.forEach((doc) => {
      users.push({ ...doc.data(), id: doc.id });
    });
    setAuthors(users);
  };
  const formatId = (title: string) => {
    return (title = title.replace(/\s+/g, "-").toLowerCase());
  };

  return (
    <>
      <Box p="20px" rounded="5px" borderWidth={2}>
        <Box textAlign="left">
          <Heading mb="10px" fontSize="23px" fontWeight={700}>
            Add Guide
          </Heading>
          <Text mb="14px" fontSize="14px" lineHeight="20px">
            Enter details below to add new guide
          </Text>

          <form onSubmit={onSubmit}>
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
            <Select
              {...register("type", { required: true })}
              placeholder="Select type"
              mb={"10px"}
            >
              <option key={"visual"} value={"visual"}>
                visual
              </option>
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
            <Textarea mb={"10px"}  {...register("description", { required: true })} placeholder="description lies here" />
            <Button
              type={"submit"}
              bg="gray.700"
              _hover={{ bg: "black" }}
              fontWeight={500}
              color={"white"}
              w="100%"
            >
              Add Guide
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

export default AddGuide;
