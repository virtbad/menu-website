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
  upcoming: Array<MenuConstructor>;
}

/**
 * Landing page of the website
 */

const HomePage: NextPage<HomePageProps> = ({ menus = [], count = 0, upcoming = [] }): JSX.Element => {
  return (
    <Layout>
      <Meta image={`${apiUrl}/static/og/home`} keywords={["heute", "morgen"]} title={"Home"} description={`Sieh dir heutige und zukünftige Menüs der Mensa der ${process.env.NEXT_PUBLIC_LOCATION} gemeinsam mit einigen Statistiken an`} />
      <Home upcoming={upcoming.map((ctr: MenuConstructor) => new Menu(ctr))} count={count} menus={menus.map((ctr: MenuConstructor) => new Menu(ctr))} />
    </Layout>
  );
};

/**
 * Fetch the today menu statically
 */

export const getStaticProps: GetStaticProps = async (ctx: GetStaticPropsContext) => {
  let todayMenus: Array<MenuConstructor> = [];
  let menuCount: number = 0;
  let upcomingMenus: Array<MenuConstructor> = [];

  try {
    const menuResponse: AxiosResponse = await axios.get(`${apiUrl}/menu/date`); // fetch the menus of today
    todayMenus = menuResponse.data;
  } catch (e) {}
  try {
    const countResponse: AxiosResponse = await axios.get(`${apiUrl}/stats/menu`); // get total amount of menus
    menuCount = countResponse.data?.amount || 0;
  } catch (e) {}
  try {
    const upcomingResponse: AxiosResponse = await axios.get(`${apiUrl}/menu/upcoming`);
    upcomingMenus = upcomingResponse.data;
  } catch (e) {}

  return { props: { menus: todayMenus, count: menuCount, upcoming: upcomingMenus }, revalidate: 60 };
};

export default HomePage;
