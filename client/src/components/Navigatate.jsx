// import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Navigate = () => {
  const navigate = useNavigate();

  const hash = localStorage.getItem('hash');

  const toExit = () => {
    localStorage.removeItem('hash');
    navigate('/')
  }

  return (
    <div className="w-100 pt-2 pb-2 border-bottom border-white fixed-top">
      <div className="container d-flex justify-content-end">
        <button disabled={!hash} onClick={toExit}>Exit</button>
      </div>
    </div>
  )
}

export default Navigate;