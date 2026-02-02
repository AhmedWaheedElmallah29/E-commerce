import {
  Container,
  Group,
  ActionIcon,
  Text,
  Stack,
  ThemeIcon,
  Divider,
} from "@mantine/core";
import {
  IconBrandGithub,
  IconBrandLinkedin,
  IconMail,
  IconShoppingCart,
  IconBrandTwitter,
  IconBrandFacebook,
} from "@tabler/icons-react";
import { Link } from "react-router-dom";

export function Footer() {
  const linkStyle = {
    textDecoration: "none",
    color: "#868e96",
    fontSize: "14px",
    transition: "color 0.2s ease",
  };

  return (
    <footer
      style={{
        backgroundColor: "#f8f9fa",
        borderTop: "1px solid #e9ecef",
        paddingTop: "60px",
        paddingBottom: "40px",
        marginTop: "auto",
      }}
    >
      <Container size="lg">
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: "40px",
          }}
        >
          {/* Brand & Description */}
          <div style={{ maxWidth: "320px" }}>
            <Group gap="xs" mb="md">
              <ThemeIcon
                size="xl"
                radius="md"
                variant="gradient"
                gradient={{ from: "blue", to: "cyan" }}
              >
                <IconShoppingCart size={22} stroke={1.5} />
              </ThemeIcon>
              <Text
                size="xl"
                fw={900}
                variant="gradient"
                gradient={{ from: "blue", to: "cyan" }}
              >
                ShopNow
              </Text>
            </Group>
            <Text c="dimmed" size="sm" lh={1.6}>
              A modern e-commerce project built with React, Mantine, and Context
              API. Designed and developed by <b>Ahmed Elmallah</b>.
            </Text>
          </div>

          {/* Quick Links */}
          <Stack gap="sm">
            <Text fw={700} size="lg" mb={5}>
              Shop
            </Text>
            <Link
              to="/"
              style={linkStyle}
              onMouseOver={(e) => (e.target.style.color = "#228be6")}
              onMouseOut={(e) => (e.target.style.color = "#868e96")}
            >
              Home Page
            </Link>
            <Link
              to="/products"
              style={linkStyle}
              onMouseOver={(e) => (e.target.style.color = "#228be6")}
              onMouseOut={(e) => (e.target.style.color = "#868e96")}
            >
              All Products
            </Link>
            <Link
              to="/categories"
              style={linkStyle}
              onMouseOver={(e) => (e.target.style.color = "#228be6")}
              onMouseOut={(e) => (e.target.style.color = "#868e96")}
            >
              Browse Categories
            </Link>
            <Link
              to="/cart"
              style={linkStyle}
              onMouseOver={(e) => (e.target.style.color = "#228be6")}
              onMouseOut={(e) => (e.target.style.color = "#868e96")}
            >
              Shopping Cart
            </Link>
          </Stack>

          <Stack gap="sm">
            <Text fw={700} size="lg" mb={5}>
              Connect with me
            </Text>
            <Group gap="md">
              {/* Social Media Links */}
              <ActionIcon
                component="a"
                href="https://www.facebook.com/Ahmedwaheedelmallah/"
                target="_blank"
                size="xl"
                radius="xl"
                variant="default"
                c="blue"
              >
                <IconBrandFacebook size={20} stroke={1.5} />
              </ActionIcon>


              <ActionIcon
                component="a"
                href="https://github.com/AhmedWaheedElmallah29"
                target="_blank"
                size="xl"
                radius="xl"
                variant="default"
                style={{ transition: "all 0.2s" }}
              >
                <IconBrandGithub size={20} stroke={1.5} />
              </ActionIcon>


              <ActionIcon
                component="a"
                href="mailto:ahmedwaheedelmallah@gmail.com"
                size="xl"
                radius="xl"
                variant="default"
                c="red"
              >
                <IconMail size={20} stroke={1.5} />
              </ActionIcon>
            </Group>
          </Stack>
        </div>

        <Divider my="xl" />

        {/* Bottom Copyright Section */}
        <Group justify="space-between">
          <Text c="dimmed" size="xs">
            © {new Date().getFullYear()} Ahmed Elmallah. All rights reserved.
          </Text>

          <Group gap="xs" visibleFrom="xs">
            {/* Legal Links (Visual Only) */}
            <Text size="xs" c="dimmed" style={{ cursor: "pointer" }}>
              Privacy Policy
            </Text>
            <Divider orientation="vertical" h={10} />
            <Text size="xs" c="dimmed" style={{ cursor: "pointer" }}>
              Terms of Service
            </Text>
          </Group>
        </Group>
      </Container>
    </footer>
  );
}
