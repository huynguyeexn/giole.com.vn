import { Button } from "@/components/ui/button";
import { ArrowUpIcon } from "@radix-ui/react-icons";
import { useEffect, useRef } from "react";

export default function ScrollTop() {
  const buttonRef = useRef<HTMLButtonElement>(null);

  const scrollFunction = () => {
    if (
      document.body.scrollTop > 200 ||
      document.documentElement.scrollTop > 200
    ) {
      buttonRef.current?.classList.remove("hidden");
      buttonRef.current?.classList.add("flex");
    } else {
      buttonRef.current?.classList.remove("flex");
      buttonRef.current?.classList.add("hidden");
    }
  };
  const backToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    window.addEventListener("scroll", scrollFunction);

    return () => {
      window.removeEventListener("scroll", scrollFunction);
    };
  }, []);

  return (
    <>
      <button
        ref={buttonRef}
        onClick={backToTop}
        className="fixed right-4 bottom-4 h-10 w-10 bg-primary text-white rounded-full text-center hidden justify-center items-center"
      >
        <ArrowUpIcon className="h-4 w-4" />
      </button>
    </>
  );
}
