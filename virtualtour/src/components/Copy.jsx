import { Typography } from "@mui/material";
import { Link } from "react-router-dom";

const Copyright = () => {
  return (
    <Typography variant="body2" sx={{ color: "text.secondary", mt: 1 }}>
      {"Copyright © "}
      <Link color="text.secondary" href="#">
        MeT
      </Link>
      &nbsp;
      {new Date().getFullYear()}
    </Typography>
  );
};
export default Copyright;
