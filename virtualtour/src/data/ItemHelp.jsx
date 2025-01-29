import { ShoppingBasket, Visibility, Wallet } from "@mui/icons-material";

export const items = [
    {
      icon: <Wallet />,
      title: "Wallet",
      description:
        "To get started, please click on the wallet icon located at the top-right corner of the page. Securely link your wallet and dive into the world of NFTs!",
      image: `url(/imgs/wallet.webp)`,
      
    },
    {
      icon: <ShoppingBasket/>,
      title: "NFT Purchase",
      description: `After connecting your wallet, go to the "Buy NFTS" section and click the "Purchase" button to receive your NFT randomly.`,
      image: `url(/imgs/buy.webp)`,
    },
    {
      icon: <Visibility />,
      title: "view",
      description: `To view your NFTs, click on the profile icon in the top menu and go to the "My NFTs" section. Enjoy the surprise!`,
      image: `url(/imgs/view.webp)`,
    },
  ];