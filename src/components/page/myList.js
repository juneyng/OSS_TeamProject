/*
import React from 'react'
import styled from "styled-components";

const MainContainer = styled.div`
  background-color: #F6F7FB;
  height: 100vh;
  width: 100vw;
`;

const Card = styled.div`
  height: 20vh;
  background-color: white;

  margin: 5vh 5vh 5vh 5vh;
  padding: 5vh 10vh;

  display: flex;
  flex-direction: row;

`;

const Menu = styled.h3`
`;

const MenuType = styled.p`
`;

const CookTime = styled.p`

`;

const FoodLevel = styled.p`
`;

const FoodScore = styled.p`
`;

export default function myList() {
  return (
    <MainContainer>
      <Card>
        <Menu>새우 두부 계란찜</Menu>
        <MenuType>반찬</MenuType>
        <CookTime>1.5h</CookTime>
        <FoodLevel>Hard</FoodLevel>
        <FoodScore>3.0 / 5.0</FoodScore>
      </Card>
    </MainContainer>
  )
}
*/

import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Container,
  Title,
  Button,
  List,
  ListItem,
  NoteHeader,
  MenuInfo,
  MenuName,
  Ingredients,
  ReviewContainer,
  ReviewItem,
  Comment,
  Actions,
} from '../styled_components';
import { FaPen, FaTrash, FaClock, FaStar, FaLevelUpAlt } from 'react-icons/fa';

export default function ShowList() {
  const [notes, setNotes] = useState([]);

  const getData = async () => {
    try {
      const response = await fetch(
        'https://672819f2270bd0b975546091.mockapi.io/api/v1/recipeNote'
      );
      const data = await response.json();
      setNotes(data);
    } catch (error) {
      console.error('데이터 가져오기 오류:', error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const deleteData = async (id) => {
    try {
      await fetch(
        `https://672819f2270bd0b975546091.mockapi.io/api/v1/recipeNote/${id}`,
        {
          method: 'DELETE',
        }
      );
      getData();
    } catch (error) {
      console.error('데이터 삭제 오류:', error);
    }
  };

  return (
    <Container>
      <Title>요리 노트 목록</Title>
      <div style={{ textAlign: 'right', marginBottom: '20px' }}>
        <Button onClick={getData}>데이터 새로고침</Button>
        <Link to="/create">
          <Button>노트 추가</Button>
        </Link>
      </div>
      <List>
        {notes.map((note) => (
          <ListItem key={note.id}>
            <NoteHeader>
              <MenuInfo>
                <MenuName>{note.menuName}</MenuName>
                <Ingredients>재료: {note.ingredients}</Ingredients>
              </MenuInfo>
              {note.haveReview && (
                <ReviewContainer>
                  {note.cookTime && (
                    <ReviewItem>
                      <FaClock />
                      {note.cookTime}
                    </ReviewItem>
                  )}
                  {note.cookLevel && (
                    <ReviewItem>
                      <FaLevelUpAlt />
                      난이도: {note.cookLevel}
                    </ReviewItem>
                  )}
                  {note.foodScore && (
                    <ReviewItem>
                      <FaStar />
                      평점: {note.foodScore}
                    </ReviewItem>
                  )}
                </ReviewContainer>
              )}
              <Actions>
                <Link to={`/update/${note.id}`}>
                  <Button>
                    <FaPen />
                  </Button>
                </Link>
                <Button onClick={() => deleteData(note.id)}>
                  <FaTrash />
                </Button>
              </Actions>
            </NoteHeader>
            {note.haveReview && note.foodComment && (
              <Comment>{note.foodComment}</Comment>
            )}
          </ListItem>
        ))}
      </List>
    </Container>
  );
}
