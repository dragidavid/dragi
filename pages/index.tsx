import Container from "components/Container";
import Grid from "components/Grid";
import Footer from "components/Footer";

import type { NextPage } from "next";

const Home: NextPage = () => {
  return (
    <Container>
      <Grid />
      <Footer />
    </Container>
  );
};

export default Home;
