import { createContext, useState } from "react";

const FilterContext = createContext({
  filterCriteria: "None",
  minValue: 0,
  maxValue: 0,
  currValue: 0,
  changeFilter: (filter: string) => {},
  updateMinMax: (min: number, max: number) => {},
  updateCurrentValue: (val: number) => {},
});

export const FilterContextProvider = (props: any) => {
  const [filterCriteria, setFilterCriteria] = useState("None");
  const [maxValue, setMaxValue] = useState(0);
  const [minValue, setMinValue] = useState(0);
  const [currValue, setCurrValue] = useState(0);

  const changeFilter = (filter: string) => {
    setFilterCriteria(() => filter);
  };

  const updateMinMax = (min: number, max: number) => {
    setMinValue(() => min);
    setMaxValue(() => max);
  };

  const updateCurrentValue = (val: number) => {
    setCurrValue(() => val);
  };

  const context = {
    filterCriteria: filterCriteria,
    changeFilter: changeFilter,
    minValue: minValue,
    maxValue: maxValue,
    currValue: currValue,
    updateMinMax: updateMinMax,
    updateCurrentValue: updateCurrentValue,
  };

  return (
    <FilterContext.Provider value={context}>
      {props.children}
    </FilterContext.Provider>
  );
};

export default FilterContext;
