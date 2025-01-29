import { createAppKit, useAppKit } from "@reown/appkit/react";
import { EthersAdapter } from "@reown/appkit-adapter-ethers";
import { polygon } from "@reown/appkit/networks";
import { WalletOutlined } from "@mui/icons-material";
import { IconButton } from "@mui/material";

function Wallet(props) {
  const networks = [polygon];
  const projectId = import.meta.env.VITE_PROJECT_ID;
  const metadata = {
    name: "My Website",
    description: "My Website description",
    url: "http://localhost:5173/", // origin must match your domain & subdomain
    icons: ["https://www.flaticon.com/free-icon/link_455691"],
  };

  createAppKit({
    adapters: [new EthersAdapter()],
    networks,
    metadata,
    projectId,
    featuredWalletIds: [
      "c57ca95b47569778a828d19178114f4db188b89b763c899ba0be274e97267d96",
      "4622a2b2d6af1c9844944291e5e7351a6aa24cd7b23099efac1b2fd875da31a0",
      "971e689d0a5be527bac79629b4ee9b925e82208e5168b733496a09c0faed0709",
      "1ae92b26df02f0abca6304df07debccd18262fdf5fe82daa81593582dac9a369",
      "38f5d18bd8522c244bdd70cb4a68e0e718865155811c043f052fb9f1c51de662",
    ],
    defaultNetwork: polygon,

    themeMode: "dark",

    allWallets: "SHOW",

    features: {
      email: false,
      socials: false,
      analytics: true,
    },
    themeVariables: {
      "--w3m-z-index": 40000,
    },
  });
  const { open } = useAppKit();
  return (
    <>
      <IconButton
        color="info"
        onClick={() => open()}
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
        <WalletOutlined />
      </IconButton>
    </>
  );
}

export default Wallet;
