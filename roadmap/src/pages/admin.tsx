import React, { useEffect, useState } from "react";
import { Text, Flex, Spinner } from "@chakra-ui/react";

import App from "../components/App";
import AddAdmin from "../components/AddAdmin";
import AddRoadmap from "../components/admin/AddRoadmap"
import AddGuide from "@/components/admin/AddGuide";
export default function Admin() {
  return (
    <App>
      <Text mb={2} fontSize="sm">
        {"Active "}
        <b>{"subscriptions"}</b>
      </Text>

      <Text>no items</Text>
      {/* <AddAdmin/> */}
      {/* <AddRoadmap/> */}
      <AddGuide/>

      <Flex justify="flex-end" as="i" color="gray.500">
        {`Showing 0 out of all items `}
      </Flex>
    </App>
  );
}
