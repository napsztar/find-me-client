import React, { useContext, useState } from 'react';
import '../../styles/main.scss';
import QuestionContext from '../../contexts/question';
import Header from '../../components/Header/Header';
import { isEmptyObject } from '../../utils/common';
import { store } from '../../contexts/store';
import axios from 'axios';
import { OneModal } from '../../components/Modal/Modal';
import qImg from '../../image/q.png';
import requests from '../../utils/requests';

const Add = ({ history }) => {
  const { state, actions } = useContext(QuestionContext);
  const [answerContent, setAnswerContent] = useState('');
  const [isModalDisplay, setIsModalDisplay] = useState(false);

  const [storeState] = useContext(store);

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
            requests.ADD_ANSWER_PATH,
            {
              answerId: state.question.answerId,
              answerContent: answerContent,
              accessToken: storeState.accToken,
            },
            { 'Content-Type': 'application/json', withCredentials: true },
          );

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
