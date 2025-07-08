import { Suspense } from "react";
import Header from "../Header/Header";
import ModalRoot from "../UI/ModalRoot/ModalRoot";
import Loader from "../Loader/Loader";

const SharedLayout = ({ children }) => {
  return (
    <>
      <Header />
      <Suspense fallback={<Loader />}>{children}</Suspense>
      <ModalRoot />
    </>
  );
};

export default SharedLayout;
