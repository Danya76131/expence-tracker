import { ClipLoader } from "react-spinners";

const Loader = ({ size = 40, color = "#0ef387" }) => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100%",
      }}
    >
      <ClipLoader size={size} color={color} />
    </div>
  );
};

export default Loader;
