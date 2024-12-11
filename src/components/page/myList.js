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

  // 리뷰가 있는 요리와 없는 요리로 분류
  const reviewedNotes = notes.filter(note => note.haveReview);
  const toTryNotes = notes.filter(note => !note.haveReview);

  // ingredients에서 줄 바꿈을 HTML <br />로 변환
  const formatIngredients = (ingredients) => {
    // 줄 바꿈 문자를 <br />로 변환
    const formattedIngredients = ingredients.replace(/\n/g, '<br />');
    return <Ingredients dangerouslySetInnerHTML={{ __html: `재료: ${formattedIngredients}` }} />;
  };

  return (
    <Container>

      <div style={{ textAlign: 'right', marginBottom: '20px' }}>
        <Button onClick={getData}>데이터 새로고침</Button>
        <Link to="/create">
          <Button>노트 추가</Button>
        </Link>
      </div>

      {/* 리뷰 남긴 요리 제목 */}
      {reviewedNotes.length > 0 && (
        <div style={{ backgroundColor: '#6cc357', padding: '10px', marginBottom: '10px', borderRadius: '5px' }}>
          <h2 style={{ color: 'white', margin: 0 }}>리뷰 남긴 요리</h2>
        </div>
      )}

      {/* 리뷰 남긴 요리 목록 */}
      <List>
        {reviewedNotes.map((note) => (
          <ListItem key={note.id}>
            <NoteHeader>
              <MenuInfo>
                <MenuName>{note.menuName}</MenuName>
                {formatIngredients(note.ingredients)}
              </MenuInfo>
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
            </NoteHeader>
            {note.foodComment && (
              <Comment>{note.foodComment}</Comment>
            )}
          </ListItem>
        ))}
      </List>

      {/* 해보고 싶은 요리 제목 */}
      {toTryNotes.length > 0 && (
        <div style={{ backgroundColor: '#6cc357', padding: '10px', marginBottom: '10px', borderRadius: '5px' }}>
          <h2 style={{ color: 'white', margin: 0 }}>해보고 싶은 요리</h2>
        </div>
      )}

      {/* 해보고 싶은 요리 목록 */}
      <List>
        {toTryNotes.map((note) => (
          <ListItem key={note.id}>
            <NoteHeader>
              <MenuInfo>
                <MenuName>{note.menuName}</MenuName>
                {formatIngredients(note.ingredients)}
              </MenuInfo>
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
          </ListItem>
        ))}
      </List>
    </Container>
  );
}
