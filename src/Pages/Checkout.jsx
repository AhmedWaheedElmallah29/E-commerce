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
import { useNavigate, useLocation } from "react-router-dom"; // 1. استيراد useLocation
import { IconCreditCard, IconTruck, IconCheck } from "@tabler/icons-react";
import { notifications } from "@mantine/notifications";

export default function Checkout() {
  const { cart, clearCart } = useContext(CartContext);
  const navigate = useNavigate();
  const location = useLocation(); // 2. تفعيل الهوك
  const [loading, setLoading] = useState(false);

  // 3. استقبال المنتج المبعوث (لو موجود)
  // لو جاي من Buy Now هيكون فيه داتا، لو جاي من السلة هيكون null
  const directPurchaseItem = location.state?.product;
  const directQuantity = location.state?.quantity || 1;

  // 4. تحديد إحنا هنحاسب على إيه؟
  // لو فيه شراء مباشر، القائمة فيها عنصر واحد. لو مفيش، يبقى القائمة هي السلة
  const checkoutItems = directPurchaseItem
    ? [{ ...directPurchaseItem, quantity: directQuantity }]
    : cart;

  // 5. حساب الإجمالي بناءً على القائمة المختارة
  const total = checkoutItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0,
  );

  const formik = useFormik({
    initialValues: {
      address: "",
      city: "",
      phone: "",
      cardNumber: "",
      expiry: "",
      cvv: "",
    },
    validationSchema: Yup.object({
      address: Yup.string().min(5).required("Address is required"),
      city: Yup.string().required("City is required"),
      phone: Yup.string()
        .matches(/^[0-9]+$/)
        .min(10)
        .required("Phone is required"),
      cardNumber: Yup.string()
        .matches(/^[0-9]+$/)
        .length(16)
        .required("Card details required"),
      expiry: Yup.string()
        .matches(/^(0[1-9]|1[0-2])\/?([0-9]{2})$/)
        .required("Expiry required"),
      cvv: Yup.string()
        .matches(/^[0-9]+$/)
        .length(3)
        .required("CVV required"),
    }),
    onSubmit: () => {
      setLoading(true);

      setTimeout(() => {
        setLoading(false);

        // 6. اللوجيك الذكي للتنظيف 🧹
        // لو بنحاسب على السلة كلها (مش شراء مباشر) -> فضي السلة
        if (!directPurchaseItem) {
          clearCart();
        }
        // لو شراء مباشر -> متقربش للسلة القديمة (سيبها زي ما هي)

        notifications.show({
          title: "Order Successful! 🎉",
          message: "Thank you for your purchase.",
          color: "teal",
          icon: <IconCheck size={18} />,
          autoClose: 4000,
          withBorder: true,
          style: { marginTop: "50px" },
        });

        navigate("/");
      }, 3000);
    },
  });

  // شرط الإظهار: لو السلة فاضية "وكمان" مفيش شراء مباشر.. يبقى ارجع
  if (cart.length === 0 && !directPurchaseItem) {
    return (
      <Container size="lg" py="xl" ta="center">
        <Title order={2}>Your cart is empty!</Title>
        <Button mt="md" onClick={() => navigate("/products")}>
          Browse Products
        </Button>
      </Container>
    );
  }

  return (
    <Container size="lg" py="xl">
      <LoadingOverlay
        visible={loading}
        zIndex={1000}
        overlayProps={{ radius: "sm", blur: 2 }}
      />

      <Title order={2} mb="lg">
        {/* تغيير العنوان حسب الحالة */}
        {directPurchaseItem ? "Checkout (Buy Now)" : "Checkout"}
      </Title>

      <Grid gutter="xl">
        <Grid.Col span={{ base: 12, md: 8 }}>
          <form onSubmit={formik.handleSubmit}>
            {/* ... (نفس كود الفورم بالظبط بدون تغيير) ... */}
            {/* اختصاراً للكود هنا، سيب الفورم زي ما كانت */}
            <Stack gap="lg">
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
                      label="Address"
                      placeholder="123 Main St"
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
                      label="Phone"
                      placeholder="01xxxxxxxxx"
                      maxLength={11}
                      {...formik.getFieldProps("phone")}
                      error={formik.touched.phone && formik.errors.phone}
                    />
                  </Grid.Col>
                </Grid>
              </Paper>
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
                      maxLength={16}
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
                      maxLength={5}
                      {...formik.getFieldProps("expiry")}
                      error={formik.touched.expiry && formik.errors.expiry}
                    />
                  </Grid.Col>
                  <Grid.Col span={6}>
                    <TextInput
                      label="CVV"
                      placeholder="123"
                      maxLength={3}
                      type="password"
                      {...formik.getFieldProps("cvv")}
                      error={formik.touched.cvv && formik.errors.cvv}
                    />
                  </Grid.Col>
                </Grid>
              </Paper>
            </Stack>
          </form>
        </Grid.Col>

        {/* ملخص الطلب */}
        <Grid.Col span={{ base: 12, md: 4 }}>
          <Paper
            withBorder
            p="md"
            radius="md"
            shadow="sm"
            pos="sticky"
            top={80}
          >
            <Text size="lg" fw={700} mb="md">
              Order Summary
            </Text>

            <Stack gap="sm">
              {/* 7. هنا بنلف على القائمة المتحدد سواء كارت أو منتج واحد */}
              {checkoutItems.map((item) => (
                <Group key={item.id} justify="space-between" align="flex-start">
                  <div style={{ flex: 1 }}>
                    <Text size="sm" lineClamp={1} fw={500}>
                      {item.title}
                    </Text>
                    <Text size="xs" c="dimmed">
                      Qty: {item.quantity}
                    </Text>
                  </div>
                  <Text size="sm" fw={600}>
                    ${(item.price * item.quantity).toFixed(2)}
                  </Text>
                </Group>
              ))}
            </Stack>

            <Divider my="md" />
            <Group justify="space-between" mb="xs">
              <Text size="sm" c="dimmed">
                Subtotal
              </Text>
              <Text size="sm" fw={500}>
                ${total.toFixed(2)}
              </Text>
            </Group>
            <Group justify="space-between" mb="lg">
              <Text size="sm" c="dimmed">
                Shipping
              </Text>
              <Text size="sm" c="green" fw={500}>
                Free
              </Text>
            </Group>
            <Divider my="sm" variant="dashed" />
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
              color="blue"
              onClick={formik.handleSubmit}
              loading={loading}
            >
              {directPurchaseItem ? "Pay Now" : "Confirm & Pay"}
            </Button>
          </Paper>
        </Grid.Col>
      </Grid>
    </Container>
  );
}
