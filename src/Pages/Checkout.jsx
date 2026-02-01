import {
  Container,
  Grid,
  Paper,
  TextInput,
  Group,
  Button,
  Title,
  Text,
  Stack,
  Divider,
  LoadingOverlay,
} from "@mantine/core";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useContext, useState } from "react";
import { CartContext } from "../components/context/CartContext";
import { useNavigate } from "react-router-dom";
import { IconCreditCard, IconTruck } from "@tabler/icons-react";

export default function Checkout() {
  const { cart, clearCart } = useContext(CartContext);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false); // عشان اللودينج الوهمي

  // حساب الإجمالي
  const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  const formik = useFormik({
    initialValues: {
      address: "",
      city: "",
      phone: "",
      cardNumber: "", // وهمي
      expiry: "",
      cvv: "",
    },
    validationSchema: Yup.object({
      address: Yup.string().required("Address is required"),
      city: Yup.string().required("City is required"),
      phone: Yup.string().required("Phone is required"),
      cardNumber: Yup.string().required("Card details are required"), // تحقق بسيط
    }),
    onSubmit: (values) => {
      // 1. شغل اللودينج
      setLoading(true);

      // 2. محاكاة الاتصال بالبنك (انتظار 3 ثواني)
      setTimeout(() => {
        setLoading(false);

        // 3. فضي السلة
        clearCart();

        // 4. طلع رسالة نجاح (ممكن تستخدم notifications مستقبلاً)
        alert("🎉 Order placed successfully! Thank you for shopping.");

        // 5. ارجع للرئيسية
        navigate("/");
      }, 3000);
    },
  });

  return (
    <Container size="lg" py="xl">
      <LoadingOverlay
        visible={loading}
        overlayProps={{ radius: "sm", blur: 2 }}
      />

      <Title order={2} mb="lg">
        Checkout
      </Title>

      <Grid>
        {/* Left Side: Forms */}
        <Grid.Col span={{ base: 12, md: 8 }}>
          <form onSubmit={formik.handleSubmit}>
            <Stack gap="lg">
              {/* Shipping Info */}
              <Paper withBorder p="md" radius="md">
                <Group mb="md">
                  <IconTruck size={20} color="#228be6" />
                  <Text fw={600} size="lg">
                    Shipping Information
                  </Text>
                </Group>
                <Grid>
                  <Grid.Col span={12}>
                    <TextInput
                      label="Full Address"
                      placeholder="123 Main St, Apt 4B"
                      {...formik.getFieldProps("address")}
                      error={formik.touched.address && formik.errors.address}
                    />
                  </Grid.Col>
                  <Grid.Col span={6}>
                    <TextInput
                      label="City"
                      placeholder="Cairo"
                      {...formik.getFieldProps("city")}
                      error={formik.touched.city && formik.errors.city}
                    />
                  </Grid.Col>
                  <Grid.Col span={6}>
                    <TextInput
                      label="Phone Number"
                      placeholder="+20 1xxxxxxxxx"
                      {...formik.getFieldProps("phone")}
                      error={formik.touched.phone && formik.errors.phone}
                    />
                  </Grid.Col>
                </Grid>
              </Paper>

              {/* Payment Info (Fake) */}
              <Paper withBorder p="md" radius="md">
                <Group mb="md">
                  <IconCreditCard size={20} color="#228be6" />
                  <Text fw={600} size="lg">
                    Payment Details
                  </Text>
                </Group>
                <Grid>
                  <Grid.Col span={12}>
                    <TextInput
                      label="Card Number"
                      placeholder="0000 0000 0000 0000"
                      {...formik.getFieldProps("cardNumber")}
                      error={
                        formik.touched.cardNumber && formik.errors.cardNumber
                      }
                    />
                  </Grid.Col>
                  <Grid.Col span={6}>
                    <TextInput
                      label="Expiry Date"
                      placeholder="MM/YY"
                      {...formik.getFieldProps("expiry")}
                    />
                  </Grid.Col>
                  <Grid.Col span={6}>
                    <TextInput
                      label="CVV"
                      placeholder="123"
                      type="password"
                      {...formik.getFieldProps("cvv")}
                    />
                  </Grid.Col>
                </Grid>
              </Paper>
            </Stack>
          </form>
        </Grid.Col>

        {/* Right Side: Order Summary */}
        <Grid.Col span={{ base: 12, md: 4 }}>
          <Paper withBorder p="md" radius="md" shadow="sm">
            <Text size="lg" fw={700} mb="md">
              Order Summary
            </Text>

            <Stack gap="xs">
              {cart.map((item) => (
                <Group key={item.id} justify="space-between">
                  <Text size="sm" lineClamp={1} style={{ flex: 1 }}>
                    {item.title}
                  </Text>
                  <Text size="sm">x{item.quantity}</Text>
                  <Text size="sm" fw={500}>
                    ${(item.price * item.quantity).toFixed(2)}
                  </Text>
                </Group>
              ))}
            </Stack>

            <Divider my="md" />

            <Group justify="space-between" mb="lg">
              <Text size="lg" fw={700}>
                Total
              </Text>
              <Text size="xl" fw={700} c="blue">
                ${total.toFixed(2)}
              </Text>
            </Group>

            <Button
              fullWidth
              size="lg"
              onClick={formik.handleSubmit}
              loading={loading}
            >
              Place Order
            </Button>
          </Paper>
        </Grid.Col>
      </Grid>
    </Container>
  );
}
