import Footer from "../../components/Footer";
import Form from "../../components/Form"
import HouseCards from "../../components/HouseCards";
import Navigation from "../../components/Navigation";
import AboutSection from "./AboutSection";
import ContactPage from "./ContactPage";

function HomePage() {
  return (
    <div>
        <Navigation />

      <section id="home">
        <Form />
      </section>
      <section id="services">
        <HouseCards />
      </section>
      <section id="about">
        <AboutSection />
      </section>
      <section id="contact">
        <ContactPage />
      </section>
      <section>
        <Footer/>
      </section>
    </div>
  );
}

export default HomePage
