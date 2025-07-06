import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import styles from "./loader.module.scss";


export default function Loader() {
  return (
    <Box
      className={styles.root}
    >
      <CircularProgress size={32} />
    </Box>
  );
}
