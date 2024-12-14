// src/components/styled_components.js
import styled from "styled-components";

// 전체 컨테이너 스타일
export const Container = styled.div`
  max-width: 800px;
  margin: 40px auto;
  padding: 20px;
  background-color: #f9f9f9; /* 밝은 배경 */
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); /* 그림자 효과 */
`;

// 타이틀 스타일
export const Title = styled.h1`
  text-align: center;
  margin-bottom: 30px;
  font-size: 2em;
  color: #333; /* 기본 텍스트 색상 */
`;

// 버튼 스타일
export const Button = styled.button`
  background-color: #6cc357; /* 녹색 버튼 */
  color: white;
  font-size: 16px;
  font-weight: bold;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s, transform 0.2s;

  &:hover {
    background-color: #5aab4b;
    transform: scale(1.05);
  }

  &:active {
    background-color: #4aa338;
    transform: scale(1);
  }

  &:disabled {
    background-color: #cccccc;
    cursor: not-allowed;
  }
`;

// 입력 필드와 폼 스타일
export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px; /* 입력 필드 간의 간격 */
`;

export const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
`;

export const Label = styled.label`
  margin-bottom: 10px;
  font-size: 14px;
  font-weight: bold;
  color: #333;
`;

export const Input = styled.input`
  padding: 12px;
  border: 1px solid #ddd;
  border-radius: 5px;
  font-size: 14px;
  outline: none;
  transition: border-color 0.3s;

  &:focus {
    border-color: #6cc357;
    box-shadow: 0 0 5px rgba(108, 195, 87, 0.5);
  }
`;

export const TextArea = styled.textarea`
  padding: 12px;
  border: 1px solid #ddd;
  border-radius: 5px;
  font-size: 14px;
  resize: vertical; /* 세로 크기만 조절 가능 */
  outline: none;
  transition: border-color 0.3s;

  &:focus {
    border-color: #6cc357;
    box-shadow: 0 0 5px rgba(108, 195, 87, 0.5);
  }
`;

// 체크박스와 라벨 스타일
export const CheckboxLabel = styled.label`
  display: flex;
  align-items: center;
  font-size: 14px;
  cursor: pointer;
`;

export const CheckboxInput = styled.input`
  margin-right: 10px;
`;

// 리스트와 리스트 아이템
export const List = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px; /* 아이템 간격 */
`;

export const ListItem = styled.li`
  background-color: #fff;
  border: 1px solid #ddd;
  border-radius: 10px;
  padding: 15px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); /* 박스 그림자 */
  transition: transform 0.3s, box-shadow 0.3s;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
  }
`;

export const NoteHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

// 메뉴 정보와 제목
export const MenuInfo = styled.div`
  display: flex;
  flex-direction: column;
`;

export const MenuName = styled.h2`
  font-size: 20px;
  font-weight: bold;
  margin: 0 0 5px;
  color: #333;
`;

export const Ingredients = styled.p`
  font-size: 14px;
  color: #666;
  margin: 0;
`;

// 리뷰 정보 및 아이템
export const ReviewContainer = styled.div`
  display: flex;
  align-items: center;
  margin-top: 10px;
`;

export const ReviewItem = styled.div`
  font-size: 14px;
  color: #333;
  margin-right: 15px;
`;

export const Comment = styled.p`
  margin-top: 15px;
  font-size: 16px;
  color: #333;
  line-height: 1.5;
  border-top: 1px solid #ddd;
  padding-top: 15px;
`;
// styled_components.js
export const Actions = styled.div`
  display: flex;
  gap: 10px; /* 버튼 간격 */
  justify-content: flex-end; /* 오른쪽 정렬 */
  margin-top: 20px; /* 위쪽 여백 */

  button {
    padding: 8px 16px;
    font-size: 14px;
    font-weight: bold;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s, transform 0.2s;

    &:hover {
      transform: translateY(-2px);
    }

    &:active {
      transform: translateY(1px);
    }
  }

  .primary {
    background-color: #6cc357; /* 녹색 */
    color: white;
    border: none;

    &:hover {
      background-color: #5aab4b;
    }
  }

  .secondary {
    background-color: #f5f5f5; /* 연한 회색 */
    color: #333;
    border: 1px solid #ccc;

    &:hover {
      background-color: #e9e9e9;
    }
  }
`;
