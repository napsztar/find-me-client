import React from 'react';

export const Alert = ({ isModalDisplay, handleModalDisplay, message }) => {
  return (
    <div
      className="modal"
      style={{ display: isModalDisplay ? 'block' : 'none' }}
    >
      <div className="modal-layer" />
      <div className="modal-content">
        <p>{message}</p>
        <div className="modal-one-btn">
          <button
            className="btn cancel"
            type="button"
            onClick={() => {
              handleModalDisplay(false);
            }}
          >
            확인
          </button>
        </div>
      </div>
    </div>
  );
};

export const OneModal = ({ isModalDisplay, handleModalDisplay, message }) => {
  return (
    <div
      className="modal"
      style={{ display: isModalDisplay ? 'block' : 'none' }}
    >
      <div className="modal-background">
        <div className="modal-content">
          <p>{message}</p>
          <div className="modal-one-btn">
            <button
              className="btn confirm"
              type="button"
              onClick={() => {
                handleModalDisplay(true);
              }}
            >
              확인
            </button>
          </div>
        </div>
        <div className="modal-layer" />
      </div>
    </div>
  );
};

export const TwoModal = ({ isModalDisplay, handleModalDisplay, message }) => {
  return (
    <div
      className="modal"
      style={{ display: isModalDisplay ? 'block' : 'none' }}
    >
      <div className="modal-content">
        <p>{message}</p>
        <div className="modal-two-btn">
          <button
            className="btn cancel"
            type="button"
            onClick={() => {
              handleModalDisplay(false);
            }}
          >
            취소
          </button>
          <button
            className="btn confirm"
            type="button"
            onClick={() => {
              handleModalDisplay(true);
            }}
          >
            확인
          </button>
        </div>
      </div>
      <div className="modal-layer" />
    </div>
  );
};
