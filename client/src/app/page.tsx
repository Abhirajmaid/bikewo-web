import { Hero } from "@/components/home/Hero";
import { LovedBy } from "@/components/home/LovedBy";
import { Glance } from "@/components/home/Glance";
import { Ecosystem } from "@/components/home/Ecosystem";
import { Divisions } from "@/components/home/Divisions";
import { Subsidiaries } from "@/components/home/Subsidiaries";
import { ShramSainik } from "@/components/home/ShramSainik";
import { Sustainability } from "@/components/home/Sustainability";
import { Stories } from "@/components/home/Stories";
import { Investors } from "@/components/home/Investors";
import { News } from "@/components/home/News";
import { Careers } from "@/components/home/Careers";
import { ContactCTA } from "@/components/home/ContactCTA";

export default function HomePage() {
  return (
    <>
      <Hero />
      <LovedBy />
      <Glance />
      <Ecosystem />
      <Divisions />
      <Subsidiaries />
      <ShramSainik />
      <Sustainability />
      <Stories />
      <Investors />
      <News />
      <Careers />
      <ContactCTA />
    </>
  );
}
