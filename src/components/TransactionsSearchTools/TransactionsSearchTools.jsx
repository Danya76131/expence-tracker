// import { useDispatch, useSelector } from "react-redux";
// import { useEffect } from "react";

import { format } from "date-fns";
// import {
//   changeDate,
//   changeFilter,
//   resetFilter,
// } from "../../redux/filter/slice";
// import { selectDate, selectFilter } from "../../redux/filter/selectors";
import Icon from "../../components/UI/Icon/Icon";

import style from "./TransactionsSearchTools.module.css";
import DatePicker from "react-datepicker";
import { clsx } from "clsx";
import Button from "../UI/Button/Button";
import { useSearchParams } from "react-router-dom";

export const TransactionsSearchTools = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const changeFilterValue = (e) => {
    const newFilter = e.target.value;
    const newParams = new URLSearchParams(searchParams);
    if (newFilter) {
      newParams.set("search", newFilter);
    } else {
      newParams.delete("search");
    }
    setSearchParams(newParams);
  };

  const changeDateValue = (dateObj) => {
    const formatted = dateObj ? format(dateObj, "yyyy-MM-dd") : null;
    const newParams = new URLSearchParams(searchParams);
    if (formatted) {
      newParams.set("date", formatted);
    } else {
      newParams.delete("date");
    }
    setSearchParams(newParams);
  };

  const handleResetFilter = () => {
    setSearchParams({});
  };
  /////////////
  // const dispatch = useDispatch();
  // const filter = useSelector(selectFilter);
  // const changeFilterValue = (e) => {
  //   dispatch(changeFilter(e.target.value));
  // };

  // useEffect(() => {
  //   dispatch(resetFilter());
  // }, [type, dispatch]);

  // const date = useSelector(selectDate);
  // // const changeDateValue = (e) => {
  //   if (!e) {
  //     dispatch(changeDate(format(new Date(), "yyyy-MM-dd")));
  //     return;
  //   }
  //   dispatch(changeDate(format(e, "yyyy-MM-dd")));
  // };
  // const handleResetFilter = () => {
  //   dispatch(resetFilter());
  // };

  return (
    <div className={style.formContainer}>
      <form action="" className={style.formBox}>
        <div className={clsx(style.filterContainer)}>
          <input
            // value={filter}
            value={searchParams.get("search") || ""}
            onChange={changeFilterValue}
            type="text"
            className={style.formInput}
            placeholder="Search for anything.."
          />

          <Icon name="search" className={style.icon} size={20} />
        </div>

        <div className={clsx(style.datepickerContainer)}>
          <DatePicker
            className={style.formCalendar}
            // selected={date}
            selected={
              searchParams.get("date")
                ? new Date(searchParams.get("date"))
                : null
            }
            onChange={changeDateValue}
            showPopperArrow={false}
            maxDate={new Date()}
            placeholderText="dd/mm/yyyy"
          />

          <Icon name="calendar" className={style.icon} size={20} />
        </div>
        <Button
          type="button"
          onClick={handleResetFilter}
          className={style.resetButton}
        >
          Reset
        </Button>
      </form>
    </div>
  );
};
