import { NextPage } from "next";
import React from "react";
import Layout from "../components/Layout";
import Meta from "../components/Meta";
import SearchPage from "../components/SearchPage";

/**
 * Page to search for menus
 */

const SearchMenuPage: NextPage = (): JSX.Element => {
  return (
    <Layout hideHeaderSearchbar>
      <Meta title="Menü suchen" description="Suche ein bestimmtes Menü aus der Datenbank" />
      <SearchPage />
    </Layout>
  );
};

export default SearchMenuPage;
