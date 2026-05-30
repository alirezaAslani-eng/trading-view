const ENV_CHECK = {
  isSerevr: typeof window === "undefined",
  isClient: typeof window !== "undefined",
};

export default ENV_CHECK;
