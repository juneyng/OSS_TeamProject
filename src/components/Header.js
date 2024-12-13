import React from 'react';
import cookingnote from "./page/cookingnote.jpg";
import styled from 'styled-components';
import { Link, useLocation } from 'react-router-dom';

const Container = styled.div`
  position: relative;
  max-width: 1200px;
  margin: 20px auto;
  padding: 20px;

  display: flex;
  justify-content: center;
  align-items: flex-start;
  margin-top: 30px;

`;

const Logo = styled.img`
  width: 250px;
`;

const TopButton = styled.a`
  position: absolute;
  right: 0;
  top: 10%;

  text-decoration: none;
  background-color: #ffb124;
  color: #fff;

  padding: 8px 16px;
  border-radius: 10px;
  transition: color 0.3s ease, transform 0.3s ease;
`;

export default function Header() {
  const location = useLocation();
  const linkTo = location.pathname === "/recipe-list"? "/mylist" : "/recipe-list";
  return (
    <Container>
      <Link to="/recipe-list">
        <Logo src={cookingnote} alt="요리 노트"/>
      </Link>
      <TopButton href={linkTo}>{location.pathname === "/recipe-list" ? "내 레시피" : "레시피 목록"}</TopButton>
    </Container>
  )
}
