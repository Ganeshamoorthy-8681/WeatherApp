import { Card, CardContent, CardHeader, Typography } from "@mui/material";

function EmptyCard() {
  return (
    <Card sx={{ maxWidth: 400, margin: "20vh auto" }}>
      <CardHeader title="Welcome to the Weather App!" />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          Get real-time weather updates for your location and around the world. Check the forecast, track temperatures, and stay prepared
          for any weather conditions.
        </Typography>
        <Typography variant="body2" color="text.secondary" mt={2}>
          Enter your city to get started!
        </Typography>
      </CardContent>
    </Card>
  );
}

export default EmptyCard;
