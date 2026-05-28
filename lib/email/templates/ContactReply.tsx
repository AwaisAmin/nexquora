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
  message: string;
}

export default function ContactReply({ name, service, message }: Props) {
  return (
    <Html>
      <Head />
      <Preview>
        A message from the Nexquora team regarding your {service} inquiry
      </Preview>
      <Body style={body}>
        <Container style={container}>
          <Section style={header}>
            <Heading style={headerTitle}>Nexquora·</Heading>
          </Section>

          <Section style={content}>
            <Heading style={h1}>Hi {name},</Heading>
            <Text style={text}>
              Thanks for your interest in our <strong>{service}</strong>{" "}
              service. Here&apos;s a message from our team:
            </Text>

            <div style={messageBox}>
              {message.split("\n").map((line, i) => (
                <Text key={i} style={messageLine}>
                  {line || " "}
                </Text>
              ))}
            </div>

            <Hr style={divider} />

            <Text style={text}>
              Feel free to reply directly to this email if you have any
              questions — we&apos;re happy to help.
            </Text>

            <Text style={text}>
              Looking forward to working with you,
              <br />
              <strong>The Nexquora Team</strong>
            </Text>
          </Section>

          <Text style={footer}>nexquora.com · hello@nexquora.com</Text>
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
  fontSize: "22px",
  fontWeight: "700",
  margin: "0 0 16px",
};
const text = {
  color: "#374151",
  fontSize: "15px",
  lineHeight: "1.7",
  margin: "0 0 16px",
};
const messageBox = {
  backgroundColor: "#f9fafb",
  border: "1px solid #e5e7eb",
  borderLeft: "3px solid #00F5FF",
  borderRadius: "8px",
  padding: "16px 20px",
  margin: "0 0 20px",
};
const messageLine = {
  color: "#1f2937",
  fontSize: "15px",
  lineHeight: "1.7",
  margin: "0",
};
const divider = { borderColor: "#e5e7eb", margin: "24px 0" };
const footer = {
  color: "#9ca3af",
  fontSize: "12px",
  textAlign: "center" as const,
  padding: "0 32px 24px",
  margin: "0",
};
