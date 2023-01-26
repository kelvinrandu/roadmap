import React, { useEffect, useState } from "react";
import { Text, Flex, Spinner } from "@chakra-ui/react";

import App from "../components/App";
import AddAdmin from "../components/AddAdmin";

export default function Admin() {
  return (
    <App>
      <Text mb={2} fontSize="sm">
        {"Active "}
        <b>{"subscriptions"}</b>
      </Text>

      <Text>no items</Text>
      <AddAdmin/>

      <Flex justify="flex-end" as="i" color="gray.500">
        {`Showing 0 out of all items `}
      </Flex>
    </App>
  );
}
