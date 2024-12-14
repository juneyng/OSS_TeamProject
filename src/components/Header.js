import React from "react";
import cookingnote from "./page/cookingnote.jpg";
import styled from "styled-components";
import { useLocation } from "react-router-dom";

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
  const linkTo = location.pathname === "/mylist" ? "/recipe-list" : "/mylist";
  return (
    <Container>
      <a href="/recipe-list">
        <Logo src={cookingnote} alt="요리 노트" />
      </a>
      <TopButton href={linkTo}>
        {location.pathname === "/mylist" ? "레시피 목록" : "내 레시피"}
      </TopButton>
    </Container>
  );
}
