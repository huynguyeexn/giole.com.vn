"use client";
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
} from "@/components/ui/drawer";
import { ChurchListContext } from "@/context/churchListContext";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import "mapbox-gl/dist/mapbox-gl.css";
import { useContext, useEffect, useState } from "react";
import MapComponent from "./map";

export default function MapWrapperComponent() {
  const { state, actions } = useContext(ChurchListContext);
  const isDesktop = useMediaQuery("(min-width: 640px)");

  const [drawerOpen, setDrawer] = useState(false);

  const handleCloseDrawer = () => {
    setDrawer(false);
    actions.selectChurch(undefined);
  };

  useEffect(() => {
    if (state.churchSelected) {
      setDrawer(true);
    }
  }, [state]);

  return (
    <>
      {isDesktop ? (
        <div className="hidden sm:block grow rounded-3xl bg-sky-50 overflow-hidden h-full">
          <MapComponent />
        </div>
      ) : (
        <Drawer open={drawerOpen} onClose={handleCloseDrawer}>
          <DrawerContent className="h-full">
            <DrawerHeader></DrawerHeader>
            <MapComponent />
            <DrawerFooter>
              <Button variant="outline" onClick={handleCloseDrawer}>
                Đóng
              </Button>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
      )}
    </>
  );
}
