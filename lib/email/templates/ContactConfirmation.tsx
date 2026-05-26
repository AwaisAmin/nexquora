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
  service: string;
}

export default function ContactConfirmation({ name, service }: Props) {
  return (
    <Html>
      <Head />
      <Preview>
        We received your message &mdash; we&apos;ll be in touch within 24 hours
      </Preview>
      <Body style={body}>
        <Container style={container}>
          <Section style={header}>
            <Heading style={headerTitle}>Nexquora</Heading>
          </Section>

          <Section style={content}>
            <Heading style={h1}>Thanks, {name}!</Heading>
            <Text style={text}>
              We&apos;ve received your message regarding <strong>{service}</strong>{" "}
              and we&apos;re already on it.
            </Text>
            <Text style={text}>
              A member of our team will review your project details and get back
              to you within <strong>24 hours</strong> with a clear proposal.
            </Text>

            <Hr style={divider} />

            <Text style={text}>
              In the meantime, feel free to explore our work or learn more about
              our services.
            </Text>

            <Text style={text}>
              Cheers,
              <br />
              <strong>The Nexquora Team</strong>
            </Text>
          </Section>

          <Text style={footer}>
            You&apos;re receiving this because you submitted a contact form at
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
