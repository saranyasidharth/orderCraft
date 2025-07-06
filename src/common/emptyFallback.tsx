import EmptyIcon from "../assets/svg/emptyIcon.svg?react";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";

export const EmptyFallback = ({ message }: { message: string }) => (
  <Paper
    sx={{
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      p: 5,
      rowGap: 1,
    }}
  >
    <EmptyIcon />
    <Typography variant="h4" sx={{ textWrap: "balance" }}>
      {message}
    </Typography>
  </Paper>
);
