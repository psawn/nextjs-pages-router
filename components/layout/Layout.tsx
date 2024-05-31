import MainNavigation from "./MainNavigation";
import classes from "./Layout.module.css";
import { ReactNode } from "react";

function Layout(props: { children: ReactNode }) {
  return (
    <div>
      <MainNavigation />
      <main className={classes.main}>{props.children}</main>
    </div>
  );
}

export default Layout;
