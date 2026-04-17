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
import Footer from "@/components/Footer";

/**
 * Candice Pilates Home Page
 * Single-page orchestration of all design sections.
 */
export default function Home() {
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
          title="Lagree Microformer"
          italicWord="Microformer"
          intensityLabel="MAXIMAL"
          eyebrow="INTENSITÉ MAXIMALE · RÉSULTATS VISIBLES"
          description={[
            "La méthode Lagree est une révolution du fitness à haute intensité, conçue par Sébastien Lagree à Los Angeles.",
            "Pratiquée sur le Microformer, cette session se concentre sur le temps sous tension pour une brûlure calorique post-séance exceptionnelle."
          ]}
          bullets={[
            "Machine Microformer transportée et installée à domicile",
            "Séances de 40 à 55 minutes",
            "Résultats visibles dès 4 à 6 séances",
            "Idéal pour sculpter, tonifier et améliorer l'endurance"
          ]}
          benefits={[
            "Renforcement musculaire global",
            "Silhouette affinée et dessinée",
            "Cardio intégré sans impact",
            "Gainage profond du core",
            "Brûlure calorique prolongée",
            "Posture et alignement optimisés"
          ]}
        />

        {/* Method 02 - Signature */}
        <SignatureCard 
          number="02"
          title="Sculpt & Lagree Exclusif"
          italicWord="Exclusif"
          description="Notre session signature de 55 minutes combine le meilleur des deux mondes pour un travail complet et méticuleux."
          phases={[
            {
              eyebrow: "PHASE 1 · 25 MIN",
              title: "Lagree Microformer",
              description: "Stimulation musculaire profonde et cardio sans impact."
            },
            {
              eyebrow: "PHASE 2 · 25 MIN",
              title: "Pilates Sculpt bas du corps",
              description: "Travail ciblé pour des jambes affinées et une silhouette sculptée."
            },
            {
              eyebrow: "PHASE 3 · 5 MIN",
              title: "Cool Down",
              description: "Retour au calme et étirements régénérateurs."
            }
          ]}
        />

        {/* Method 03 */}
        <MethodCard 
          number="03"
          title="Pilates Sculpt & Flow"
          italicWord="Flow"
          intensityLabel="ESSENTIEL"
          eyebrow="HARMONIE · SCULPT · FLUIDITÉ"
          description={[
            "Un cours dynamique qui allie la précision du Pilates au cardio léger et au flow.",
            "L’accent est mis sur l’enchaînement fluide des mouvements pour sculpter le corps tout en améliorant la souplesse."
          ]}
          bullets={[
            "Utilisation de petits accessoires (ballons, cercles, élastiques)",
            "Alternance entre tonification et étirements actifs",
            "Travail sur la fluidité et le rythme"
          ]}
          benefits={[
            "Silhouette harmonieuse",
            "Amélioration de la posture",
            "Souplesse accrue",
            "Reconnexion corps-esprit",
            "Énergie revitalisée",
            "Renforcement des muscles profonds"
          ]}
        />

        {/* Method 04 */}
        <MethodCard 
          number="04"
          title="Prenatal & Postnatal Pilates"
          italicWord="Postnatal"
          intensityLabel="ESSENTIEL"
          eyebrow="BIEN-ÊTRE · ACCOMPAGNEMENT · SÉCURITÉ"
          description={[
            "Des séances adaptées pour accompagner la femme enceinte ou la nouvelle maman dans sa pratique physique."
          ]}
          bullets={[
            "Exercices sécurisés et validés scientifiquement",
            "Focus sur le périnée et la sangle abdominale profonde",
            "Soulagement des maux de dos liés à la grossesse"
          ]}
          benefits={[
            "Récupération post-partum optimisée",
            "Renforcement du plancher pelvien",
            "Réduction des tensions dorsales",
            "Gestion du souffle et relaxation",
            "Maintien de la forme physique",
            "Confiance en son corps"
          ]}
        />

        {/* Method 05 */}
        <MethodCard 
          number="05"
          title="Senior Pilates / Mobilité"
          italicWord="Mobilité"
          intensityLabel="ESSENTIEL"
          eyebrow="LONGÉVITÉ · MOBILITÉ · ÉQUILIBRE"
          description={[
            "Conçu pour les séniors ou toute personne souhaitant améliorer sa mobilité articulaire et son équilibre."
          ]}
          bullets={[
            "Travail sur l'amplitude articulaire",
            "Exercices d'équilibre et de prévention des chutes",
            "Renforcement musculaire doux et fonctionnel"
          ]}
          benefits={[
            "Autonomie renforcée",
            "Articulations plus souples",
            "Meilleur équilibre",
            "Réduction des raideurs matinales",
            "Amélioration de la vitalité",
            "Lien social et bien-être"
          ]}
        />

        <Divider />

        <ReformerCard />
      </MethodsSection>

      {/* 04 - Tariffs Section */}
      <TariffGrid id="tarifs">
        <TariffCard 
          index="01"
          title="Lagree Microformer"
          price1={{ label: "Séance unique", value: "190 €" }}
          price2={{ label: "Forfait 10 séances", value: "1300 €" }}
        />
        <TariffCard 
          index="02"
          title="Sculpt & Lagree"
          price1={{ label: "Séance unique", value: "190 €" }}
          price2={{ label: "Forfait 10 séances", value: "1300 €" }}
        />
        <TariffCard 
          index="03"
          title="Pilates Foundation"
          price1={{ label: "Séance unique", value: "150 €" }}
          price2={{ label: "Forfait 10 séances", value: "1100 €" }}
        />
        <TariffCard 
          index="04"
          title="Pilates Sculpt"
          price1={{ label: "Séance unique", value: "160 €" }}
          price2={{ label: "Forfait 10 séances", value: "1200 €" }}
        />
        <TariffCard 
          index="05"
          title="Stretch & Restore"
          price1={{ label: "Séance unique", value: "150 €" }}
          price2={{ label: "Forfait 10 séances", value: "1100 €" }}
        />
        <TariffCard 
          variant="inverted"
          title="Forfaits"
          highlight="Forfaits valables 3 mois à compter de la première séance."
          price1={{ label: "", value: "" }} // Not used in inverted variant but typed
        />
      </TariffGrid>

      {/* 05 - Destinations Section */}
      <section id="destinations" className="flex flex-col lg:flex-row w-full overflow-hidden border-t border-burgundy-deep/10">
        <DestinationCard 
          season="Mai — Octobre"
          title="French Riviera"
          italicWord="Riviera"
          locations={["Monaco", "Nice", "Cannes", "Saint-Tropez"]}
          description="Intervention à votre domicile, dans votre villa ou sur votre yacht. Un accompagnement sur-mesure dans les lieux les plus prestigieux de la Côte d'Azur."
        />
        <DestinationCard 
          season="Novembre — Avril"
          title="Saint-Barth"
          italicWord="Barth"
          locations={["Gustavia", "St-Jean", "Flamands", "Lorient"]}
          description="Candice vous accompagne durant la saison hivernale pour vos séances privées dans le cadre exclusif de votre villa à Saint-Barthélemy."
        />
      </section>

      {/* 06 - Final Recommendation / Editorial Quote */}
      <EditorialQuote />

      {/* 07 - Footer */}
      <Footer id="contact" />
    </main>
  );
}
