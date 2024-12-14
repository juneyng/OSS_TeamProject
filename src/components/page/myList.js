import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
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
  MenuName2,
} from "../styled_components";
import { FaPen, FaTrash, FaClock, FaStar, FaLevelUpAlt } from "react-icons/fa";
import { PiNotePencilBold } from "react-icons/pi";
import styled from "styled-components";

const Container = styled.div`
  max-width: 1200px;
  margin: 20px auto;
  padding: 20px;
`;

export default function ShowList() {
  const [notes, setNotes] = useState([]);

  const getData = async () => {
    try {
      const response = await fetch(
        "https://672819f2270bd0b975546091.mockapi.io/api/v1/recipeNote"
      );
      const data = await response.json();
      setNotes(data);
    } catch (error) {
      console.error("데이터 가져오기 오류:", error);
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
          method: "DELETE",
        }
      );
      alert("삭제되었습니다.");
      getData();
    } catch (error) {
      console.error("데이터 삭제 오류:", error);
    }
  };

  // 리뷰가 있는 요리와 없는 요리로 분류
  const reviewedNotes = notes.filter((note) => note.haveReview);
  const toTryNotes = notes.filter((note) => !note.haveReview);

  // ingredients에서 줄 바꿈을 HTML <br />로 변환
  const formatIngredients = (ingredients, menuName) => {
    let formattedIngredients = ingredients;

    if (!ingredients.startsWith('●')) {
      // 첫 줄 제거 (첫 번째 \n 이후 문자열만 사용)
      const splitIngredients = ingredients.split('\n');
      splitIngredients.shift(); // 첫 번째 줄 제거
      formattedIngredients = splitIngredients.join(', ');
    }

    formattedIngredients = formattedIngredients.replace(/\n/g, "<br />");
    return (
      <Ingredients
        dangerouslySetInnerHTML={{ __html: `${formattedIngredients}`}}
      />
    );
  };

  return (
    <Container>

      {/* 리뷰 남긴 요리 목록 */}
      {reviewedNotes.length > 0 && (
        <div
          style={{
            backgroundColor: "#6cc357",
            padding: "10px",
            marginBottom: "10px",
            borderRadius: "5px",
          }}
        >
          <h2 style={{ textAlign: "center", color: "white", margin: 0 }}>
            리뷰 남긴 요리
          </h2>
        </div>
      )}

      <List>
        {reviewedNotes.map((note) => (
          <ListItem key={note.id}>
            <NoteHeader>
              <MenuInfo>
                <div style={{display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #d2d2d2', paddingBottom: '7px', marginBottom: '7px'}}>
                  <MenuName>{note.menuName}</MenuName>
                  <Actions style={{justifySelf: 'flex-end'}}>
                    <Link to={`/updateReview/${note.id}`}>
                      <Button>
                        <FaPen />
                      </Button>
                    </Link>
                    <Button onClick={() => deleteData(note.id)}>
                      <FaTrash />
                    </Button>
                  </Actions>
                </div>
                <MenuName2>재료</MenuName2>
                {formatIngredients(note.ingredients, note.menuName)}
              
              {note.haveReview && (
                <ReviewContainer>
                <MenuName2>나의 리뷰</MenuName2>
                <div style={{display: 'flex'}}>
                  {note.cookTime && (
                    <ReviewItem>
                      <FaClock />
                      {note.cookTime}
                    </ReviewItem>
                  )}
                  {note.cookLevel && (
                    <ReviewItem>
                      <FaLevelUpAlt />
                      난이도: {note.cookLevel} / 5
                    </ReviewItem>
                  )}
                  {note.foodScore && (
                    <ReviewItem>
                      <FaStar />
                      평점: {note.foodScore} / 5
                    </ReviewItem>
                  )}
                </div>
                </ReviewContainer>
              )}
              </MenuInfo>
            </NoteHeader>
            {note.foodComment && <Comment>{note.foodComment}</Comment>}
          </ListItem>
        ))}
      </List>

      {/* 해보고 싶은 요리 목록 */}
      {toTryNotes.length > 0 && (
        <div style={{ backgroundColor: '#6cc357', padding: '10px', marginBottom: '10px', borderRadius: '5px', marginTop: '40px' }}>
          <h2 style={{ textAlign: 'center', color: 'white', margin: 0 }}>해보고 싶은 요리</h2>
        </div>
      )}

      <List>
        {toTryNotes.map((note) => (
          <ListItem key={note.id}>
            <NoteHeader>
              <MenuInfo>
                <div style={{display: 'flex', justifyContent: 'space-between'}}>
                  <MenuName>{note.menuName}</MenuName>
                  <Actions>
                    <Link to={`/createReview/${note.id}`}>
                      <Button><PiNotePencilBold /></Button>
                    </Link>
                    <Button onClick={() => deleteData(note.id)}>
                      <FaTrash />
                    </Button>
                  </Actions>
                </div>
                {formatIngredients(note.ingredients, note.menuName)}
              </MenuInfo>
              
            </NoteHeader>
          </ListItem>
        ))}
      </List>
    </Container>
  );
}
