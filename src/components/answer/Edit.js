import React, { useEffect, useState, useContext } from 'react';
import '../../styles/main.scss';
import Header from '../header/Header';
import Modal from '../../utils/Modal';
import axios from 'axios';
import List from './List';
import { isEmptyObject } from '../../utils/common';
import { store } from '../../contexts/store';

const Edit = ({ match }) => {
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
        setAnswer(response.data);
        setEditAnswer(answer.answerContent);
      } catch (e) {
        console.log(e);
      }
      setLoading(false);
    })();
  }, []);
  if (loading) {
    return <div>loading...</div>;
  }

  const handleModalDisplay = value => {
    setIsModalDisplay(value);
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
          setIsModalDisplay(true);
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
    <div className="container edit">
      <Header />
      <div>{answer.questionContent}</div>
      <textarea
        value={editAnswer}
        onChange={e => {
          setEditAnswer(e.target.value);
        }}
      />
      <button onClick={handleEditAnswer}>수정하기</button>
      <Modal
        isModalDisplay={isModalDisplay}
        handleModalDisplay={handleModalDisplay}
        message="수정되었습니다"
      />
    </div>
  );
};
export default Edit;
