import type { NextPage } from "next";

import Navigation from "components/Navigation";
import Grid from "components/Grid";
import Footer from "components/Footer";

const Home: NextPage = () => {
  return (
    <div className="flex h-screen flex-col bg-gray-100 dark:bg-gray-900">
      <Navigation />
      <Grid />
      <Footer />
    </div>
  );
};

export default Home;
