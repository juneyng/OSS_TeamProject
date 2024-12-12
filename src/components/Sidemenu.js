import React from "react";
import { Link, Outlet } from "react-router-dom";
import styled from "styled-components";

// 스타일드 컴포넌트 정의
const SideMenuContainer = styled.nav`
  position: fixed;
  top: 0;
  left: 0;
  width: 200px;
  height: 100vh;
  background-color: #6cc357;
  color: white;
  padding-top: 20px;
  box-shadow: 2px 0 5px rgba(0, 0, 0, 0.1);
`;

const MenuList = styled.ul`
  list-style-type: none;
  padding: 0;
  margin: 0;
`;

const MenuItem = styled.li`
  margin: 20px 0;
`;

const MenuLink = styled(Link)`
  text-decoration: none;
  color: white;
  font-size: 18px;
  padding: 10px 20px;
  display: block;
  border-radius: 10px;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #5aab4b;
  }
`;

const ContentWrapper = styled.div`
  margin-left: 200px; /* SideMenu의 너비만큼 여백 추가 */
  padding: 20px;
`;

// SideMenu 컴포넌트 정의
const SideMenu = () => {
  return (
    <>
      <SideMenuContainer>
        <MenuList>
          <MenuItem>
            <MenuLink to="/recipe-list">레시피 목록</MenuLink>
          </MenuItem>
          <MenuItem>
            <MenuLink to="/mylist">내 레시피</MenuLink>
          </MenuItem>
        </MenuList>
      </SideMenuContainer>
      <ContentWrapper>
        <Outlet />
      </ContentWrapper>
    </>
  );
};

export default SideMenu;
