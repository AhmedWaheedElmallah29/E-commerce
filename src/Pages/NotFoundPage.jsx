import { Button, Container, Group, Text, Title } from "@mantine/core";
import { Link } from "react-router-dom"; // تأكد من استيراد Link
import { Illustration } from "../components/ui/Illustration";
import classes from "./NotFoundPage.module.css";

export default function NotFoundPage() {
  return (
    <Container className={classes.root}>
      <div className={classes.inner}>
        <Illustration className={classes.image} />
        <div className={classes.content}>
          <Title className={classes.title}>Nothing to see here</Title>
          <Text
            c="dimmed"
            size="lg"
            ta="center"
            style={{ margin: 10 }}
            className={classes.description}
          >
            Page you are trying to open does not exist. You may have mistyped
            the address, or the page has been moved to another URL. If you think
            this is an error contact support.
          </Text>
          <Group justify="center">
            <Button component={Link} style={{ margin: 10 }} to="/" size="md">
              Take me back to home page
            </Button>
          </Group>
        </div>
      </div>
    </Container>
  );
}
