import { getTranslations } from 'next-intl/server';
import Hero from "@/components/Hero";
import IntroBand from "@/components/IntroBand";
import MethodsSection from "@/components/MethodsSection";
import MethodCard from "@/components/MethodCard";
import SignatureCard from "@/components/SignatureCard";
import Divider from "@/components/Divider";
import ReformerCard from "@/components/ReformerCard";
import TariffGrid from "@/components/TariffGrid";
import TariffCard from "@/components/TariffCard";
import DestinationCard from "@/components/DestinationCard";
import EditorialQuote from "@/components/EditorialQuote";
import PhotoGallery from "@/components/PhotoGallery";
import Footer from "@/components/Footer";

export default async function Home() {
  const t = await getTranslations('home');
  const tMethods = t.raw('methods');
  const tTariffs = t.raw('tariffs');
  const tDestinations = t.raw('destinations');

  return (
    <main className="flex flex-col w-full">
      {/* 01 - Hero Section */}
      <Hero />

      {/* 02 - Intro Band */}
      <IntroBand />

      {/* 03 - Methods Section */}
      <MethodsSection id="pratiques">
        {/* Method 01 */}
        <MethodCard 
          number="01"
          title={tMethods.method1.title}
          italicWord={tMethods.method1.italicWord}
          intensityLabel={tMethods.labels.intensity}
          intensityValue={tMethods.method1.intensity}
          eyebrow={tMethods.method1.eyebrow}
          description={tMethods.method1.description}
          bullets={tMethods.method1.bullets}
          benefits={tMethods.method1.benefits}
          benefitsLabel={tMethods.labels.benefits}
        />

        {/* Method 02 - Signature */}
        <SignatureCard 
          number="02"
          title={tMethods.method2.title}
          italicWord={tMethods.method2.italicWord}
          signatureLabel={tMethods.labels.signature}
          timelineLabel={tMethods.labels.timeline}
          description={tMethods.method2.description}
          phases={tMethods.method2.phases}
        />

        {/* Method 03 */}
        <MethodCard 
          number="03"
          title={tMethods.method3.title}
          italicWord={tMethods.method3.italicWord}
          intensityLabel={tMethods.labels.intensity}
          intensityValue={tMethods.method3.intensity}
          eyebrow={tMethods.method3.eyebrow}
          description={tMethods.method3.description}
          bullets={tMethods.method3.bullets}
          benefits={tMethods.method3.benefits}
          benefitsLabel={tMethods.labels.benefits}
        />

        {/* Method 04 */}
        <MethodCard 
          number="04"
          title={tMethods.method4.title}
          italicWord={tMethods.method4.italicWord}
          intensityLabel={tMethods.labels.intensity}
          intensityValue={tMethods.method4.intensity}
          eyebrow={tMethods.method4.eyebrow}
          description={tMethods.method4.description}
          bullets={tMethods.method4.bullets}
          benefits={tMethods.method4.benefits}
          benefitsLabel={tMethods.labels.benefits}
        />

        {/* Method 05 */}
        <MethodCard 
          number="05"
          title={tMethods.method5.title}
          italicWord={tMethods.method5.italicWord}
          intensityLabel={tMethods.labels.intensity}
          intensityValue={tMethods.method5.intensity}
          eyebrow={tMethods.method5.eyebrow}
          description={tMethods.method5.description}
          bullets={tMethods.method5.bullets}
          benefits={tMethods.method5.benefits}
          benefitsLabel={tMethods.labels.benefits}
        />

        <Divider />

        <ReformerCard />
      </MethodsSection>

      {/* 04 - Tariffs Section */}
      <TariffGrid id="tarifs">
        <TariffCard 
          index="01"
          title={tTariffs.items.lagree}
          price1={{ label: tTariffs.singleSession, value: "190 €" }}
          price2={{ label: tTariffs.pack10, value: "1300 €" }}
        />
        <TariffCard 
          index="02"
          title={tTariffs.items.sculpt}
          price1={{ label: tTariffs.singleSession, value: "190 €" }}
          price2={{ label: tTariffs.pack10, value: "1300 €" }}
        />
        <TariffCard 
          index="03"
          title={tTariffs.items.foundation}
          price1={{ label: tTariffs.singleSession, value: "150 €" }}
          price2={{ label: tTariffs.pack10, value: "1100 €" }}
        />
        <TariffCard 
          index="04"
          title={tTariffs.items.pilatesSculpt}
          price1={{ label: tTariffs.singleSession, value: "160 €" }}
          price2={{ label: tTariffs.pack10, value: "1200 €" }}
        />
        <TariffCard 
          index="05"
          title={tTariffs.items.stretch}
          price1={{ label: tTariffs.singleSession, value: "150 €" }}
          price2={{ label: tTariffs.pack10, value: "1100 €" }}
        />
        <TariffCard 
          variant="inverted"
          title={tTariffs.pack10}
          highlight={tTariffs.validity}
          price1={{ label: "", value: "" }}
        />
      </TariffGrid>

      {/* 05 - Destinations Section */}
      <section id="destinations" className="flex flex-col lg:flex-row w-full overflow-hidden border-t border-burgundy-deep/10">
        <DestinationCard 
          season={tDestinations.riviera.season}
          title={tDestinations.riviera.title}
          italicWord={tDestinations.riviera.italicWord}
          locations={["Monaco", "Nice", "Cannes", "Saint-Tropez"]}
          description={tDestinations.riviera.description}
        />
        <DestinationCard 
          season={tDestinations.stbarth.season}
          title={tDestinations.stbarth.title}
          italicWord={tDestinations.stbarth.italicWord}
          locations={["Gustavia", "St-Jean", "Flamands", "Lorient"]}
          description={tDestinations.stbarth.description}
        />
      </section>

      {/* 06 - Atmosphere Gallery (Unified) */}
      <PhotoGallery />

      {/* 07 - Final Recommendation / Editorial Quote */}
      <EditorialQuote />

      {/* 08 - Footer */}
      <Footer id="contact" />
    </main>
  );
}
