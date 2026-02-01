import {
  Box,
  Burger,
  Button,
  Divider,
  Drawer,
  Group,
  ScrollArea,
  Text,
  Indicator,
  ActionIcon,
  Menu, // 1. عشان القائمة المنسدلة
  Avatar, // 2. عشان صورة اليوزر
  UnstyledButton,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import classes from "./NavBar.module.css";
import { Link, useNavigate } from "react-router-dom";
import { IconShoppingCart, IconLogout, IconUser } from "@tabler/icons-react";
import { useContext } from "react";
import { CartContext } from "../components/context/CartContext";
// 3. خد بالك: بنستورد AuthContext مش AuthProvider عشان الـ hook يشتغل
import { AuthContext } from "../components/context/AuthContext";

export function NavBar() {
  const { user, logout } = useContext(AuthContext); // استخدمنا الكونتكست الصح
  const [drawerOpened, { toggle: toggleDrawer, close: closeDrawer }] =
    useDisclosure(false);
  const navigate = useNavigate();

  const { cart } = useContext(CartContext);
  const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);

  // دالة الخروج (عشان نقفل الـ Drawer لو مفتوح ونرجع للهوم)
  const handleLogout = () => {
    logout();
    closeDrawer();
    navigate("/");
  };

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
            <Link
              to="/cart"
              style={{ textDecoration: "none", marginRight: "15px" }}
            >
              <Indicator
                inline
                label={totalItems}
                size={16}
                color="red"
                offset={4}
                disabled={totalItems === 0}
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

            {/* 👇👇 هنا اللوجيك بتاع اليوزر (Desktop) 👇👇 */}
            {user ? (
              <Menu shadow="md" width={200} trigger="hover">
                <Menu.Target>
                  <UnstyledButton style={{ cursor: "pointer" }}>
                    <Group gap={10}>
                      <Avatar
                        src={user.image}
                        radius="xl"
                        size={35}
                        color="blue"
                      >
                        {/* لو مفيش صورة، حط أول حرف من اسمه */}
                        {!user.image && user.firstName?.charAt(0)}
                      </Avatar>
                      <div style={{ flex: 1 }}>
                        <Text size="sm" fw={500}>
                          {user.firstName}
                        </Text>
                        <Text c="dimmed" size="xs">
                          Member
                        </Text>
                      </div>
                    </Group>
                  </UnstyledButton>
                </Menu.Target>

                <Menu.Dropdown>
                  <Menu.Label>Settings</Menu.Label>
                  <Menu.Item
                    color="red"
                    leftSection={<IconLogout size={14} />}
                    onClick={handleLogout}
                  >
                    Logout
                  </Menu.Item>
                </Menu.Dropdown>
              </Menu>
            ) : (
              // لو مفيش يوزر، اظهر الزراير
              <Group>
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
            )}
          </Group>

          {/* Mobile Logic */}
          <Group hiddenFrom="sm">
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
          <Link to="/" className={classes.link} onClick={closeDrawer}>
            Home
          </Link>
          <Link to="/products" className={classes.link} onClick={closeDrawer}>
            Products
          </Link>
          <Link to="/categories" className={classes.link} onClick={closeDrawer}>
            Categories
          </Link>

          <Link to="/cart" className={classes.link} onClick={closeDrawer}>
            My Cart ({totalItems})
          </Link>

          <Divider my="sm" />

          {/* 👇👇 هنا اللوجيك بتاع اليوزر (Mobile) 👇👇 */}
          <Group justify="center" grow pb="xl" px="md">
            {user ? (
              <div style={{ width: "100%" }}>
                <Group mb="md">
                  <Avatar src={user.image} radius="xl" size="lg" />
                  <div>
                    <Text fw={600}>
                      {user.firstName} {user.lastName}
                    </Text>
                    <Text size="xs" c="dimmed">
                      {user.email}
                    </Text>
                  </div>
                </Group>
                <Button
                  fullWidth
                  color="red"
                  variant="outline"
                  leftSection={<IconLogout size={18} />}
                  onClick={handleLogout}
                >
                  Logout
                </Button>
              </div>
            ) : (
              // لو مفيش يوزر
              <>
                <Link
                  style={{
                    color: "black",
                    textDecoration: "none",
                    width: "100%",
                  }}
                  to="/login"
                  onClick={closeDrawer}
                >
                  <Button fullWidth variant="default">
                    Log in
                  </Button>
                </Link>
                <Link
                  style={{
                    color: "white",
                    textDecoration: "none",
                    width: "100%",
                  }}
                  to="/signup"
                  onClick={closeDrawer}
                >
                  <Button fullWidth>Sign up</Button>
                </Link>
              </>
            )}
          </Group>
        </ScrollArea>
      </Drawer>
    </Box>
  );
}
