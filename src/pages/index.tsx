import axios, { AxiosResponse } from "axios";
import { GetStaticProps, GetStaticPropsContext, NextPage } from "next";
import { Menu } from "../classes/Menu.class";
import Home from "../components/HomePage";
import Layout from "../components/Layout";
import Meta from "../components/Meta";
import { MenuConstructor } from "../types/Menu.types";
import { apiUrl } from "../util/global.config";

interface HomePageProps {
  menus: Array<MenuConstructor>;
  count: number;
}

/**
 * Landing page of the website
 */

const HomePage: NextPage<HomePageProps> = ({ menus, count }): JSX.Element => {
  return (
    <Layout>
      <Meta keywords={["heute", "morgen"]} title="Home" description="Home Seite mit den Top Menüs und einigen Statistiken" />
      <Home count={count} menus={menus.map((ctr: MenuConstructor) => new Menu(ctr))} />
    </Layout>
  );
};

/**
 * Fetch the today menu statically
 */

export const getStaticProps: GetStaticProps = async (ctx: GetStaticPropsContext) => {
  try {
    const menuResponse: AxiosResponse = await axios.get(`${apiUrl}/menu/date`); // fetch the menus of today
    try {
      const countResponse: AxiosResponse = await axios.get(`${apiUrl}/stats/menu`);
      return { props: { menus: menuResponse.data, count: countResponse?.data?.amount || 0 }, revalidate: 1 };
    } catch (e) {
      return { props: { menus: menuResponse.data, count: 0 }, revalidate: 1 };
    }
  } catch (e) {
    return { props: { menus: [] }, revalidate: 1 };
  }
};

export default HomePage;
