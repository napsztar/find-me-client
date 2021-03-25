import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Edit from './Edit';
import { isEmptyObject, toDateFormat } from '../../utils/common';
import Header from '../header/Header';
import qImg from '../../image/q.png';

const Read = ({ match, history }) => {
  const { answerId } = match.params;
  const [loading, setLoading] = useState(false);
  const [answer, setAnswer] = useState({});
  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        const response = await axios.post(
          `${process.env.REACT_APP_SERVER_HOST}/answer/read`,
          { answerId: answerId },
          { 'Content-Type': 'application/json', withCredentials: true },
        );
        setAnswer(response.data);
      } catch (e) {
        console.log(e);
      }
      setLoading(false);
    })();
  }, []);
  if (loading) {
    return <div>loading...</div>;
  }

  if (isEmptyObject(answer)) {
    return null;
  }
  console.log(answer.updatedAt);

  return (
    <div className="container">
      <Header />
      <div className="content read">
        <div className="read-question">
          <img src={qImg} alt="q" width="100px" height="100px" />
          <span>{answer.questionContent}</span>
        </div>
        <div className="read-data">
          <div>질문 받은 날짜</div>
          {toDateFormat(answer.questionAt)}
        </div>

        <div className="update-date">
          <div>최근 일기 작성 날짜</div>
          {answer.updatedAt
            ? toDateFormat(answer.updatedAt)
            : toDateFormat(answer.createdAt)}
        </div>
        <div className="my-answer">내가 쓴 답변{answer.answerContent}</div>

        <button
          className="answer-btn"
          onClick={() => {
            history.push({
              pathname: `/answer/${answerId}/edit`,
              state: { answer: answer },
            });
          }}
        >
          수정하기
        </button>
      </div>
    </div>
  );
};
export default Read;
