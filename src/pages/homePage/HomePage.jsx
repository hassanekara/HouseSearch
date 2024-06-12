import Footer from "../../components/Footer";
import Form from "../../components/Form"
import HouseCards from "../../components/HouseCards";
import AboutSection from "./AboutSection";
import ContactPage from "./ContactPage";

function HomePage() {
  return (
    <div>
      <section>
        <Form />
      </section>
      <section>
        <HouseCards />
      </section>
      <section>
        <AboutSection />
      </section>
      <section>
        <ContactPage />
      </section>
      <section>
        <Footer/>
      </section>
    </div>
  );
}

export default HomePage
