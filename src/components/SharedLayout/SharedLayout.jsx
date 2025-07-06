import { Suspense } from "react";
import Header from "../Header/Header";
import ModalRoot from "../UI/ModalRoot/ModalRoot";

const SharedLayout = ({ children }) => {
  return (
    <>
      <Header />
      <Suspense fallback={<p>Loading...</p>}>{children}</Suspense>
      <ModalRoot />
    </>
  );
};

export default SharedLayout;
