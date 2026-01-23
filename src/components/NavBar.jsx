import {
  Box,
  Burger,
  Button,
  Divider,
  Drawer,
  Group,
  ScrollArea,
  Text,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import classes from "./NavBar.module.css";
import { Link } from "react-router-dom";
import { IconShoppingCart } from "@tabler/icons-react";

export function NavBar() {
  const [drawerOpened, { toggle: toggleDrawer, close: closeDrawer }] =
    useDisclosure(false);

  return (
    <Box>
      <header className={classes.header}>
        <Group justify="space-between" h="100%">
          <Link to="/" style={{ textDecoration: "none" }}>
            <Group gap="xs">
              <IconShoppingCart size={30} color="#228be6" />
              <Text size="xl" fw={700} c="black">
                Shop
              </Text>
            </Group>
          </Link>

          <Group h="100%" gap={0} visibleFrom="sm">
            <Link to="/" className={classes.link}>
              Home
            </Link>
            <Link to="/products" className={classes.link}>
              Products
            </Link>
            <Link to="/categories" className={classes.link}>
              Categories
            </Link>
          </Group>

          <Group visibleFrom="sm">
            <Link
              style={{ color: "black", textDecoration: "none" }}
              to="/login"
            >
              <Button variant="default">Log in</Button>
            </Link>
            <Link
              style={{ color: "white", textDecoration: "none" }}
              to="/signup"
            >
              <Button>Sign up</Button>
            </Link>
          </Group>

          <Burger
            opened={drawerOpened}
            onClick={toggleDrawer}
            hiddenFrom="sm"
          />
        </Group>
      </header>

      <Drawer
        opened={drawerOpened}
        onClose={closeDrawer}
        size="100%"
        padding="md"
        title="Navigation"
        hiddenFrom="sm"
        zIndex={1000000}
      >
        <ScrollArea h="calc(100vh - 80px)" mx="-md">
          <Divider my="sm" />
          <Link to="/" className={classes.link}>
            Home
          </Link>
          <Link to="/products" className={classes.link}>
            Products
          </Link>
          <Link to="/categories" className={classes.link}>
            Categories
          </Link>
          <Link to="/brands" className={classes.link}>
            Brands
          </Link>
          <Divider my="sm" />
          <Group justify="center" grow pb="xl" px="md">
            <Link
              style={{ color: "black", textDecoration: "none" }}
              to="/login"
            >
              <Button variant="default">Log in</Button>
            </Link>
            <Link
              style={{ color: "white", textDecoration: "none" }}
              to="/signup"
            >
              <Button>Sign up</Button>
            </Link>
          </Group>
        </ScrollArea>
      </Drawer>
    </Box>
  );
}
