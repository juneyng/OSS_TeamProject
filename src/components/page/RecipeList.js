import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const RecipeList = () => {
  const [recipes, setRecipes] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRecipes = async () => {
      const API_KEY = "12847d8415f74e28b267";
      const SERVICE_ID = "COOKRCP01";
      const DATA_TYPE = "json";
      const START_IDX = 1;
      const END_IDX = 5;

      const url = `http://openapi.foodsafetykorea.go.kr/api/${API_KEY}/${SERVICE_ID}/${DATA_TYPE}/${START_IDX}/${END_IDX}`;

      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setRecipes(data.COOKRCP01.row);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchRecipes();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  // 레시피 클릭 시 /recipe로 이동하면서 데이터 전달
  const handleRecipeClick = (recipe) => {
    navigate("/recipe", { state: { recipe } });
  };

  return (
    <div>
      <h1>레시피 목록</h1>
      <table border="1" style={{ width: "100%", textAlign: "left" }}>
        <thead>
          <tr>
            <th>순서</th>
            <th>요리명</th>
            <th>요리분류</th>
          </tr>
        </thead>
        <tbody>
          {recipes.map((recipe, index) => (
            <tr
              key={recipe.RCP_SEQ}
              onClick={() => handleRecipeClick(recipe)}
              style={{ cursor: "pointer" }}
            >
              <td>{index + 1}</td>
              <td>{recipe.RCP_NM}</td>
              <td>{recipe.RCP_PAT2}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RecipeList;
