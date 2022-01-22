import { GetStaticProps, GetStaticPropsContext, NextPage } from "next";
import Layout from "../components/Layout";
import Autocomplete from "../components/system/Autocomplete";
import Input from "../components/system/Input";
import Link from "../components/system/Link";
import Select from "../components/system/Select";

/**
 * Landing page of the website
 */

const HomePage: NextPage = (): JSX.Element => {
  return (
    <Layout>
      {/*  <MenuCard uuid={"uuid"} variant={"big"} />
      <MenuCard uuid={"uuid"} variant={"small"} /> */}
      <Input placeholder={"asdasdf"} readonly label={"Test"} />
      <Select
        label={"Test"}
        values={[
          { value: "asdf", label: "adsf" },
          { value: "bruuh", label: "br" },
        ]}
        multiple
        placeholder={"asdasdf"}
        onMultipleSelect={console.log}
      />
      <Autocomplete options={["asdfasdf", "test"]} />
      <Link href={"/"} children={"Hello"} />
    </Layout>
  );
};

export const getStaticProps: GetStaticProps = async (ctx: GetStaticPropsContext) => {
  //get today's menu and add it to props
  return { props: {}, revalidate: 1 };
};

export default HomePage;
