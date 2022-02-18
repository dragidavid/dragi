import Navigation from "components/Navigation";
import Grid from "components/Grid";
import Footer from "components/Footer";

export default function Home() {
  return (
    <div className="flex h-screen flex-col">
      <Navigation />
      <Grid />
      <Footer />
    </div>
  );
}
