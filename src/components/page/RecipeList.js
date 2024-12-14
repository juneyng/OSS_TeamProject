import React, { useCallback, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./RecipeList.css";

const RecipeList = () => {
  const [recipes, setRecipes] = useState([]);
  const [filteredRecipes, setFilteredRecipes] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(""); // 선택된 카테고리 상태 추가
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();
  const RECIPES_PER_PAGE = 12;

  const query = new URLSearchParams(location.search);
  const initialPage = parseInt(query.get("page"), 10) || 1;
  const [page, setPage] = useState(initialPage);

  const fetchRecipes = useCallback(async () => {
    if (recipes.length > 0) return;

    const API_KEY = "12847d8415f74e28b267";
    const SERVICE_ID = "COOKRCP01";
    const DATA_TYPE = "json";
    const START_IDX = 1;
    const END_IDX = 180;

    const url = `https://openapi.foodsafetykorea.go.kr/api/${API_KEY}/${SERVICE_ID}/${DATA_TYPE}/${START_IDX}/${END_IDX}`;


    const MAX_RETRIES = 10;
    let retries = 0;
    
      while(retries < MAX_RETRIES) {
    try {
      setLoading(true);
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setRecipes(data.COOKRCP01.row);
      setFilteredRecipes(data.COOKRCP01.row.slice(0, RECIPES_PER_PAGE));
      setError(null); // 에러 상태 초기화
      break; // 성공적으로 데이터를 가져왔을 때 루프 종료
    } catch (err) {
      retries += 1;
      console.error(`Fetch attempt ${retries} failed: ${err.message}`);
      setError(err.message);

      if (retries >= MAX_RETRIES) {
        alert("데이터를 가져오는데 실패했습니다. 다시 시도해주세요.");
        break;
      }

      // 일정 시간 대기 후 재시도 (500ms)
      await new Promise((resolve) => setTimeout(resolve, 500));
    } finally {
      setLoading(false);
    }
  }
  }, [recipes]);

  useEffect(() => {
    fetchRecipes();
  }, [fetchRecipes]);

  useEffect(() => {
    // 선택된 카테고리 또는 검색어에 따라 필터링
    let filtered = recipes;

    if (selectedCategory) {
      filtered = filtered.filter(
        (recipe) => recipe.RCP_PAT2 === selectedCategory
      );
    }

    if (searchTerm) {
      filtered = filtered.filter(
        (recipe) =>
          recipe.RCP_NM.toLowerCase().includes(searchTerm.toLowerCase()) ||
          recipe.RCP_PAT2.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    const startIndex = (page - 1) * RECIPES_PER_PAGE;
    const endIndex = startIndex + RECIPES_PER_PAGE;
    setFilteredRecipes(filtered.slice(startIndex, endIndex));
  }, [page, recipes, searchTerm, selectedCategory]);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    setPage(1); // 검색 시 페이지를 처음으로
  };

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
    setPage(1); // 카테고리 변경 시 페이지를 처음으로
  };

  const handleNextPage = () => {
    setPage((prevPage) => prevPage + 1);
    navigate(`?page=${page + 1}`, { replace: true });
  };

  const handlePrevPage = () => {
    if (page > 1) {
      setPage((prevPage) => prevPage - 1);
      navigate(`?page=${page - 1}`, { replace: true });
    }
  };

  const handleSaveToMockAPI = async (recipe) => {
    const payload = {
      menuName: recipe.RCP_NM,
      ingredients: recipe.RCP_PARTS_DTLS,
      foodNum: recipe.RCP_SEQ,
      haveReview: false,
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
    navigate(`/recipe/${id}`);
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="recipe-list-container">
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
            {["밥", "반찬", "국&찌개", "후식", "일품"].map((category) => (
              <li
                key={category}
                className={selectedCategory === category ? "active" : ""}
                onClick={() => handleCategoryClick(category)}
              >
                {category}
              </li>
            ))}
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
          disabled={page * RECIPES_PER_PAGE >= recipes.length}
        >
          다음
        </button>
      </div>
    </div>
  );
};

export default RecipeList;
