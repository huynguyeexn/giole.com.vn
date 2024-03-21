"use client";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { ChurchListContext } from "@/context/churchListContext";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { useContext, useEffect, useState } from "react";
import { MapProvider } from "react-map-gl";
import MapComponent from "./map";

export default function MapWrapperComponent() {
  const { state, actions } = useContext(ChurchListContext);
  const isDesktop = useMediaQuery("(min-width: 640px)");

  const [drawerOpen, setDrawer] = useState(false);

  const handleCloseDialog = () => {
    setDrawer(false);
    actions.selectChurch(undefined);
  };

  useEffect(() => {
    if (state.churchSelected) {
      setDrawer(true);
    }
  }, [state]);

  return (
    <MapProvider>
      {isDesktop ? (
        <div className="hidden sm:block grow rounded-3xl bg-sky-50 overflow-hidden h-full">
          <MapComponent />
        </div>
      ) : (
        <Dialog open={drawerOpen} onOpenChange={handleCloseDialog}>
          <DialogContent className="h-full w-full p-0">
            <div className="flex flex-col">
              {state.churchSelected && <MapComponent />}
              <Button
                onClick={handleCloseDialog}
                variant={"ghost"}
                className="w-full"
              >
                Đóng
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </MapProvider>
  );
}
