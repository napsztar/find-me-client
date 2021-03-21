import React, { useState, useEffect } from 'react';
import axios from 'axios';
import logo from '../image/logo.png';

const Intro = () => {
  const [question, setQuestion] = useState(null);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        const response = await axios.post(
          `${process.env.REACT_APP_SERVER_HOST}/question`,
          {},
          { 'Content-Type': 'application/json' },
        );
        setQuestion(response.data);
      } catch (e) {
        console.log(e);
      }
      setLoading(false);
    })();
  }, []);
  if (loading) {
    return <div>loading...</div>;
  }
  if (!question) {
    return null;
  }
  console.log(question);

  return (
    <div className="container intro">
      <div className="logo-container">
        <img src={logo} alt="logo" width="380px" height="320px"></img>
      </div>
      <div className="title">Today's carrot question</div>
      <div className="today-question">{question.questionContent}</div>
      <div>이미지</div>
    </div>
  );
};
export default Intro;
