import React, { useState } from 'react';
import '../../styles/main.scss';
import { Alert, OneModal, TwoModal } from '../../utils/Modal';

const TestModal = ({ history }) => {
  const [isModalDisplay, setIsModalDisplay] = useState(false);
  const handleModalDisplay = isOk => {
    setIsModalDisplay(false);
    if (isOk) {
      // history.push('/'); // push 아니어도 닫히고 할 로직 적용 예시일뿐
    }
  };
  return (
    <div className="container">
      <div className="content">
        <button
          type="button"
          onClick={() => {
            setIsModalDisplay(true);
          }}
        >
          모달 창 열기
        </button>
      </div>
      {/*반드시 container 안에 위치해야한다. 주석 하나씩 제거하면서 사용해 볼 것*/}
      <Alert
        isModalDisplay={isModalDisplay}
        handleModalDisplay={handleModalDisplay}
        message="테스트 모달메세지"
      />
      {/*<OneModal*/}
      {/*  isModalDisplay={isModalDisplay}*/}
      {/*  handleModalDisplay={handleModalDisplay}*/}
      {/*  message="테스트 모달메세지"*/}
      {/*/>*/}
      {/*<TwoModal*/}
      {/*  isModalDisplay={isModalDisplay}*/}
      {/*  handleModalDisplay={handleModalDisplay}*/}
      {/*  message="테스트 모달메세지"*/}
      {/*/>*/}
    </div>
  );
};
export default TestModal;
