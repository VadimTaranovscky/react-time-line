import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Input, Radio, Select, Tag } from "antd";
import { CaretLeftOutlined, CaretRightOutlined } from "@ant-design/icons";

import DateLine from "./components/DateLine";
import CurrentDate from "./components/CurrentDate";

import { StupidType } from "../../store/types";
import { TDateType } from "../../types";
import { filterBySkills, searchUsers } from "../../store/models/users/actions";
import { selectSkills } from "../../store/models/users/selectors";

interface IProps {
  dateType: TDateType;
  currentDate: Date;
  onScale: React.Dispatch<TDateType>;
  onPrev: React.Dispatch<void>;
  onNext: React.Dispatch<void>;
  onSetMonth: (val: number) => void;
  onSetYear: (val: number) => void;
}

const ToolBar: React.FC<IProps> = ({
  dateType,
  currentDate,
  onScale,
  onPrev,
  onNext,
  onSetMonth,
  onSetYear,
}): JSX.Element => {
  const dispatch = useDispatch();

  const skills = useSelector(selectSkills);

  const tagRender = (props: StupidType): JSX.Element => (
    <Tag
      color={props.value}
      closable={props.closable}
      onClose={props.onClose}
      style={{ marginRight: 3 }}
    >
      {props.label}
    </Tag>
  );

  const handleFilterChange = (v: StupidType, option: StupidType): void => {
    dispatch(
      filterBySkills(option.map((item: StupidType) => item.label.toLowerCase()))
    );
  };

  return (
    <div>
      <div className='controlLine'>
        <div className='controlLine__shortBlock'>
          <Input
            style={{ width: "100%" }}
            onChange={e => dispatch(searchUsers(e.target.value.toLowerCase()))}
            allowClear
            placeholder='Введите имя сотрудника'
          />
        </div>
        <Select
          mode='multiple'
          allowClear
          style={{ width: "50%" }}
          tagRender={tagRender}
          placeholder='Укажите навыки'
          options={skills}
          onChange={handleFilterChange}
        />

        <CurrentDate
          currentDate={currentDate}
          dateType={dateType}
          onSetMonth={onSetMonth}
          onSetYear={onSetYear}
        />
      </div>
      <div className='controlLine'>
        <div className='controlLine__shortBlock'>
          <Radio.Group
            onChange={({ target }) => onScale(target.value)}
            value={dateType}
          >
            <Radio.Button value='month'>Месяц</Radio.Button>
            <Radio.Button value='year'>Год</Radio.Button>
          </Radio.Group>
          <Button.Group>
            <Button onClick={() => onPrev()} type='ghost'>
              <CaretLeftOutlined />
            </Button>
            <Button onClick={() => onNext()} type='ghost'>
              <CaretRightOutlined />
            </Button>
          </Button.Group>
        </div>
        <DateLine activeDate={currentDate} type={dateType} />
      </div>
    </div>
  );
};

export default ToolBar;
