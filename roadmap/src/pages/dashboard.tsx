import React, { useEffect, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Text, Flex, Spinner } from "@chakra-ui/react";
import { IconType } from "react-icons";
import { FiHome } from "react-icons/fi";
import { FaPaperPlane, FaDolly, FaEnvelope } from "react-icons/fa";
import { auth, signInWithEmailAndPassword } from "../firebase/index";
import { getAuth } from "firebase/auth";

import App from "../components/App";
export type LinkItemProps = {
  name: string;
  path: string;
  icon: IconType;
};
const LinkItems: Array<LinkItemProps> = [
  { name: "Dashboard", path: "/dashboard", icon: FiHome },
  { name: "Roadmaps", path: "/", icon: FaEnvelope },
  { name: "Guides", path: "/", icon: FaPaperPlane },
  { name: "My subscriptions", path: "/", icon: FaDolly },
];

export default function Dashboard() {
  const user = useContext(AuthContext);
  auth.currentUser?.getIdTokenResult().then(results=>{
    console.log(results.claims?.admin)
  })

  // console.log(auth.currentUser?.getIdTokenResult);
  return (
    <App>
      <Text mb={2} fontSize="sm">
        {"Active "}
        <b>{"subscriptions"}</b>
      </Text>

      <Text>no items</Text>

      <Flex justify="flex-end" as="i" color="gray.500">
        {`Showing 0 out of all items `}
      </Flex>
    </App>
  );
}
