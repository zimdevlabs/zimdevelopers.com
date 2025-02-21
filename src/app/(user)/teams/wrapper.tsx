import TeamsCTA from "@/components/teams/teams-cta";
import TeamsFAQ from "@/components/teams/teams-faq";
import TeamsFeatured from "@/components/teams/teams-featured";
import TeamsHero from "@/components/teams/teams-hero";

export default function TeamsWrapper() {
  return (
    <>
      <TeamsHero />
      <TeamsFeatured />
      <TeamsCTA />
      <TeamsFAQ />
    </>
  );
}
