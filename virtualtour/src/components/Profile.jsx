import PermIdentityIcon from "@mui/icons-material/PermIdentity";
import { IconButton } from "@mui/material";

const Profile = (props) => {
  return (
    <IconButton
      color="info"
      sx={(theme) => ({
        borderRadius: (theme.vars || theme).shape.borderRadius,
        border: "1px solid",
        borderColor: (theme.vars || theme).palette.info,
      })}
      data-screenshot="toggle-mode"
      disableRipple
      size="small"
      
      {...props}
    >
      <PermIdentityIcon />
    </IconButton>
  );
};
export default Profile;
