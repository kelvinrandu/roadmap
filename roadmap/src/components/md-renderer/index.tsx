import React from "react";
// @ts-ignore
import { MDXProvider } from "@mdx-js/react";
import { ChakraProvider, Code } from "@chakra-ui/react";
import MdxComponents from "./mdx-components";
import { roadmapTheme } from "../../styles/theme";
import Image from "next/image";
import { P } from "./mdx-components/p";
import { Table } from "./mdx-components/table";
import { Img } from "./mdx-components/img";
import { Pre } from "./mdx-components/pre";
import Headings from "./mdx-components/heading";
import BlockQuote from "./mdx-components/blockquote";
import IFrame from "./mdx-components/iframe";
import EnrichedLink from "./mdx-components/a";
import { BadgeLink } from "./mdx-components/badge-link";
import { Li, Ul } from "./mdx-components/ul";
import PremiumBlock from "./mdx-components/premium-block";
import { ResourceGroupTitle } from "./mdx-components/resource-group-title";
import { DedicatedRoadmap } from "./mdx-components/dedicated-roadmap";

type MdRendererType = {
  children: React.ReactNode;
};

const components = {
  img: Img,
  table: Table,
  ...Headings,
  pre: Pre,

  p: P,
  ul: Ul,
  li: Li,
  code: Code,
  
  blockquote: BlockQuote,
  DedicatedRoadmap,
  PremiumBlock: PremiumBlock,
  BadgeLink: BadgeLink,
  ResourceGroupTitle: ResourceGroupTitle,
};

export default function MdRenderer(props: MdRendererType) {
  return (
    <ChakraProvider theme={roadmapTheme} resetCSS>
      {/* <MDXProvider components={MdxComponents}> */}
      <MDXProvider components={components}>{props.children}</MDXProvider>
    </ChakraProvider>
  );
}
