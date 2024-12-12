import React from 'react';
import "./Header.css";
import { Link } from 'react-router-dom';

export default function Header() {
  return (
    <>
      <div className="option">
        <nav>
          <ul>
            <li>밥</li>
            <li>반찬</li>
            <li>국/찌개</li>
            <li>후식</li>
            <li>기타</li>
            <Link className="li-my" to={"/mylist"}><li>내 레시피</li></Link>
          </ul>
        </nav>
      </div>
    </>
  )
}
