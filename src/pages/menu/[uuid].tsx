import { GetStaticProps, GetStaticPropsContext, NextPage } from "next";
import { useRouter } from "next/router";
import React from "react";
import Layout from "../../components/Layout";
import MenuPage from "../../components/MenuPage";

/**
 * Page for a given menu
 */

const SpecificMenuPage: NextPage = (): JSX.Element => {
  const { query } = useRouter();
  const { uuid } = query;

  return (
    <Layout>
      <MenuPage />
    </Layout>
  );
};

export const getStaticProps: GetStaticProps = async (ctx: GetStaticPropsContext) => {
  return { props: {}, revalidate: 1 };
};

export default SpecificMenuPage;
