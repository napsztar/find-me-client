import React, { useState, useEffect, useContext } from 'react';
import '../../styles/main.scss';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { MdModeEdit } from 'react-icons/md';
import FloatingButton from '../../utils/FloatingButton';
import { isEmptyObject } from '../../utils/common';
import Header from '../header/Header';
import { store } from '../../contexts/store';
import ink from '../../image/fepen.png';

const ListItem = ({ question }) => {
  return (
    <Link to={`/answer/${question.answerId}`}>
      <div className="item">
        <img src={ink} alt="ink" />
        <span className="question">{question.questionContent}</span>
      </div>
    </Link>
  );
};

const List = () => {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [storeState, dispatch] = useContext(store);
  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        const response = await axios.post(
          `${process.env.REACT_APP_SERVER_HOST}/answer`,
          { accessToken: storeState.accToken },
          { 'Content-Type': 'application/json', withCredentials: true },
        );
        if (response.data.message === 'The data does not exist') {
        } else {
          setQuestions(response.data);
          const _questions = response.data;
          setQuestions(
            _questions.filter(question => {
              return (
                question.answerContent !== null || question.answerContent !== ''
              );
            }),
          );
        }
      } catch (e) {
        console.log(e);
      }
      setLoading(false);
    })();
  }, []);
  if (loading) {
    return <div>대기 중...</div>;
  }
  if (questions.length === 0) {
    return (
      <div className="container">
        작성된 일기가 없습니다. 다시 시도해주세요.
      </div>
    );
  }
  return (
    <div className="container">
      <Header />
      <div className="content list">
        {questions.map(question => (
          <ListItem question={question} key={question.answerId} />
        ))}
      </div>
    </div>
  );
};

export default List;
