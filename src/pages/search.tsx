import { NextPage } from "next";
import { useRouter } from "next/router";
import React from "react";
import Layout from "../components/Layout";
import Meta from "../components/Meta";
import SearchPage from "../components/SearchPage";
import { apiUrl } from "../util/global.config";

/**
 * Page to search for menus
 */

const SearchMenuPage: NextPage = (): JSX.Element => {
  const { query, ...router } = useRouter();
  if (query?.query) router.replace(router.pathname, undefined, { shallow: true });

  return (
    <Layout hideHeaderSearchbar>
      <Meta image={`${apiUrl}/static/og/search`} keywords={"suche"} title="Menüsuche" description={`Durchsuche alle Menüs der Mensa der ${process.env.NEXT_PUBLIC_LOCATION} und finde Statistiken zu deinen Lieblingsmenüs`} />
      <SearchPage query={query?.query as string | undefined} />
    </Layout>
  );
};

export default SearchMenuPage;
