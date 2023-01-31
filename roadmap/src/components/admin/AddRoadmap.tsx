import React, { useState, useRef } from "react";
import { useForm } from "react-hook-form";

import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Select,
  Button,
  Flex,
  Checkbox,
  useToast,
} from "@chakra-ui/react";
import {Firestore} from "../../firebase/index";
import { collection, addDoc,serverTimestamp } from "firebase/firestore"; 
interface Props {}
type FormValues = {
  name: string;
  description: string;
  title: string;
  isNew: boolean;
  id: string;
  author:string;
};
const AddRoadmap: React.FC<Props> = () => {
  const initialRef = useRef();

  const { handleSubmit, register } = useForm<FormValues>();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [title, setTitle] = useState("");
  const [id, setId] = useState("");
  const [isNew, setIsNew] = useState(true);
  const [author, setAuthor] = useState(null);
  const toast = useToast();
    const onSubmit = handleSubmit((data) => console.log(data));
  // const onCreateItem = (
  //   { name, price, amount, category_id, user_id }
  // ) => {


  //     (async () => {
  //               const docRef = await addDoc(collection(Firestore, "cities"), {
  //                 name: "Tokyo",
  //                 description: "Japan",
  //                 id: "Japan",
  //                 isNew: false,
  //                 title: "Japan",
  //                 createdAt: serverTimestamp(),
  //                 updatedAt: serverTimestamp(),
  //                 author: "yF4urvDV0WkZRb0KGaMN",
  //               });
  //               console.log("Document written with ID: ", docRef.id);

  //     })();


  //   toast({
  //     title: "Item created",
  //     description: "We've created your item for you.",
  //     status: "success",
  //     position: "top",
  //     duration: 3000,
  //     isClosable: true,
  //   });
  //   flushInputs();
  // };
  const flushInputs = () => {
    setName("");
  };
  return (
    <form onSubmit={onSubmit}>
      <FormControl isRequired>
        <FormLabel>name</FormLabel>
        <Input
          autoFocus
          placeholder="Name"
          onChange={(e) => setName(e.target.value)}
          variant="filled"
          value={name}
          type="text"
        />
      </FormControl>
      <FormControl isRequired mt={6}>
        <FormLabel>Price</FormLabel>
        <Input
          autoFocus
          variant="filled"
          // name=""
          placeholder="price"
          
          value={description}
          {...register("description", { required: true })}
          type="text"
        />
      </FormControl>

      <FormControl isRequired mt={6}>
        <FormLabel>Amount</FormLabel>
        <Input
          variant="filled"
          value={title}
          {...register("title", { required: true })}
          placeholder="Amount"
          type="text"
        />
      </FormControl>
      <FormControl isRequired mt={6}>
        <FormLabel>Amount</FormLabel>
        <Input
          variant="filled"
          value={id}
          {...register("id", { required: true })}
          placeholder="Amount"
          type="number"
        />
      </FormControl>
      <FormControl isRequired mt={6}>
        <FormLabel>Amount</FormLabel>
        <Checkbox
          isChecked={isNew}
          {...register("isNew", { required: true })}
          onChange={(e) => setIsNew(e.target.checked)}
        >
          {" "}
          Parent Checkbox
        </Checkbox>
      </FormControl>

      <Button
        //   isLoading={loading}
        type="submit"
        //   variantColor="teal"
        variant="solid"
        colorScheme="teal"
        ml={3}
      >
        Create
      </Button>
    </form>
  );
};

export default AddRoadmap;
