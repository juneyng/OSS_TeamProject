import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./RecipeList.css";
import cookingnote from "./cookingnote.jpg";

const RecipeList = () => {
  const [recipes, setRecipes] = useState([]);
  const [filteredRecipes, setFilteredRecipes] = useState([]); // 검색된 레시피 목록
  const [searchTerm, setSearchTerm] = useState(""); // 검색어
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRecipes = async () => {
      const API_KEY = "12847d8415f74e28b267";
      const SERVICE_ID = "COOKRCP01";
      const DATA_TYPE = "json";
      const START_IDX = 1;
      const END_IDX = 1000;

      const url = `https://openapi.foodsafetykorea.go.kr/api/${API_KEY}/${SERVICE_ID}/${DATA_TYPE}/${START_IDX}/${END_IDX}`;

      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setRecipes(data.COOKRCP01.row);
        setFilteredRecipes(data.COOKRCP01.row); // 초기에는 전체 목록을 필터링 목록에 설정
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchRecipes();
  }, []);

  const handleSearch = (e) => {
    const term = e.target.value.toLowerCase(); // 검색어를 소문자로 변환
    setSearchTerm(term);

    const filtered = recipes.filter(
      (recipe) =>
        recipe.RCP_NM.toLowerCase().includes(term) || // 레시피 이름 검색
        recipe.RCP_PAT2.toLowerCase().includes(term) // 요리 분류 검색
    );

    setFilteredRecipes(filtered); // 필터링된 목록 업데이트
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  const handleRecipeClick = (id) => {
    navigate(`/recipe/${id}`); // /recipe/:id 경로로 이동
  };

  return (
    <div className="recipe-list-container">
      <div className="logo">
        <img
          className="img1"
          src={cookingnote}
          alt="요리 노트"
          style={{ cursor: "pointer" }}
          onClick={() => (window.location.href = "/recipe-list")}
        />
      </div>

      <div className="search-bar">
        <input
          type="text"
          placeholder="레시피 이름 또는 요리 분류로 검색하세요"
          value={searchTerm}
          onChange={handleSearch}
        />
      </div>

      <div className="option">
        <nav>
          <ul>
            <li>추천</li>
            <li>분류</li>
            <li>랭킹</li>
            <li>매거진</li>
            <li>더보기</li>
          </ul>
        </nav>
      </div>
      <div className="recipe-list">
        {filteredRecipes.length > 0 ? (
          filteredRecipes.map((recipe) => (
            <div
              key={recipe.RCP_SEQ}
              className="recipe-card"
              onClick={() => handleRecipeClick(recipe.RCP_SEQ)}
            >
              <p className="recipe-category">{recipe.RCP_PAT2}</p>
              <img
                src={recipe.ATT_FILE_NO_MAIN}
                alt={recipe.RCP_NM}
                className="recipe-image"
              />
              <p className="recipe-title">{recipe.RCP_NM}</p>
            </div>
          ))
        ) : (
          <p className="no-results">검색 결과가 없습니다.</p>
        )}
      </div>
    </div>
  );
};

export default RecipeList;
