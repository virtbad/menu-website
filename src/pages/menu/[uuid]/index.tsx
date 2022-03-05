import axios, { AxiosResponse } from "axios";
import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import { useRouter } from "next/router";
import React from "react";
import { Menu } from "../../../classes/Menu.class";
import Fallback from "../../../components/Fallback";
import Layout from "../../../components/Layout";
import MenuPage from "../../../components/MenuPage";
import Meta from "../../../components/Meta";
import { MenuConstructor } from "../../../types/Menu.types";
import { apiUrl } from "../../../util/global.config";

interface SpecificMenuPageProps {
  menu: MenuConstructor;
}

/**
 * Page for a given menu
 */

const SpecificMenuPage: NextPage<SpecificMenuPageProps> = ({ menu }): JSX.Element => {
  const router = useRouter();

  if (router.isFallback) return <Fallback />;

  return (
    <Layout>
      <Meta noindex title={menu?.title || "Menü"} description={"Sieh dir ein bestimmtes Menü etwas genauer an"} />
      <MenuPage menu={router.isFallback ? null : new Menu(menu)} />
    </Layout>
  );
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  try {
    const response: AxiosResponse = await axios.get(`${apiUrl}/menu/${params.uuid}`); // fetch the specific menu
    return { props: { menu: response.data }, revalidate: 10 };
  } catch (e) {
    return { props: { menu: null }, notFound: true, revalidate: 10 };
  }
};

export const getStaticPaths: GetStaticPaths = async () => {
  let todayMenus: Array<MenuConstructor> = [];
  let upcomingMenus: Array<MenuConstructor> = [];

  // prerender the current and upcoming menus at build time

  try {
    const menuResponse: AxiosResponse = await axios.get(`${apiUrl}/menu/date`); // fetch the menus of today
    todayMenus = menuResponse.data;
  } catch (e) {}
  try {
    const upcomingResponse: AxiosResponse = await axios.get(`${apiUrl}/menu/upcoming`);
    upcomingMenus = upcomingResponse.data;
  } catch (e) {}

  return { paths: [...todayMenus, ...upcomingMenus].map(({ id }) => `/menu/${id}`), fallback: true };
};

export default SpecificMenuPage;
