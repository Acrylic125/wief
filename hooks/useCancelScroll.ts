import { useEffect, useRef } from "react";

// https://stackoverflow.com/questions/57358640/cancel-wheel-event-with-e-preventdefault-in-react-event-bubbling
export default function useCancelScroll({ duration = 300, ignoreCTRLScroll = true } = {}) {
  const docShouldScroll = useRef<NodeJS.Timeout | null>(null);
  const onWheel = () => {
    if (docShouldScroll.current) {
      clearTimeout(docShouldScroll.current);
    }

    docShouldScroll.current = setTimeout(() => {
      docShouldScroll.current = null;
    }, duration);
  };

  useEffect(() => {
    const cancelWheel = (e: WheelEvent) => {
      // If CTR is pressed, don't cancel the scroll.
      if (ignoreCTRLScroll && e.ctrlKey) return;
      docShouldScroll.current && e.preventDefault();
    };
    document.body.addEventListener("wheel", cancelWheel, { passive: false });
    return () => document.body.removeEventListener("wheel", cancelWheel);
  }, []);

  return {
    onWheel,
  };
}
