import { NextPage } from "next";
import { useRouter } from "next/router";
import React from "react";
import { Logger } from "../classes/Logger.class";
import Layout from "../components/Layout";
import Meta from "../components/Meta";
import SearchPage from "../components/SearchPage";
import { useSearchbar } from "../hooks/SearchbarContext";

/**
 * Page to search for menus
 */

const SearchMenuPage: NextPage = (): JSX.Element => {
  const { query, ...router } = useRouter();
  const { clearData } = useSearchbar();
  if (query?.clear) {
    Logger.info("Clearing search data");
    clearData();
    router.push(router.pathname, undefined, { shallow: true });
  }

  if (query?.query) router.push(router.pathname, undefined, { shallow: true });

  return (
    <Layout hideHeaderSearchbar>
      <Meta title="Menü suchen" description="Suche ein bestimmtes Menü aus der Datenbank" />
      <SearchPage query={query?.query as string | undefined} />
    </Layout>
  );
};

export default SearchMenuPage;
