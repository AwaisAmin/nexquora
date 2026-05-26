import {
  Html,
  Head,
  Body,
  Container,
  Heading,
  Text,
  Hr,
  Section,
  Row,
  Column,
  Preview,
} from "react-email";

interface Props {
  name: string;
  email: string;
  company?: string;
  service: string;
  budget?: string;
  message: string;
  role?: string;
}

export default function ContactNotification({
  name,
  email,
  company,
  service,
  budget,
  message,
  role,
}: Props) {
  return (
    <Html>
      <Head />
      <Preview>
        New contact from {name} — {service}
      </Preview>
      <Body style={body}>
        <Container style={container}>
          {/* Header */}
          <Section style={header}>
            <Heading style={headerTitle}>Nexquora</Heading>
            <Text style={headerSub}>New Contact Form Submission</Text>
          </Section>

          {/* Details */}
          <Section style={content}>
            <Row style={field}>
              <Column style={label}>Name</Column>
              <Column style={value}>{name}</Column>
            </Row>
            <Hr style={divider} />
            <Row style={field}>
              <Column style={label}>Email</Column>
              <Column style={value}>
                <a href={`mailto:${email}`} style={link}>
                  {email}
                </a>
              </Column>
            </Row>
            {company && (
              <>
                <Hr style={divider} />
                <Row style={field}>
                  <Column style={label}>Company</Column>
                  <Column style={value}>{company}</Column>
                </Row>
              </>
            )}
            <Hr style={divider} />
            <Row style={field}>
              <Column style={label}>Service</Column>
              <Column style={value}>{service}</Column>
            </Row>
            {budget && (
              <>
                <Hr style={divider} />
                <Row style={field}>
                  <Column style={label}>Budget</Column>
                  <Column style={value}>{budget}</Column>
                </Row>
              </>
            )}
            {role && (
              <>
                <Hr style={divider} />
                <Row style={field}>
                  <Column style={label}>Applying for</Column>
                  <Column style={value}>{role}</Column>
                </Row>
              </>
            )}
            <Hr style={divider} />
            <Text style={label}>Message</Text>
            <Text style={messageText}>{message}</Text>
          </Section>

          {/* Footer */}
          <Text style={footer}>
            Reply directly to this email to respond to {name}.
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
  fontFamily: "inherit",
};
const headerSub = {
  color: "#6b7280",
  fontSize: "13px",
  margin: "4px 0 0",
  fontFamily: "inherit",
};
const content = { padding: "28px 32px" };
const field = { marginBottom: "0" };
const label = {
  color: "#6b7280",
  fontSize: "12px",
  fontWeight: "600",
  textTransform: "uppercase" as const,
  letterSpacing: "0.05em",
  width: "120px",
  paddingTop: "12px",
  paddingBottom: "4px",
};
const value = {
  color: "#111827",
  fontSize: "14px",
  paddingTop: "12px",
  paddingBottom: "4px",
};
const link = { color: "#00F5FF", textDecoration: "none" };
const divider = { borderColor: "#f3f4f6", margin: "0" };
const messageText = {
  color: "#374151",
  fontSize: "14px",
  lineHeight: "1.6",
  backgroundColor: "#f9fafb",
  padding: "16px",
  borderRadius: "8px",
  marginTop: "8px",
};
const footer = {
  color: "#9ca3af",
  fontSize: "12px",
  textAlign: "center" as const,
  padding: "0 32px 24px",
  margin: "0",
};
