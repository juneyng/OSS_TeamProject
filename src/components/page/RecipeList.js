import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./RecipeList.css";
import cookingnote from "./cookingnote.jpg";

const RecipeList = () => {
  const [recipes, setRecipes] = useState([]);
  const [filteredRecipes, setFilteredRecipes] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();
  const RECIPES_PER_PAGE = 12;

  const query = new URLSearchParams(location.search);
  const initialPage = parseInt(query.get("page"), 10) || 1;
  const [page, setPage] = useState(initialPage);

  const fetchRecipes = async () => {
    const API_KEY = "12847d8415f74e28b267";
    const SERVICE_ID = "COOKRCP01";
    const DATA_TYPE = "json";
    const START_IDX = (page - 1) * RECIPES_PER_PAGE + 1;
    const END_IDX = page * RECIPES_PER_PAGE;

    const url = `https://openapi.foodsafetykorea.go.kr/api/${API_KEY}/${SERVICE_ID}/${DATA_TYPE}/${START_IDX}/${END_IDX}`;

    try {
      setLoading(true);
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setRecipes(data.COOKRCP01.row);
      setFilteredRecipes(data.COOKRCP01.row);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRecipes();
  }, [page]);

  const handleSearch = (e) => {
    const term = e.target.value.toLowerCase(); // 검색어 소문자로 변환
    setSearchTerm(term);

    const filtered = recipes.filter(
      (recipe) =>
        recipe.RCP_NM.toLowerCase().includes(term) || // 레시피 이름 검색
        recipe.RCP_PAT2.toLowerCase().includes(term) // 요리 분류 검색
    );

    setFilteredRecipes(filtered);
  };

  const handleNextPage = () => {
    const nextPage = page + 1;
    setPage(nextPage);
    navigate(`?page=${nextPage}`); // URL 업데이트
  };

  const handlePrevPage = () => {
    const prevPage = page - 1;
    if (prevPage > 0) {
      setPage(prevPage);
      navigate(`?page=${prevPage}`); // URL 업데이트
    }
  };

  const handleSaveToMockAPI = async (recipe) => {
    // '담기' 버튼 누를 시 mockAPI에 전달됨
    const payload = {
      id: recipe.RCP_SEQ,
      menuName: recipe.RCP_NM, // 메뉴 이름
      ingredients: recipe.RCP_PARTS_DTLS, // 사용된 재료
      haveReview: true, // 리뷰 여부
      cookTime: null,
      cookLevel: null,
      foodScore: null,
      foodComment: null,
    };

    try {
      const response = await fetch(
        "https://672819f2270bd0b975546091.mockapi.io/api/v1/recipeNote",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        }
      );

      if (response.ok) {
        alert(`${recipe.RCP_NM}이(가) 나의 노트에 저장되었습니다.`);
      } else {
        throw new Error("저장에 실패했습니다.");
      }
    } catch (err) {
      alert(err.message);
    }
  };

  const handleRecipeClick = (id) => {
    navigate(`/recipe/${id}`); // /recipe/:id 경로로 이동
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

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
            <li>밥</li>
            <li>반찬</li>
            <li>국/찌개</li>
            <li>후식</li>
            <li>기타</li>
          </ul>
        </nav>
      </div>

      <div className="recipe-list">
        {filteredRecipes.length > 0 ? (
          filteredRecipes.map((recipe) => (
            <div key={recipe.RCP_SEQ} className="recipe-card">
              <p className="recipe-category">{recipe.RCP_PAT2}</p>
              <img
                src={recipe.ATT_FILE_NO_MAIN}
                alt={recipe.RCP_NM}
                className="recipe-image"
                onClick={() => handleRecipeClick(recipe.RCP_SEQ)}
                style={{ cursor: "pointer" }}
              />
              <p className="recipe-title">{recipe.RCP_NM}</p>
              <button
                className="save-button"
                onClick={() => handleSaveToMockAPI(recipe)}
              >
                담기
              </button>
            </div>
          ))
        ) : (
          <p className="no-results">검색 결과가 없습니다.</p>
        )}
      </div>
      <div className="pagination">
        <button
          className="pagination-button"
          onClick={handlePrevPage}
          disabled={page === 1}
        >
          이전
        </button>
        <span className="pagination-page">페이지 {page}</span>
        <button
          className="pagination-button"
          onClick={handleNextPage}
        >
          다음
        </button>
      </div>
    </div>
  );
};

export default RecipeList;
