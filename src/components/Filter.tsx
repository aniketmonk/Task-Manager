import * as React from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { useDispatch, useSelector } from "react-redux";
import { setFilter } from "../features/tasksSlice";
import { RootState } from "../store";

export default function SelectInput() {
  //   const [filter, setFilter] = React.useState("");
  const { filter } = useSelector((state: RootState) => state.tasks);
  const dispatch = useDispatch();

  const handleChange = (event: SelectChangeEvent) => {
    //@ts-ignore
    dispatch(setFilter(event.target.value));
  };

  return (
    <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
      <InputLabel id="demo-select-small-label">Filters</InputLabel>
      <Select
        labelId="demo-select-small-label"
        id="demo-select-small"
        value={filter}
        label="Age"
        onChange={handleChange}
      >
        <MenuItem value="">
          <em>None</em>
        </MenuItem>
        <MenuItem value={"all"}>All</MenuItem>
        <MenuItem value={"complete"}>Complete</MenuItem>
        <MenuItem value={"incomplete"}>Incomplete</MenuItem>
        <MenuItem value={"sort"}>sort by due date</MenuItem>
      </Select>
    </FormControl>
  );
}
