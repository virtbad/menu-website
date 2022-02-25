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
      <Meta image={`${apiUrl}/static/all/og`} title={"Alle Menüs"} keywords={"Alle Menüs"} description={"Sieh dir alle bisherigen Menüs an"} />
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
    return { props: { menus: menuResponse.data }, revalidate: 1 };
  } catch (e) {
    return { props: { menus: [] }, revalidate: 1 };
  }
};

export default AllMenuPage;