import axios, { AxiosResponse } from "axios";
import { GetStaticProps, GetStaticPropsContext, NextPage } from "next";
import { Menu } from "../classes/Menu.class";
import Home from "../components/Home";
import Layout from "../components/Layout";
import Meta from "../components/Meta";
import { MenuConstructor } from "../types/Menu.types";
import { apiUrl } from "../util/global.config";

interface HomePageProps {
  menus: Array<MenuConstructor>;
}

/**
 * Landing page of the website
 */

const HomePage: NextPage<HomePageProps> = ({ menus }): JSX.Element => {
  return (
    <Layout>
      <Meta title="Home" description="Home Seite mit den Top Menüs und einigen Statistiken" />
      <Home menus={menus.map((ctr: MenuConstructor) => new Menu(ctr))} />
    </Layout>
  );
};

/**
 * Fetch the today menu statically
 */

export const getStaticProps: GetStaticProps = async (ctx: GetStaticPropsContext) => {
  try {
    const response: AxiosResponse = await axios.get(`${apiUrl}/menu/date?date=1644458817619`); // fetch the menus of today
    return { props: { menus: response.data }, revalidate: 1 };
  } catch (e) {
    return { props: { menus: [] }, revalidate: 1 };
  }
};

export default HomePage;
