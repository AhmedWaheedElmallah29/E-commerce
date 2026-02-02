import {
  Box,
  Burger,
  Button,
  Drawer,
  Group,
  ScrollArea,
  Text,
  Indicator,
  ActionIcon,
  Menu,
  Avatar,
  UnstyledButton,
  Container,
  rem,
  ThemeIcon,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { Link, useNavigate, useLocation } from "react-router-dom";
import {
  IconShoppingCart,
  IconLogout,
  IconChevronDown,
  IconShoppingBag,
} from "@tabler/icons-react";
import { useContext } from "react";
import { CartContext } from "../components/context/CartContext";
import { AuthContext } from "../components/context/AuthContext";
import { notifications } from "@mantine/notifications";

export function NavBar() {
  const { user, logout } = useContext(AuthContext);
  const { cart } = useContext(CartContext);
  const [drawerOpened, { toggle: toggleDrawer, close: closeDrawer }] =
    useDisclosure(false);
  const navigate = useNavigate();
  const location = useLocation();

  const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);

  const handleLogout = () => {
    logout();
    closeDrawer();
    navigate("/");
    notifications.show({
      title: "Logged out",
      message: "See you soon!",
      color: "blue",
    });
  };

  // Determine link style based on active state
  const getLinkStyle = (path) => ({
    textDecoration: "none",
    color: location.pathname === path ? "#228be6" : "#495057",
    fontWeight: 600,
    fontSize: rem(15),
    padding: `${rem(8)} ${rem(12)}`,
    borderRadius: rem(8),
    transition: "all 0.2s ease",
    backgroundColor: location.pathname === path ? "#e7f5ff" : "transparent",
  });

  return (
    <Box
      component="header"
      style={{
        position: "sticky",
        top: 0,
        zIndex: 100,
        backgroundColor: "rgba(255, 255, 255, 0.8)",
        backdropFilter: "blur(12px)",
        borderBottom: "1px solid rgba(0,0,0,0.05)",
        height: rem(70),
      }}
    >
      <Container size="lg" h="100%">
        <Group justify="space-between" h="100%">
          {/* Logo Section */}
          <Link to="/" style={{ textDecoration: "none" }}>
            <Group gap={8}>
              <ThemeIcon
                size={34}
                radius="md"
                variant="gradient"
                gradient={{ from: "blue", to: "cyan" }}
              >
                <IconShoppingBag size={20} stroke={1.5} />
              </ThemeIcon>
              <Text
                size="xl"
                fw={800}
                variant="gradient"
                gradient={{ from: "blue", to: "cyan" }}
                style={{ letterSpacing: -0.5 }}
              >
                ShopNow
              </Text>
            </Group>
          </Link>

          {/* Desktop Navigation */}
          <Group gap="xs" visibleFrom="md">
            <Link to="/" style={getLinkStyle("/")}>
              Home
            </Link>
            <Link to="/products" style={getLinkStyle("/products")}>
              Products
            </Link>
            <Link to="/categories" style={getLinkStyle("/categories")}>
              Categories
            </Link>
          </Group>

          {/* Right Side Actions */}
          <Group gap="sm" visibleFrom="sm">
            {/* Cart Indicator */}
            <Link to="/cart" style={{ textDecoration: "none" }}>
              <Indicator
                label={totalItems}
                size={16}
                color="red"
                offset={4}
                disabled={totalItems === 0}
                inline
                withBorder
              >
                <ActionIcon
                  variant="subtle"
                  color="gray"
                  size="lg"
                  radius="xl"
                  aria-label="Cart"
                >
                  <IconShoppingCart size={22} stroke={1.5} />
                </ActionIcon>
              </Indicator>
            </Link>

            {/* User Dropdown Menu */}
            {user ? (
              <Menu
                shadow="lg"
                width={220}
                radius="md"
                position="bottom-end"
                transitionProps={{ transition: "pop-top-right" }}
              >
                <Menu.Target>
                  <UnstyledButton
                    style={{
                      padding: "4px",
                      borderRadius: "30px",
                      transition: "background-color 0.2s",
                    }}
                    className="hover:bg-slate-100"
                  >
                    <Group gap={10}>
                      <Avatar
                        src={user.image}
                        radius="xl"
                        size={38}
                        color="blue"
                        style={{
                          border: "2px solid white",
                          boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
                        }}
                      >
                        {!user.image && user.firstName?.charAt(0)}
                      </Avatar>
                      <div style={{ marginRight: 10 }}>
                        {/* Show user name on larger screens */}
                        <Text size="sm" fw={600} lh={1} visibleFrom="lg">
                          {user.firstName}
                        </Text>
                      </div>
                      <IconChevronDown
                        size={14}
                        color="gray"
                        style={{ marginRight: 5 }}
                      />
                    </Group>
                  </UnstyledButton>
                </Menu.Target>

                <Menu.Dropdown p="xs">
                  <div
                    style={{
                      padding: "8px 12px",
                      marginBottom: "8px",
                      backgroundColor: "#f8f9fa",
                      borderRadius: "8px",
                    }}
                  >
                    <Text size="xs" c="dimmed">
                      Signed in as
                    </Text>
                    <Text size="sm" fw={600} truncate>
                      {user.email}
                    </Text>
                  </div>

                  <Menu.Item
                    color="red"
                    leftSection={<IconLogout size={16} />}
                    onClick={handleLogout}
                    style={{ borderRadius: "6px" }}
                  >
                    Logout
                  </Menu.Item>
                </Menu.Dropdown>
              </Menu>
            ) : (
              // Guest Actions
              <Group gap="xs">
                <Link to="/login">
                  <Button variant="subtle" color="gray" radius="xl">
                    Log in
                  </Button>
                </Link>
                <Link to="/signup">
                  <Button
                    variant="filled"
                    color="blue"
                    radius="xl"
                    style={{ boxShadow: "0 4px 12px rgba(34, 139, 230, 0.3)" }}
                  >
                    Sign up
                  </Button>
                </Link>
              </Group>
            )}
          </Group>

          {/* Mobile Navigation Controls */}
          <Group hiddenFrom="sm" gap="xs">
            <Link to="/cart" style={{ textDecoration: "none" }}>
              <Indicator
                label={totalItems}
                size={14}
                color="red"
                disabled={totalItems === 0}
                inline
              >
                <ActionIcon variant="transparent" c="black" size="lg">
                  <IconShoppingCart size={24} stroke={1.5} />
                </ActionIcon>
              </Indicator>
            </Link>
            <Burger opened={drawerOpened} onClick={toggleDrawer} size="sm" />
          </Group>
        </Group>
      </Container>

      {/* Mobile Drawer Menu */}
      <Drawer
        opened={drawerOpened}
        onClose={closeDrawer}
        size="75%"
        padding="md"
        title={
          <Text fw={700} size="lg">
            Menu
          </Text>
        }
        hiddenFrom="sm"
        zIndex={1000000}
        overlayProps={{ backgroundOpacity: 0.5, blur: 4 }}
      >
        <ScrollArea h="calc(100vh - 80px)">
          <Box py="md">
            <Link
              to="/"
              onClick={closeDrawer}
              style={{ textDecoration: "none" }}
            >
              <Button
                fullWidth
                variant="light"
                color="gray"
                justify="flex-start"
                size="md"
                mb="xs"
              >
                Home
              </Button>
            </Link>
            <Link
              to="/products"
              onClick={closeDrawer}
              style={{ textDecoration: "none" }}
            >
              <Button
                fullWidth
                variant="light"
                color="gray"
                justify="flex-start"
                size="md"
                mb="xs"
              >
                Products
              </Button>
            </Link>
            <Link
              to="/categories"
              onClick={closeDrawer}
              style={{ textDecoration: "none" }}
            >
              <Button
                fullWidth
                variant="light"
                color="gray"
                justify="flex-start"
                size="md"
                mb="xs"
              >
                Categories
              </Button>
            </Link>
          </Box>

          <Box style={{ borderTop: "1px solid #eee", paddingTop: "20px" }}>
            {user ? (
              <Box>
                <Group mb="lg">
                  <Avatar src={user.image} size="lg" radius="xl" />
                  <div>
                    <Text fw={700}>
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
                  onClick={handleLogout}
                  leftSection={<IconLogout size={18} />}
                >
                  Logout
                </Button>
              </Box>
            ) : (
              <Group grow>
                <Link to="/login" onClick={closeDrawer}>
                  <Button fullWidth variant="default">
                    Log in
                  </Button>
                </Link>
                <Link to="/signup" onClick={closeDrawer}>
                  <Button fullWidth>Sign up</Button>
                </Link>
              </Group>
            )}
          </Box>
        </ScrollArea>
      </Drawer>
    </Box>
  );
}
