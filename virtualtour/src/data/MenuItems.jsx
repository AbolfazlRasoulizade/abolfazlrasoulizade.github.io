import { Approval, Apps, ChangeCircle, Create, Forward, Logout, UploadFile } from "@mui/icons-material";

export const menuItems = [
    { text: "My NFTs", icon: <Apps />, page: "myNFTs" },
    { text: "Log out", icon: <Logout />, page: "logout" },
  ];
export const menuItemsOwner = [
    { text: "Mints", icon: <Create />, page: "mints" },
    { text: "Change Price", icon: <ChangeCircle />, page: "changePrice" },
    { text: "Withdraw", icon: <Forward />, page: "withdraw" },
    { text: "Upload", icon: <UploadFile />, page: "upload" },
    { text: "My NFTs", icon: <Apps />, page: "myNFTs" },
    { text: "Approve to sell", icon: <Approval />, page: "approve" },

    { text: "Log out", icon: <Logout />, page: "logout" },
  ];
  