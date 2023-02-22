const slideLeft = {
  name: "Slide Left",
  variants: {
    initial: {
      right: "-100%",
    },
    animate: {
      right: 0,
    },
    exit: {
      right: 0,
    },
  },
  transition: {
    duration: 0.3,
  },
};

export { slideLeft };
