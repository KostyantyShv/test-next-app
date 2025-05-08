import React from "react";
import About from "../About/About";
import Announcements from "../Announcement/Annoucements";
import BulletPoints from "../BulletPoints/BulletPoints";
import Events from "../Events/Events";
import Links from "../Links/Links";
import PhotoGallery from "../PhotoGallery/PhotoGallery";
import PromoVideo from "../PromoVideo/PromoVideo";
import FAQ from "../QA/FAQ";

const General = () => {
  return (
    <div>
      <Announcements />
      <About />
      <FAQ />
      <BulletPoints />
      <PromoVideo />
      <PhotoGallery />
      <Events />
      <Links />
    </div>
  );
};

export default General;
