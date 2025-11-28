import { useMemo } from "react";
import CustomSelect from "../common/CustomSelect";

const SalesFilters = ({
  onSalespersonChange,
  salesPersons,
  selectedSalesPerson,
}) => {
  const salesPersonOptions = useMemo(
    () =>
      salesPersons.map((sp) => ({
        value: sp.name,
        label: sp.name,
      })),
    [salesPersons]
  );

  return (
    <div className="flex items-center gap-3">
      {/* Sales Person Selector */}
      <CustomSelect
        value={selectedSalesPerson}
        onChange={onSalespersonChange}
        options={salesPersonOptions}
        placeholder="Select Salesperson"
        className="w-48"
      />
    </div>
  );
};

export default SalesFilters;
