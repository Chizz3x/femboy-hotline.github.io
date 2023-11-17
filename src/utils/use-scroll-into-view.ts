import React from "react";

export default (ref: React.RefObject<HTMLElement>, threshold = 0) => {
  const [ scrolledIntoView, setScrolledIntoView ] = React.useState(false);
  const [ isInView, setIsInView ] = React.useState(false);

  React.useEffect(() => {
    let observer: IntersectionObserver | null;

    if(ref.current) {
      observer = new IntersectionObserver(([entry]) => {
        setScrolledIntoView((state) => state || entry.isIntersecting);
        setIsInView(entry.isIntersecting);
      }, { threshold: threshold, });
      observer.observe(ref.current);
    }

    return () => {
      observer?.disconnect();
    };
  }, [ref.current]);

  return {
    scrolledIntoView,
    isInView
  };
};