import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import { useRouter } from "next/router";
import React from "react";
import useSWR from "swr";
import Fallback from "../../../components/Fallback";
import Layout from "../../../components/Layout";
import MenuPage from "../../../components/MenuPage";
import { fetcher } from "../../../util/global.config";

/**
 * Page for a given menu
 */

const SpecificMenuPage: NextPage = (): JSX.Element => {
  const { query, ...router } = useRouter();
  const { uuid } = query;

  if (router.isFallback) return <Fallback />;

  const {} = useSWR(false && uuid && "", fetcher); //fetch specific menu [check for existance]

  return (
    <Layout>
      <MenuPage />
    </Layout>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  return { props: {}, revalidate: 1 };
};

export const getStaticPaths: GetStaticPaths = async () => {
  //fetch top 100 menus to staticly prerender
  return { paths: [], fallback: true };
};

export default SpecificMenuPage;
