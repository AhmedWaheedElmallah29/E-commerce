import {
  Box,
  Burger,
  Button,
  Divider,
  Drawer,
  Group,
  ScrollArea,
  Text,
  Indicator, // 1. ضفنا ده
  ActionIcon, // 2. وده
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import classes from "./NavBar.module.css";
import { Link } from "react-router-dom";
import { IconShoppingCart } from "@tabler/icons-react";
import { useContext } from "react"; // 3. هوك
import { CartContext } from "../components/context/CartContext"; // 4. مسار الكونتكست

export function NavBar() {
  const [drawerOpened, { toggle: toggleDrawer, close: closeDrawer }] =
    useDisclosure(false);

  // 5. استدعاء الداتا وحساب العدد
  const { cart } = useContext(CartContext);
  const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <Box>
      <header className={classes.header}>
        <Group justify="space-between" h="100%">
          {/* Logo Section */}
          <Link to="/" style={{ textDecoration: "none" }}>
            <Group gap="xs">
              <IconShoppingCart size={30} color="#228be6" />
              <Text size="xl" fw={700} c="black">
                Shop
              </Text>
            </Group>
          </Link>

          {/* Desktop Links */}
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

          {/* Right Side Actions (Cart + Auth) */}
          <Group visibleFrom="sm">
            {/* 6. زرار العربة (Desktop) */}
            <Link
              to="/cart"
              style={{ textDecoration: "none", marginRight: "10px" }}
            >
              <Indicator
                inline
                label={totalItems}
                size={16}
                color="red"
                offset={4}
                disabled={totalItems === 0} // يخفي العداد لو صفر
                withBorder
              >
                <ActionIcon
                  variant="transparent"
                  size="lg"
                  aria-label="Cart"
                  c="black"
                >
                  <IconShoppingCart size={24} stroke={1.5} />
                </ActionIcon>
              </Indicator>
            </Link>

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

          {/* Mobile Logic */}
          <Group hiddenFrom="sm">
            {/* 7. ضفت زرار العربة للموبايل جنب البرجر */}
            <Link
              to="/cart"
              style={{ textDecoration: "none", marginRight: "5px" }}
            >
              <Indicator
                inline
                label={totalItems}
                size={14}
                color="red"
                disabled={totalItems === 0}
              >
                <ActionIcon variant="transparent" c="black">
                  <IconShoppingCart size={22} />
                </ActionIcon>
              </Indicator>
            </Link>

            <Burger opened={drawerOpened} onClick={toggleDrawer} />
          </Group>
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

          {/* 8. لينك إضافي للعربة جوه القائمة الجانبية */}
          <Link to="/cart" className={classes.link}>
            My Cart ({totalItems})
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
