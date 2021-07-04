import React, { FC } from "react";

import Layout from "../components/layout";
import SEO from "../components/seo";

const IndexPage: FC = () => {
  return (
    <Layout>
      <SEO title="Home" />
      <h1>Hello, World</h1>
      <p>Welcome to your new Gatsby site.</p>
      <p>Now go build something great.</p>
    </Layout>
  );
};

export default IndexPage;
