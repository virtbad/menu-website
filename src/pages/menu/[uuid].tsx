import { GetStaticProps, GetStaticPropsContext, NextPage } from "next";
import { useRouter } from "next/router";
import React from "react";

/**
 * Page for a given menu
 */

const MenuPage: NextPage = (): JSX.Element => {
  const { query } = useRouter();
  const { uuid } = query;

  return <></>;
};

export const getStaticProps: GetStaticProps = async (ctx: GetStaticPropsContext) => {
  return { props: {}, revalidate: 1 };
};

export default MenuPage;
