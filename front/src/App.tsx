import React, { useEffect } from "react";

import Calendar from "./components/Calendar";
import ToolBar from "./components/ToolBar";

import { fetchUsers } from "./store/models/users/actions";

import { useCalendarState } from "./hooks";
import { useDispatch } from "react-redux";

const App: React.FC = (): JSX.Element => {
  const { state, setType, offsetDate } = useCalendarState();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchUsers());
  }, []);

  return (
    <div style={{ maxWidth: 1350, margin: "auto" }}>
      <ToolBar
        dateType={state.type}
        currentDate={state.currentDate}
        onScale={type => setType(type)}
        onPrev={() => offsetDate(-1)}
        onNext={() => offsetDate(1)}
      />
      <Calendar dateType={state.type} currentDate={state.currentDate} />
    </div>
  );
};

export default App;
