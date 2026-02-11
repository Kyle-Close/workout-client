import { Box, Container } from "@mui/material";
import { HeroSection } from "./HeroSection";
import { FeaturesSection } from "./FeaturesSection";
import { HowItWorksSection } from "./HowItWorksSection";
import { CTASection } from "./CTASection";

export function LandingPage() {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        background:
          "linear-gradient(180deg, rgba(15,15,20,1) 0%, rgba(20,20,30,1) 50%, rgba(15,15,20,1) 100%)",
        overflow: "hidden",
      }}
    >
      <Container maxWidth="lg" sx={{ p: { xs: 2, sm: 3 } }}>
        <HeroSection />
        <FeaturesSection />
        <HowItWorksSection />
        <CTASection />
      </Container>
    </Box>
  );
}
