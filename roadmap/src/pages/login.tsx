import React, { useEffect, useContext } from "react";
import Login from "../components/Login";
import { AuthContext } from "../context/AuthContext";
import { Center } from "@chakra-ui/layout";
import { Text, Flex, Spinner } from "@chakra-ui/react";
import Router from "next/router";
export default function login() {
      const user = useContext(AuthContext);
      useEffect(() => {
        if (user) Router.push("/dashboard");
      }, [user]);
  return (
    <>
      {!user ? (
        <Center>
          <Login />
        </Center>
      ) : (
        <Flex pt={24} align="center" justify="center">
          <Spinner size="xl" label="Loading outbox" />
        </Flex>
      )}
    </>
  );
}
