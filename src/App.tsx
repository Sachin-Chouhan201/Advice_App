import { useEffect, useState } from "react";
import { Box, Button, Container, Typography } from "@mui/material";

export default function App() {
  const [advice, setAdvice] = useState<string>("");
  const [count, setCount] = useState<number>(0);
  const [bgColor, setBgColor] = useState<string>("");

  const getRandomColor = () => {
    const letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };

  async function getAdvice() {
    const res = await fetch("https://api.adviceslip.com/advice");
    const data = await res.json();
    console.log(data.slip.advice);
    setAdvice(data.slip.advice);
    setCount((c) => c + 1);
    setBgColor(getRandomColor());
  }

  useEffect(() => {
    setBgColor(getRandomColor());
    getAdvice();
  }, []);

  return (
    <Box
      sx={{
        backgroundColor: bgColor,
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: 2,
      }}
    >
      <Container>
        <Typography variant="h1" gutterBottom>
          {advice}
        </Typography>
        <Button variant="contained" color="primary" onClick={getAdvice}>
          Get advice
        </Button>
        <Message count={count} />
      </Container>
    </Box>
  );
}

interface MessageProps {
  count: number;
}

function Message({ count }: MessageProps) {
  console.log(count);
  return (
    <Typography variant="body1">
      You have read advice <strong>{count}</strong> times
    </Typography>
  );
}
