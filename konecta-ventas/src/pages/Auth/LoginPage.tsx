import { Container, Paper } from "@mui/material";
import LoginForm from "../../components/forms/LoginForm";

export default function LoginPage() {
  return (
    <Container maxWidth="sm">
      <Paper elevation={3} sx={{ p: 4, mt: 8 }}>
        <LoginForm />
      </Paper>
    </Container>
  );
}
