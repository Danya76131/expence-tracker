import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

import { format } from "date-fns";
import {
  changeDate,
  changeFilter,
  resetFilter,
} from "../../redux/filter/slice";
import { selectDate, selectFilter } from "../../redux/filter/selectors";
import Icon from "../../components/UI/Icon/Icon";
// import { UniversalButton } from "../UniversalButton/UniversalButton";
import style from "./TransactionsSearchTools.module.css";
import DatePicker from "react-datepicker";
export const TransactionsSearchTools = ({ type }) => {
  const dispatch = useDispatch();
  const filter = useSelector(selectFilter);
  const changeFilterValue = (e) => {
    dispatch(changeFilter(e.target.value));
  };

  useEffect(() => {
    dispatch(resetFilter());
  }, [type, dispatch]);

  const date = useSelector(selectDate);
  const changeDateValue = (e) => {
    if (!e) {
      dispatch(changeDate(format(new Date(), "yyyy-MM-dd")));
      return;
    }
    dispatch(changeDate(format(e, "yyyy-MM-dd")));
  };

  // const handleResetFilter = () => {
  //   dispatch(resetFilter());
  // };

  return (
    <div className={style.formContainer}>
      <form action="" className={style.formBox}>
        <div className={style.filterContainer}>
          <input
            value={filter}
            onChange={changeFilterValue}
            type="text"
            className={style.formInput}
            placeholder="Search for anything.."
          />

          {/* <Icon
            name="search"
            // className={style.iconSearch}
            size={20}
            fill="white"
            stroke="white"
          /> */}
        </div>

        <div className={style.datepickerContainer}>
          <DatePicker
            className={style.formCalendar}
            selected={date}
            onChange={changeDateValue}
            showPopperArrow={false}
            maxDate={new Date()}
            placeholderText="dd/mm/yyyy"
          />

          {/* <Icon
            name="calendar"
            // className={style.iconDate}
            size={20}
          /> */}
        </div>
        {/* <UniversalButton action={handleResetFilter} type="reset" />
        <UniversalButton className={style.addBtn} action={handleOpenModal} /> */}
      </form>
    </div>
  );
};
