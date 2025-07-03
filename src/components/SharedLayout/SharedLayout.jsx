import { Suspense } from "react";
import Header from "../Header/Header";

const SharedLayout = ({ children }) => {
  return (
    <>
      <Header />
      <Suspense fallback={<p>Loading...</p>}>{children}</Suspense>
    </>
  );
};

export default SharedLayout;
