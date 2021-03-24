import React, { useContext, useEffect, useState } from 'react';
import '../../styles/main.scss';
import QuestionContext from '../../contexts/question';
import Header from '../header/Header';
import { equalsDate, isEmptyObject } from '../../utils/common';
import axios from 'axios';
import { OneModal } from '../../utils/Modal';
import qImg from '../../image/q.png';

const Add = ({ history }) => {
  const { state, actions } = useContext(QuestionContext);
  const [answerContent, setAnswerContent] = useState('');
  const [isModalDisplay, setIsModalDisplay] = useState(false);
  const handleModalDisplay = isOk => {
    setIsModalDisplay(false);
    if (isOk) {
      history.push('/answer');
    }
  };
  const handleAddAnswer = () => {
    if (answerContent !== '' && answerContent) {
      (async () => {
        actions.setLoading(true);
        try {
          const response = await axios.post(
            `${process.env.REACT_APP_SERVER_HOST}/answer/add`,
            { answerId: state.question.answerId, answerContent: answerContent },
            { 'Content-Type': 'application/json', withCredentials: true },
          );

          // 로그인이 안 되어 있으면 페이지로 보내기
          console.log(response.data);
          if (response.data.message) {
            if (response.data.message === 'invalid access token') {
              // history.push('/');
            } else if (
              response.data.message === 'A answer has been successfully added'
            ) {
              setIsModalDisplay(true);
            }
          }
        } catch (e) {
          console.log(e);
        }
        actions.setLoading(false);
      })();
    }
  };

  useEffect(() => {
    if (isEmptyObject(state.question)) {
      (async () => {
        actions.setLoading(true);
        try {
          const response = await axios.post(
            `${process.env.REACT_APP_SERVER_HOST}/intro`,
            {},
            { 'Content-Type': 'application/json', withCredentials: true },
          );
          actions.setQuestion(response.data);
        } catch (e) {
          console.log(e);
        }
        actions.setLoading(false);
      })();
    }

    return () => {
      actions.setLoading(false);
    };
  }, []);
  if (state.loading) {
    return <div>loading...</div>;
  }
  if (isEmptyObject(state.question)) {
    return <div>죄송합니다. 오류가 발생하였습니다.</div>;
  }
  return (
    <div className="container">
      <Header />
      <div className="content add">
        <div className="add-question">
          <img src={qImg} alt="q" width="100px" height="100px" />
          <span>{state.question.questionContent}</span>
        </div>
        <div>
          <textarea
            placeholder={'일기를 써주세요'}
            rows={10}
            onChange={e => {
              setAnswerContent(e.target.value);
            }}
          />
        </div>
        <div>
          <button className="answer-btn" onClick={handleAddAnswer}>
            등록
          </button>
        </div>
      </div>
      <OneModal
        isModalDisplay={isModalDisplay}
        handleModalDisplay={handleModalDisplay}
        message="저장되었습니다."
      />
    </div>
  );
};
export default Add;
