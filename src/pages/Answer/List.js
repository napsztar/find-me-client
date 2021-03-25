import React, { useState, useEffect, useContext } from 'react';
import '../../styles/main.scss';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Header from '../../components/Header/Header';
import { store } from '../../contexts/store';
import ink from '../../image/fepen.png';
import requests from '../../utils/requests';

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
  const [storeState] = useContext(store);
  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        const response = await axios.post(
          requests.LIST_ANSWER_PATH,
          { accessToken: storeState.accToken },
          { 'Content-Type': 'application/json', withCredentials: true },
        );
        setQuestions(response.data);
        const _questions = response.data;
        setQuestions(
          _questions.filter(question => {
            return (
              question.answerContent !== null || question.answerContent !== ''
            );
          }),
        );
      } catch (e) {
        console.log(e);
      }
      setLoading(false);
    })(); // eslint-disable-next-line
  }, []);
  if (loading) {
    return <div>대기 중...</div>;
  }
  if (questions.length === 0) {
    return <div>죄송합니다. 오류가 발생하였습니다.</div>;
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
