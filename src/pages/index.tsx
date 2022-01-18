import { GetStaticProps, GetStaticPropsContext, NextPage } from "next";
import Layout from "../components/Layout";
import MenuCard from "../components/system/MenuCard";

/**
 * Landing page of the website
 */

const HomePage: NextPage = (): JSX.Element => {
  return (
    <Layout>
      <MenuCard uuid="asdfasdf" variant={"big"} />
    </Layout>
  );
};

export const getStaticProps: GetStaticProps = async (ctx: GetStaticPropsContext) => {
  //get today's menu and add it to props
  return { props: {}, revalidate: 1 };
};

export default HomePage;
