import React, { useEffect, useContext } from 'react';
import axios from 'axios';
import logo from '../image/logo.png';
import introImg from '../image/CARROT-main-image.png';
import QuestionContext from '../contexts/question';
import { equalsDate, isEmptyObject } from '../utils/common';
import { Link } from 'react-router-dom';
import FloatingButton from '../components/FloatingButton/FloatingButton';
import { MdModeEdit } from 'react-icons/md';
import { store } from '../contexts/store';
import requests from '../utils/requests';
const Intro = () => {
  const { state, actions } = useContext(QuestionContext);
  const [tokenState] = useContext(store);
  useEffect(() => {
    if (
      isEmptyObject(state.question) ||
      !equalsDate(state.question.questionAt)
    ) {
      (async () => {
        actions.setLoading(true);
        try {
          const response = await axios.post(
            requests.GET_QUESTION_PATH,
            { accessToken: tokenState.accToken },
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
    }; // eslint-disable-next-line
  }, []);
  if (state.loading) {
    return <div>loading...</div>;
  }
  if (!state.question) {
    return <div>죄송합니다. 오류가 발생하였습니다.</div>;
  }
  return (
    <div className="container">
      <div className="content intro">
        <div className="logo-container">
          <img src={logo} alt="logo" width="100%" />
        </div>
        <div className="title">Today's question</div>
        <div className="today-question">{state.question.questionContent}</div>
        <Link to={'/answer/'}>
          <img
            className="diary"
            src={introImg}
            alt="carrot"
            width="400px"
            height="445x"
          />
        </Link>
        <FloatingButton children={<MdModeEdit size={25} />} to="/answer/add" />
      </div>
    </div>
  );
};

export default Intro;
