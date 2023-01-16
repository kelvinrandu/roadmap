import Head from 'next/head'
import Image from 'next/image'
import { Inter } from '@next/font/google'
import { GlobalHeader}  from "../components/global-header";
import styles from '@/styles/Home.module.css'
import { getAllGuides, GuideType } from "../lib/guide";
import { getAllVideos, VideoType } from "../lib/video";
import Helmet from "../components/helmet";
import { getFeaturedRoadmaps, RoadmapType } from "../lib/roadmap";
import { PageWrapper } from "../components/page-wrapper";
import { Box, Container, Heading, Text } from "@chakra-ui/react";
import { FeaturedRoadmapsList } from "../components/home/featured-roadmap-list";

const inter = Inter({ subsets: ['latin'] })
type HomeProps = {
  roadmaps: RoadmapType[];
  guides: GuideType[];
  videos: VideoType[];
};
export default function Home(props: HomeProps) {
    const { roadmaps, guides, videos } = props;
  return (
    <PageWrapper>
      <GlobalHeader variant={"transparent"} />
      <Helmet title="Developer Roadmaps" />
      <Box>
        <Container maxW="container.md" pb="90px">
          <Box py={["23px", "23px", "35px"]} color="gray.200">
            <Heading
              color="gray.50"
              fontSize={["22px", "22px", "28px"]}
              mb={["8px", "8px", "15px"]}
            >
              Hey there! 👋
            </Heading>
            <Text fontSize={["14px", "14px", "16px"]} mb="10px">
              <Text fontWeight={500} as="span">
                roadmap.sh
              </Text>{" "}
              is a community effort to create roadmaps, guides and other
              educational content to help guide the developers in picking up the
              path and guide their learnings.
            </Text>
          </Box>

          <FeaturedRoadmapsList
            roadmaps={roadmaps.filter((roadmap) => roadmap.type === "role")}
            title={"Role Based"}
          />

          <FeaturedRoadmapsList
            roadmaps={roadmaps.filter((roadmap) => roadmap.type === "tool")}
            title={"Skill Based"}
          />
        </Container>
      </Box>
      
    </PageWrapper>
  );
}
export async function getStaticProps() {
  return {
    props: {
      roadmaps: getFeaturedRoadmaps(),
      guides: getAllGuides(10),
      videos: getAllVideos(10),
    },
  };
}