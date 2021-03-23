import React, { useState } from 'react';
import '../../styles/main.scss';
import Header from '../header/Header';
import Modal from '../../utils/Modal';
import axios from 'axios';
import List from './List';

const Edit = ({ location }) => {
  // TODO : question state context or redux 사용 고려.. (advanced)
  const answer = location.state.answer;
  const [editAnswer, setEditAnswer] = useState(answer.answerContent);
  //console.log(answer);
  const [isModalDisplay, setIsModalDisplay] = useState(false);

  const handleModalDisplay = value => {
    setIsModalDisplay(value);
  };
  const handleEditAnswer = () => {
    if (editAnswer !== '') {
      (async () => {
        try {
          const response = await axios.post(
            `${process.env.REACT_APP_SERVER_HOST}/answer/edit`,
            { answerId: answer.answerId, answerContent: editAnswer },
            { 'Content-Type': 'application/json', withCredentials: true },
          );
          console.log(response);
          setIsModalDisplay(true);
        } catch (e) {
          console.log(e);
        }
      })();
    }
  };
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
