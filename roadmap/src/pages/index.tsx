import Head from 'next/head'
import Image from 'next/image'
import { Inter } from '@next/font/google'
import { GlobalHeader}  from "../components/global-header";
import styles from '@/styles/Home.module.css'
import { getAllGuides, GuideType } from "../lib/guide";
import { getAllVideos, VideoType } from "../lib/video";
import { getFeaturedRoadmaps, RoadmapType } from "../lib/roadmap";
import { PageWrapper } from "../components/page-wrapper";

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