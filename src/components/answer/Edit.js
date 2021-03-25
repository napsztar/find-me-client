import React, { useEffect, useState, useContext } from 'react';
import '../../styles/main.scss';
import Header from '../header/Header';
import axios from 'axios';
import { isEmptyObject } from '../../utils/common';
import { store } from '../../contexts/store';
import { OneModal } from '../../utils/Modal';
import qImg from '../../image/q.png';


const Edit = ({ match, history }) => {
  const answerId = match.params.answerId;
  const [loading, setLoading] = useState(false);
  const [answer, setAnswer] = useState({});
  const [editAnswer, setEditAnswer] = useState('');
  const [isModalDisplay, setIsModalDisplay] = useState(false);
  const [storeState, dispatch] = useContext(store);

  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        const response = await axios.post(
          `${process.env.REACT_APP_SERVER_HOST}/answer/read`,
          { answerId: answerId, accessToken: storeState.accToken },
          { 'Content-Type': 'application/json', withCredentials: true },
        );
        if (response.data) {
          setAnswer(response.data);
          setEditAnswer(response.data.answerContent);
        }
      } catch (e) {
        console.log(e);
      }
      setLoading(false);
    })();
  }, []);
  if (loading) {
    return <div>loading...</div>;
  }

  const handleModalDisplay = isOk => {
    setIsModalDisplay(false);
    if (isOk) {
      history.push('/answer');
    }
  };

  const handleEditAnswer = () => {
    if (editAnswer !== '') {
      (async () => {
        try {
          const response = await axios.post(
            `${process.env.REACT_APP_SERVER_HOST}/answer/edit`,
            {
              answerId: answer.answerId,
              answerContent: editAnswer,
              accessToken: storeState.accToken,
            },
            { 'Content-Type': 'application/json', withCredentials: true },
          );
          if (
            response.data.message === 'A answer has been successfully updated'
          ) {
            setIsModalDisplay(true);
          }
        } catch (e) {
          console.log(e);
        }
      })();
    }
  };
  if (isEmptyObject(answer)) {
    return null;
  }
  return (
    <div className="container">
      <Header />
      <div className="content edit">
        <div className="edit-question">
          <img src={qImg} alt="q" width="100px" height="100px" />
          <span>{answer.questionContent}</span>
        </div>
        <textarea
          value={editAnswer}
          onChange={e => {
            setEditAnswer(e.target.value);
          }}
        />
        <div>
          <button className="answer-btn" onClick={handleEditAnswer}>
            수정
          </button>
        </div>
      </div>
      <OneModal
        isModalDisplay={isModalDisplay}
        handleModalDisplay={handleModalDisplay}
        message="수정되었습니다."
      />
    </div>
  );
};
export default Edit;
