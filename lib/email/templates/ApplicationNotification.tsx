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
  jobTitle: string;
  message: string;
}

export default function ApplicationNotification({
  name,
  email,
  jobTitle,
  message,
}: Props) {
  return (
    <Html>
      <Head />
      <Preview>
        New application for {jobTitle} from {name}
      </Preview>
      <Body style={body}>
        <Container style={container}>
          <Section style={header}>
            <Heading style={headerTitle}>Nexquora</Heading>
            <Text style={headerSub}>New Job Application</Text>
          </Section>

          <Section style={content}>
            <Text style={badge}>{jobTitle}</Text>

            <Row style={field}>
              <Column style={label}>Applicant</Column>
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
            <Hr style={divider} />
            <Text style={label}>Cover message</Text>
            <Text style={messageText}>{message}</Text>
          </Section>

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
};
const headerSub = { color: "#6b7280", fontSize: "13px", margin: "4px 0 0" };
const content = { padding: "28px 32px" };
const badge = {
  display: "inline-block" as const,
  backgroundColor: "#00F5FF15",
  color: "#00F5FF",
  fontSize: "12px",
  fontWeight: "700",
  padding: "4px 12px",
  borderRadius: "20px",
  marginBottom: "20px",
};
const field = {};
const label = {
  color: "#6b7280",
  fontSize: "12px",
  fontWeight: "600",
  textTransform: "uppercase" as const,
  letterSpacing: "0.05em",
  width: "120px",
  paddingTop: "12px",
};
const value = { color: "#111827", fontSize: "14px", paddingTop: "12px" };
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
