import { NextPage } from "next";
import { useRouter } from "next/router";
import React from "react";
import Layout from "../components/Layout";
import Meta from "../components/Meta";
import SearchPage from "../components/SearchPage";

/**
 * Page to search for menus
 */

const SearchMenuPage: NextPage = (): JSX.Element => {
  const { query, ...router } = useRouter();
  if (query?.query) router.replace(router.pathname, undefined, { shallow: true });

  return (
    <Layout hideHeaderSearchbar>
      <Meta title="Menüsuche" description="Suche ein bestimmtes Menü aus der Datenbank" />
      <SearchPage query={query?.query as string | undefined} />
    </Layout>
  );
};

export default SearchMenuPage;
