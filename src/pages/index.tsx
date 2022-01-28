import { GetStaticProps, GetStaticPropsContext, NextPage } from "next";
import Home from "../components/Home";
import Layout from "../components/Layout";

/**
 * Landing page of the website
 */

const HomePage: NextPage = (): JSX.Element => {
  return (
    <Layout>
      <Home />
    </Layout>
  );
};

export const getStaticProps: GetStaticProps = async (ctx: GetStaticPropsContext) => {
  //get today's menu and add it to props
  return { props: {}, revalidate: 1 };
};

export default HomePage;
