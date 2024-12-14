// src/components/styles.js
import styled from "styled-components";

export const Container = styled.div`
  max-width: 800px;
  margin: 40px auto;
  padding: 0 20px;
`;

export const Title = styled.h1`
  text-align: center;
  margin-bottom: 30px;
`;

export const Button = styled.button`
  background-color: transparent;
  color: #888;
  border: none;
  padding: 5px;
  margin-left: ${(props) => props.marginLeft || "0"};
  cursor: pointer;
  font-size: 18px;
  &:hover {
    color: #555;
  }
`;

export const List = styled.ul`
  list-style: none;
  padding: 0;
`;

export const ListItem = styled.li`
  background-color: #e9e7e3;
  margin-bottom: 15px;
  padding: 15px;
  border-radius: 5px;
`;

export const NoteHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
`;

export const MenuInfo = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

export const MenuName = styled.h2`
  font-size: 24px;
  font-weight: bold;
  margin: 0;
`;

export const MenuName2 = styled.h3`
  font-size: 18px;
  font-weight: bold;
  margin: 6px 0 0 0;
`

export const Ingredients = styled.p`
  font-size: 15px;
  color: #666;
  margin: 5px 0 10px 0;
  line-height: 1.6;
`;

export const ReviewContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  margin-top: 10px;
`;

export const ReviewInfo = styled.div`
  display: flex;
  align-items: center;
  margin-top: 5px;
`;

export const ReviewItem = styled.div`
  display: flex;
  align-items: center;
  margin-right: 15px;
  font-size: 14px;
  color: #333;
  svg {
    margin-right: 5px;
  }
`;

export const Comment = styled.p`
  margin-top: 15px;
  font-size: 16px;
  color: #333;
  line-height: 1.5;
  border-top: 1px solid #ddd;
  padding-top: 15px;
`;

export const Actions = styled.div`
  display: flex;
  margin-left: 10px;
  button {
    margin-left: 15px;
  }
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

export const FormGroup = styled.div`
  margin-bottom: 15px;
`;

export const Label = styled.label`
  margin-bottom: 5px;
  font-weight: bold;
  display: block;
`;

export const Input = styled.input`
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 5px;
  width: 100%;
`;

export const TextArea = styled.textarea`
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 5px;
  width: 100%;
  height: 100px;
`;

export const CheckboxLabel = styled.label`
  display: flex;
  align-items: center;
  cursor: pointer;
`;

export const CheckboxInput = styled.input`
  margin-right: 10px;
`;
