import { Box, styled, Typography } from "@mui/material";
import React from "react";
import Review from "../../Components/Review";

const Heading = styled(Typography)(({ theme }) => ({
  padding: "24px 0px 0px 0px",
  fontWeight: "600",
  fontSize: "24px",
  fontFamily: "sans-serif,nunito",
}));
const Body = styled(Typography)(({ theme }) => ({
  padding: "24px 0px 0px 0px",
  fontSize: "20px",
  fontFamily: "sans-serif,nunito",
}));

function About() {
  return (
    <>
      <Box
        sx={{
          minHeight: "100vh",
          display: "flex",
          justifyContent: "center",
          paddingY: "32px",
        }}
      >
        <Box
          sx={{
            width: { md: "60%", lg: "60%", xl: "60%", sm: "70%", xs: "90%" },
            padding: "16px 0px 32px 0px",
          }}
        >
          <Typography
            sx={{
              textAlign: "center",
              fontSize: "48px",
              fontWeight: "600",
              width: "100%",
              marginBottom: "32px",
            }}
          >
            About Us
          </Typography>
          <Box>
            <Body>Let's be honest. Loving your health should be important.</Body>
            <Body>
              We're the new kids on the supplement block! Yes Please grew from our
              love of health, good food and nutrition and is an extension of our
              successful BARE Guides & BARE community. Our aim is to provide you
              with products that make YOU FEEL GOOD from the inside out. We're
              here to make loving your health FUN and make you feel like it's easy
              to make health a priority for yourself - we want to break down the
              'scary' barriers of health, and provide you with products and
              information that bring out your best self.
            </Body>
            <Heading>Why Mixxo? </Heading>
            <Body>
              At Yes Please, we use only the best quality ingredients that are
              supported by evidence. The evidence is obtained from science and
              traditional sources. Our formulas are formulated by our in-house
              team of experts, who have qualifications in nutrition, naturopathy
              and herbal medicine, among other qualifications in health, and with
              a combined experience of over 30 years. Our products are aimed at
              providing you solutions in a sustainable, effective, and efficient
              way. Our products are manufactured in Australia at TGA certified
              facilities in accordance with Good Manufacturing Practice (GMP).
              They also undergo stability testing so you know what you are
              getting.
            </Body>
            <Body>
              At Yes Please, we use only the best quality ingredients that are
              supported by evidence. The evidence is obtained from science and
              traditional sources. Our formulas are formulated by our in-house
              team of experts, who have qualifications in nutrition, naturopathy
              and herbal medicine, among other qualifications in health, and with
              a combined experience of over 30 years. Our products are aimed at
              providing you solutions in a sustainable, effective, and efficient
              way. Our products are manufactured in Australia at TGA certified
              facilities in accordance with Good Manufacturing Practice (GMP).
              They also undergo stability testing so you know what you are
              getting.{" "}
            </Body>
            <Body>
              At Yes Please, we use only the best quality ingredients that are
              supported by evidence. The evidence is obtained from science and
              traditional sources. Our formulas are formulated by our in-house
              team of experts, who have qualifications in nutrition, naturopathy
              and herbal medicine, among other qualifications in health, and with
              a combined experience of over 30 years. Our products are aimed at
              providing you solutions in a sustainable, effective, and efficient
              way. Our products are manufactured in Australia at TGA certified
              facilities in accordance with Good Manufacturing Practice (GMP).
              They also undergo stability testing so you know what you are
              getting.{" "}
            </Body>
            <Body>
              At Yes Please, we use only the best quality ingredients that are
              supported by evidence. The evidence is obtained from science and
              traditional sources. Our formulas are formulated by our in-house
              team of experts, who have qualifications in nutrition, naturopathy
              and herbal medicine, among other qualifications in health, and with
              a combined experience of over 30 years. Our products are aimed at
              providing you solutions in a sustainable, effective, and efficient
              way. Our products are manufactured in Australia at TGA certified
              facilities in accordance with Good Manufacturing Practice (GMP).
              They also undergo stability testing so you know what you are
              getting.{" "}
            </Body>
            <Body>
              At Yes Please, we use only the best quality ingredients that are
              supported by evidence. The evidence is obtained from science and
              traditional sources. Our formulas are formulated by our in-house
              team of experts, who have qualifications in nutrition, naturopathy
              and herbal medicine, among other qualifications in health, and with
              a combined experience of over 30 years. Our products are aimed at
              providing you solutions in a sustainable, effective, and efficient
              way. Our products are manufactured in Australia at TGA certified
              facilities in accordance with Good Manufacturing Practice (GMP).
              They also undergo stability testing so you know what you are
              getting.{" "}
            </Body>
          </Box>
        </Box>
      </Box>
      <Review/>
    </>
  );
}

export default About;
