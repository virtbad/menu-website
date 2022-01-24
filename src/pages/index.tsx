import HomeRepairServiceOutlined from "@mui/icons-material/ArrowForward";
import { GetStaticProps, GetStaticPropsContext, NextPage } from "next";
import Layout from "../components/Layout";
import { Autocomplete, Button, Input, Link, Select } from "../components/system";

/**
 * Landing page of the website
 */

const HomePage: NextPage = (): JSX.Element => {
  return (
    <Layout>
      {/*  <MenuCard uuid={"uuid"} variant={"big"} />
      <MenuCard uuid={"uuid"} variant={"small"} /> */}
      <Input placeholder={"asdasdf"} label={"Test"} InputProps={{ endAdornment: "asdf" }} />
      <Select
        label={"Test"}
        values={[
          { value: "asdf", label: "adsf" },
          { value: "bruuh", label: "br" },
        ]}
        multiple
        placeholder={"asdasdf"}
      />
      <Autocomplete options={["asdfasdf", "test"]} />
      <Link href={"/home"} children={"Hello"} />
      <Button children={"Test"} endIcon={<HomeRepairServiceOutlined />} />
    </Layout>
  );
};

export const getStaticProps: GetStaticProps = async (ctx: GetStaticPropsContext) => {
  //get today's menu and add it to props
  return { props: {}, revalidate: 1 };
};

export default HomePage;
