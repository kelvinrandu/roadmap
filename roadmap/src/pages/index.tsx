import React, { useEffect, useContext } from "react";
import Head from "next/head";
import Image from "next/image";
import { Inter } from "@next/font/google";
import { GlobalHeader } from "../components/global-header";

import { getAllGuides, GuideType } from "../lib/guide";
import { getAllVideos, VideoType } from "../lib/video";
import { DimmedMore } from "../components/dimmed-more";
import { Footer } from "../components/footer";
import { LinksListItem } from "../components/links-list-item";
import Helmet from "../components/helmet";
import { VideoIcon } from "../components/icons/video-icon";
import { LinksList } from "../components/links-list";
import { getFeaturedRoadmaps, RoadmapType } from "../lib/roadmap";
import { PageWrapper } from "../components/page-wrapper";
import { AuthContext } from "../context/AuthContext";
import Login from "../components/Login";
import { Center } from "@chakra-ui/layout";
import { Box, Container, Heading, Text, Flex, Spinner } from "@chakra-ui/react";
import { FeaturedRoadmapsList } from "../components/home/featured-roadmap-list";
import Router from "next/router";

const inter = Inter({ subsets: ["latin"] });
type HomeProps = {
  roadmaps: RoadmapType[];
  guides: GuideType[];
  videos: VideoType[];
};
export default function Home(props: HomeProps) {
  const { roadmaps, guides, videos } = props;
  const user = useContext(AuthContext);
  // useEffect(() => {
  //   if (user) Router.push("/dashboard");
  // }, [user]);
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
            title={"Free courses"}
          />

          <FeaturedRoadmapsList
            roadmaps={roadmaps.filter((roadmap) => roadmap.type === "tool")}
            title={"Paid courses"}
          />
        </Container>
      </Box>
      <Box bg="white">
        <Container maxW="container.md">
          <Box pt="110px" mb={["10px", "15px", "20px"]}>
            <Heading
              color="green.500"
              fontSize={["20px", "20px", "25px"]}
              mb="5px"
            >
              Video Explanations
            </Heading>
          </Box>

          <LinksList>
            {videos.map((video) => (
              <LinksListItem
                target={"_blank"}
                key={video.id}
                href={video.youtubeLink!}
                badgeText={
                  video.isNew
                    ? `NEW · ${new Date(video.createdAt).toLocaleDateString(
                        "en-us",
                        { month: "long" }
                      )}`
                    : ""
                }
                hideSubtitleOnMobile
                title={video.title}
                subtitle={video.duration}
                icon={
                  <VideoIcon
                    style={{
                      marginRight: "7px",
                      width: "18px",
                      height: "18px",
                      color: "#9c9c9c",
                    }}
                  />
                }
              />
            ))}
            <DimmedMore href="/watch" text={"View all Videos"} />
          </LinksList>
        </Container>
      </Box>
      <Box pb="80px" bg="white">
        <Container maxW="container.md" position="relative">
          <Box pt="40px" mb="20px">
            <Heading color="green.500" fontSize="25px" mb="5px">
              Guides
            </Heading>
          </Box>

          <LinksList>
            {guides.map((guide) => (
              <LinksListItem
                key={guide.id}
                href={`/guides/${guide.id}`}
                title={guide.title}
                badgeText={
                  guide.isNew
                    ? `NEW · ${new Date(guide.createdAt).toLocaleDateString(
                        "en-us",
                        { month: "long" }
                      )}`
                    : ""
                }
                subtitle={`${guide?.type
                  ?.charAt(0)
                  .toUpperCase()}${guide?.type?.slice(1)}`}
              />
            ))}
            <DimmedMore href={"/guides"} text="View all Guides" />
          </LinksList>
        </Container>
      </Box>
      <Footer />
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
