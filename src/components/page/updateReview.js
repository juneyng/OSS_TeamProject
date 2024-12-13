import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Container,
  Title,
  Form,
  FormGroup,
  Label,
  Input,
  TextArea,
  Button
} from '../styled_components';

const UpdateReview = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    cookTime: '',
    cookLevel: '',
    foodScore: '',
    foodComment: '',
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `https://672819f2270bd0b975546091.mockapi.io/api/v1/recipeNote/${id}`
        );
        const data = await response.json();
        setFormData({
          cookTime: data.cookTime || '',
          cookLevel: data.cookLevel || '',
          foodScore: data.foodScore || '',
          foodComment: data.foodComment || '',
        });
      } catch (error) {
        console.error('데이터 가져오기 오류:', error);
      }
    };

    fetchData();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await fetch(
        `https://672819f2270bd0b975546091.mockapi.io/api/v1/recipeNote/${id}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ ...formData, haveReview: true }),
        }
      );
      alert('리뷰가 등록되었습니다.');
      navigate('/');
    } catch (error) {
      console.error('리뷰 등록 오류:', error);
    }
  };

  return (
    <Container>
      <Title>리뷰 등록</Title>
      <Form onSubmit={handleSubmit}>
        <FormGroup>
          <Label>조리 시간</Label>
          <Input
            type="text"
            name="cookTime"
            value={formData.cookTime}
            onChange={handleChange}
            placeholder="예: 1시간 30분"
          />
        </FormGroup>
        <FormGroup>
          <Label>난이도</Label>
          <Input
            type="text"
            name="cookLevel"
            value={formData.cookLevel}
            onChange={handleChange}
            placeholder="예: 쉬움, 중간, 어려움"
          />
        </FormGroup>
        <FormGroup>
          <Label>평점</Label>
          <Input
            type="number"
            name="foodScore"
            value={formData.foodScore}
            onChange={handleChange}
            placeholder="1~5 사이 숫자"
            min="1"
            max="5"
          />
        </FormGroup>
        <FormGroup>
          <Label>리뷰</Label>
          <TextArea
            name="foodComment"
            value={formData.foodComment}
            onChange={handleChange}
            placeholder="리뷰 내용을 입력하세요"
          />
        </FormGroup>
        <Button type="submit">등록</Button>
      </Form>
    </Container>
  );
};

export default UpdateReview;
