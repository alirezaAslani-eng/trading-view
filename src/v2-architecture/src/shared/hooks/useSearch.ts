import { objectGetter } from "@/utils";
import { useState } from "react";

function useSearch() {
  const [searchQuery, setSearchQuery] = useState("");

  const search = <K extends object>(data: K[], fieldPaths: (keyof K)[]) => {
    const query = searchQuery.trim().toLocaleLowerCase();

    if (!query) return data;

    const result = data.filter((item) =>
      fieldPaths.some((path) => {
        const value = objectGetter({ obj: item, path: path as string });
        if (value == null) return false;
        return String(value).toLocaleLowerCase().includes(query);
      })
    );

    return result;
  };

  return {
    search,
    searchQuery,
    setSearchQuery,
  };
}

export default useSearch;
