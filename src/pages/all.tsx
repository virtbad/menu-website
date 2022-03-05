import axios, { AxiosResponse } from "axios";
import { GetStaticProps, GetStaticPropsContext, NextPage } from "next";
import React from "react";
import { Menu } from "../classes/Menu.class";
import AllPage from "../components/AllPage";
import Layout from "../components/Layout";
import Meta from "../components/Meta";
import { MenuConstructor } from "../types/Menu.types";
import { apiUrl } from "../util/global.config";

interface AllMenuPageProps {
  menus: Array<MenuConstructor>;
}

const AllMenuPage: NextPage<AllMenuPageProps> = ({ menus = [] }): JSX.Element => {
  return (
    <Layout>
      <Meta image={`${apiUrl}/static/og/all`} title={"Alle Menüs"} keywords={"Alle Menüs"} description={`Schau dir alle bisherigen Menüs der Mensa der ${process.env.NEXT_PUBLIC_LOCATION} an und finde deine Lieblingsmenüs`} />
      <AllPage menus={menus.map((ctr: MenuConstructor) => new Menu(ctr))} />
    </Layout>
  );
};

/**
 * Fetch the first page statically
 */

export const getStaticProps: GetStaticProps = async (ctx: GetStaticPropsContext): Promise<any> => {
  try {
    const menuResponse: AxiosResponse = await axios.get(`${apiUrl}/menu/all`);
    return { props: { menus: menuResponse.data }, revalidate: 10 };
  } catch (e) {
    return { props: { menus: [] }, revalidate: 10 };
  }
};

export default AllMenuPage;
