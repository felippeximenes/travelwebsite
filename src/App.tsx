import { SkipLink } from "./components/SkipLink";
import { Nav } from "./components/Nav";
import { Hero } from "./components/Hero";
import { Destinations } from "./components/Destinations";
import { TripPackages } from "./components/TripPackages";
import { Gallery } from "./components/Gallery";
import { Subscribe } from "./components/Subscribe";
import { Footer } from "./components/Footer";

export default function App() {
  return (
    <>
      <SkipLink />
      <Nav />
      <Hero />
      <Destinations />
      <TripPackages />
      <Gallery />
      <Subscribe />
      <Footer />
    </>
  );
}
