import Mints from './Mints';
import Mint from "./Mint";
const MintsPage = ({contract}) => {

  return (
    <>
     <Mints contract={contract}/>
     <Mint contract={contract}/>
   
    </>
  );
};

export default MintsPage;
