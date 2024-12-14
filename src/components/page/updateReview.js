import React, { useState, useEffect } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import {
  Container,
  Title,
  Form,
  FormGroup,
  Label,
  Input,
  TextArea,
  Button,
} from "../styled_components2";

const UpdateReview = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [formData, setFormData] = useState({
    menuName: "",
    cookTime: "",
    cookLevel: "",
    foodScore: "",
    foodComment: "",
  });

  const [errors, setErrors] = useState({
    cookTime: false,
    cookLevel: false,
    foodScore: false,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `https://672819f2270bd0b975546091.mockapi.io/api/v1/recipeNote/${id}`
        );
        const data = await response.json();
        setFormData({
          menuName: data.menuName,
          cookTime: data.cookTime || "",
          cookLevel: data.cookLevel || "",
          foodScore: data.foodScore || "",
          foodComment: data.foodComment || "",
        });
      } catch (error) {
        console.error("데이터 가져오기 오류:", error);
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
    if (errors[name]) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        [name]: false,
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {
      cookTime: formData.cookTime.trim() === "",
      cookLevel: String(formData.cookLevel).trim() === "",
      foodScore: String(formData.foodScore).trim() === "",
    };

    setErrors(newErrors);

    // 에러가 하나라도 true면 유효하지 않음
    return !Object.values(newErrors).some((error) => error);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      alert("필수 입력 항목을 모두 입력해주세요.");
      return;
    }

    try {
      await fetch(
        `https://672819f2270bd0b975546091.mockapi.io/api/v1/recipeNote/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ ...formData, haveReview: true }),
        }
      );
      if(location.pathname.startsWith("/createReview"))
        alert("리뷰가 등록되었습니다.");
      else
        alert("리뷰가 수정되었습니다.");
      navigate("/mylist");
    } catch (error) {
      console.error("리뷰 등록 오류:", error);
    }
  };

  return (
    
    <Container>
      <Title>{location.pathname.startsWith("/createReview") ? "리뷰 등록" : "리뷰 수정"}</Title>
      <Form onSubmit={handleSubmit}>
        <FormGroup>
          <Label>요리명</Label>
          <Input
            type="text"
            name="menuName"
            value={formData.menuName}
            readOnly
            style={{ backgroundColor: "#f9f9f9", cursor: "not-allowed" }}
          />
        </FormGroup>
        <FormGroup>
          <Label>조리 시간 <span style={{ color: "red" }}>*</span></Label>
          <Input
            type="text"
            name="cookTime"
            value={formData.cookTime}
            onChange={handleChange}
            placeholder="예: 1시간 30분"
            style={errors.cookTime ? { border: "1px solid red" } : {}}
          />
        </FormGroup>
        <FormGroup>
          <Label>난이도 <span style={{ color: "red" }}>*</span></Label>
          <Input
            type="number"
            name="cookLevel"
            value={formData.cookLevel}
            onChange={handleChange}
            placeholder="1~5 사이 숫자로 표현"
            min="1"
            max="5"
            style={errors.cookLevel ? { border: "1px solid red" } : {}}
          />
        </FormGroup>
        <FormGroup>
          <Label>평점 <span style={{ color: "red" }}>*</span></Label>
          <Input
            type="number"
            name="foodScore"
            value={formData.foodScore}
            onChange={handleChange}
            placeholder="1~5 사이 숫자로 표현"
            min="1"
            max="5"
            style={errors.foodScore ? { border: "1px solid red" } : {}}
          />
        </FormGroup>
        <FormGroup>
          <Label>메모</Label>
          <TextArea
            name="foodComment"
            value={formData.foodComment}
            onChange={handleChange}
            placeholder="메모 내용을 입력하세요"
          />
        </FormGroup>
        <Button type="submit">{location.pathname.startsWith("/createReview") ? "등록" : "수정"}</Button>
      </Form>
    </Container>
  );
};

export default UpdateReview;
