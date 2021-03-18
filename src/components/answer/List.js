import React from 'react';
import '../../styles/main.scss';

const ListItem = () => {
  return (
    <div>
      <div>
        <span>Q. 오늘의 당근: 오늘 처음으로 시도해본 활동이 있다면?</span>
      </div>
      <div>
        <span>2021-03-18</span>
      </div>
    </div>
  );
};

const List = () => {
  return (
    <div className="container">
      <div className="content">
        <ListItem />
        <ListItem />
        <ListItem />
        <ListItem />
        <ListItem />
        <ListItem />
      </div>
    </div>
  );
};

export default List;
