import { useState } from "react";

export const useToggleDrawer = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);

  const toggleDrawer = (open) => () => {
    setDrawerOpen(open);
  };

  return {
    drawerOpen,
    toggleDrawer,
  };
};
