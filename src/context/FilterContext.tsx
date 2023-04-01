import { createContext, useState } from "react";

const FilterContext = createContext({
  filterCriteria: "None",
  changeFilter: (filter: string) => {},
});

export const FilterContextProvider = (props: any) => {
  const [filterCriteria, setFilterCriteria] = useState("None");

  const changeFilter = (filter: string) => {
    setFilterCriteria(() => filter);
  };

  const context = {
    filterCriteria: filterCriteria,
    changeFilter: changeFilter,
  };

  return (
    <FilterContext.Provider value={context}>
      {props.children}
    </FilterContext.Provider>
  );
};

export default FilterContext;
