import React, { useContext, useEffect, useState } from 'react';
import '../../styles/main.scss';
import QuestionContext from '../../contexts/question';
import Header from '../header/Header';
import { equalsDate, isEmptyObject } from '../../utils/common';
import axios from 'axios';
import Modal from '../../utils/Modal';

const Add = ({ history }) => {
  const { state, actions } = useContext(QuestionContext);
  const [answerContent, setAnswerContent] = useState('');
  const [isModalDisplay, setIsModalDisplay] = useState(false);
  const handleModalDisplay = value => {
    setIsModalDisplay(value);
  };

  const handleAddAnswer = () => {
    if (answerContent !== '') {
      (async () => {
        actions.setLoading(true);
        try {
          const response = await axios.post(
            `${process.env.REACT_APP_SERVER_HOST}/answer/add`,
            { answerId: state.question.answerId, answerContent: answerContent },
            { 'Content-Type': 'application/json', withCredentials: true },
          );

          // 로그인이 안 되어 있으면 페이지로 보내기
          if (response.data.message) {
            if (response.data.message === 'invalid access token') {
              // history.push('/');
            } else if (response.data.message === 'Success') {
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
    return null;
  }
  return (
    <div className="container add">
      <div className="content">
        <Header />
        <div className="add-question">{state.question.questionContent}</div>
        <textarea
          placeholder={'일기를 써주세요'}
          onChange={e => {
            setAnswerContent(e.target.value);
          }}
        />
        <button onClick={handleAddAnswer}>등록</button>
        <Modal
          isModalDisplay={isModalDisplay}
          handleModalDisplay={handleModalDisplay}
          message="성공적으로 등록되었습니다."
        />
      </div>
    </div>
  );
};
export default Add;
