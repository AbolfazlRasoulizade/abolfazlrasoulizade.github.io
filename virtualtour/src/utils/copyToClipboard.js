import copy from "copy-to-clipboard";
import toast from "react-hot-toast";
const copyToClipboard = (e) => {
  let isCopy = copy(e);
  if (isCopy) {
    toast.success("Copied to Clipboard");
  }
};
export default copyToClipboard;
