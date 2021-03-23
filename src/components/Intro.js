import React, { useEffect, useContext } from 'react';
import axios from 'axios';
import logo from '../image/logo.png';
//import introImg from '../image/intro.jpg';
import gold from '../image/gold-image.png';
import QuestionContext from '../contexts/question';
import { equalsDate, isEmptyObject } from '../utils/common';
import { Link } from 'react-router-dom';
import FloatingButton from '../utils/FloatingButton';
import { MdModeEdit } from 'react-icons/md';

const Intro = () => {
  const { state, actions } = useContext(QuestionContext);
  useEffect(() => {
    if (
      isEmptyObject(state.question) ||
      !equalsDate(state.question.questionAt)
    ) {
      (async () => {
        actions.setLoading(true);
        try {
          const response = await axios.post(
            `${process.env.REACT_APP_SERVER_HOST}/intro`,
            {},
            { 'Content-Type': 'application/json' },
          );
          console.log(response.data);

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
  if (!state.question) {
    return null;
  }
  return (
    <div className="container intro">
      <div className="logo-container">
        <img src={logo} alt="logo" width="100%" />
      </div>
      <div className="title">Today's carrot question</div>
      <div className="today-question">{state.question.questionContent}</div>
      <Link to={'/answer/'}>
        <img src={gold} alt="gold" width="250px" height="285px" />
      </Link>
      <FloatingButton children={<MdModeEdit size={25} />} to="/answer/add" />
    </div>
  );
};

export default Intro;
