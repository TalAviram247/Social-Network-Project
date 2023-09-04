import { useAuth } from "../../contexts/auth/useAuth";
import "./about.css";
import Image from "./image.jpg";

export const About = () => {
  const { enforceLogin } = useAuth();
  enforceLogin();

  return (
    <div id="about">
      <div className="card">
        <h1>About us</h1>
        <p>
          Welcome to the virtual hub where connections flourish and
          relationships evolve. We believe in the power of bringing people
          together, transcending distances and fostering meaningful interactions
          in the digital age.
        </p>
        <br />
        <h3>Our Story</h3>
        <p>
          Born out of a passion for connectivity was founded with a clear
          vision: to create a platform that goes beyond the superficial and
          delves into the heart of human connections. In a world where
          technology often distances us, we&apos;re on a mission to use it to
          bridge the gaps instead.
        </p>
        <br />
        <h3>Our Mission</h3>
        <p>
          Our mission is simple yet profound - to provide a space where
          authenticity thrives. We&apos;re dedicated to facilitating genuine
          connections that have the potential to transform lives. From
          reconnecting with old friends to making new ones, and from sharing
          life&apos;s triumphs to finding support during challenges, we&apos;re
          here to make these experiences richer and more meaningful.
        </p>
        <br />
        <h3>What Sets Us Apart</h3>
        <p>
          Authenticity First: We&apos;re committed to creating an environment
          where you can be your true self. No filters, no pretenses - just you.
          Privacy Empowered: Your data privacy is paramount. We&apos;ve
          implemented cutting-edge security measures to ensure your information
          stays in your control. Community Focus: We are not just a platform;
          it&apos;s a community of like-minded individuals who value real
          connections. Meaningful Engagement: From thought-provoking discussions
          to shared hobbies, we encourage interactions that leave you feeling
          enriched.
        </p>
        <br />
        <br />
        <img src={Image} alt="about-1" />
      </div>
    </div>
  );
};
