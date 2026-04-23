import randomNumber from "@/utils/app/randomNumber";
import { useEffect, useState } from "react";

function useRndomID() {
  const [randomID, setRandomID] = useState("");
  useEffect(() => {
    setRandomID(randomNumber());
  }, [setRandomID]);

  return randomID;
}

export default useRndomID;
