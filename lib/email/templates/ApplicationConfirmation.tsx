import {
  Html,
  Head,
  Body,
  Container,
  Heading,
  Text,
  Hr,
  Section,
  Preview,
} from "react-email";

interface Props {
  name: string;
  jobTitle: string;
}

export default function ApplicationConfirmation({ name, jobTitle }: Props) {
  return (
    <Html>
      <Head />
      <Preview>Your application for {jobTitle} has been received</Preview>
      <Body style={body}>
        <Container style={container}>
          <Section style={header}>
            <Heading style={headerTitle}>Nexquora</Heading>
          </Section>

          <Section style={content}>
            <Heading style={h1}>Application received!</Heading>
            <Text style={text}>
              Hi {name}, thanks for applying for the <strong>{jobTitle}</strong>{" "}
              position at Nexquora.
            </Text>
            <Text style={text}>
              We&apos;ve received your application and our team will review it
              carefully. If your profile matches what we&apos;re looking for,
              we&apos;ll reach out within{" "}
              <strong>5&ndash;7 business days</strong>.
            </Text>

            <Hr style={divider} />

            <Text style={text}>
              We appreciate your interest in joining the Nexquora team. We build
              ambitious products and we&apos;re always excited to meet talented
              people.
            </Text>

            <Text style={text}>
              Best of luck,
              <br />
              <strong>The Nexquora Team</strong>
            </Text>
          </Section>

          <Text style={footer}>
            You&apos;re receiving this because you applied for a position at
            nexquora.com
          </Text>
        </Container>
      </Body>
    </Html>
  );
}

const body = {
  backgroundColor: "#f4f4f5",
  fontFamily: "Inter, -apple-system, sans-serif",
};
const container = {
  maxWidth: "560px",
  margin: "40px auto",
  backgroundColor: "#ffffff",
  borderRadius: "12px",
  overflow: "hidden" as const,
};
const header = { backgroundColor: "#050810", padding: "28px 32px" };
const headerTitle = {
  color: "#00F5FF",
  fontSize: "22px",
  fontWeight: "700",
  margin: "0",
};
const content = { padding: "32px" };
const h1 = {
  color: "#111827",
  fontSize: "24px",
  fontWeight: "700",
  margin: "0 0 16px",
};
const text = {
  color: "#374151",
  fontSize: "15px",
  lineHeight: "1.7",
  margin: "0 0 16px",
};
const divider = { borderColor: "#e5e7eb", margin: "24px 0" };
const footer = {
  color: "#9ca3af",
  fontSize: "12px",
  textAlign: "center" as const,
  padding: "0 32px 24px",
  margin: "0",
};
