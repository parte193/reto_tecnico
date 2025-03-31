import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { TextField, Button, Box, Typography } from "@mui/material";

const loginSchema = z.object({
  email: z.string().email("Correo inválido").min(1, "El correo es requerido"),
  password: z.string().min(6, "Mínimo 6 caracteres"),
});

type LoginFormInputs = z.infer<typeof loginSchema>;

export default function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormInputs>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = (data: LoginFormInputs) => {
    const mappedData = {
      correo_electronico: data.email,
      contrasena: '12345678', // Updated to match the database entry for testing
    };
    console.log("Datos enviados:", mappedData);
    // Call authService.login(mappedData) here if needed
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      sx={{ display: "flex", flexDirection: "column", gap: 2, width: 300, mx: "auto", mt: 5 }}
    >
      <Box sx={{display: "flex", justifyContent: "center"}}>
      <img src="./image_dollar.png" alt="" width={100} height={100}/>
      </Box>


      <Typography variant="h5" textAlign="center">
        Iniciar Sesión
      </Typography>

      <TextField
        label="Correo Electrónico"
        {...register("email")}
        error={!!errors.email}
        helperText={errors.email?.message}
        fullWidth
      />

      <TextField
        label="Contraseña"
        type="password"
        {...register("password")}
        error={!!errors.password}
        helperText={errors.password?.message}
        fullWidth
      />

      <Button variant="contained" type="submit" fullWidth>
        Iniciar Sesión
      </Button>
    </Box>
  );
}
