import Firebasesignup from "./firebasesignup";
import './sign.css'
import Grid from "@mui/material/Grid"; // Grid version 1
export default function Signin() {
  return (
    <main className="container intropadding">
      <Grid container spacing={2} alignItems="center">
        <Grid xs={12} md={4} display="flex"></Grid>
        <Grid xs={12} md={4} display="flex">
          <Firebasesignup />
        </Grid>
        <Grid xs={12} md={4} display="flex"></Grid>
      </Grid>
    </main>
  );
}
