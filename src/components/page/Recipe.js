import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./Recipe.css";

const Recipe = () => {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRecipe = async () => {
      const API_KEY = "12847d8415f74e28b267";
      const SERVICE_ID = "COOKRCP01";
      const DATA_TYPE = "json";

      const url = `http://openapi.foodsafetykorea.go.kr/api/${API_KEY}/${SERVICE_ID}/${DATA_TYPE}/1/100`;

      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        const selectedRecipe = data.COOKRCP01.row.find(
          (recipe) => recipe.RCP_SEQ === id
        );
        setRecipe(selectedRecipe);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchRecipe();
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!recipe) return <p>레시피를 찾을 수 없습니다.</p>;

  return (
    <div className="recipe-container">
      <h1 className="recipe-main-title">{recipe.RCP_NM}</h1>
      <div className="recipe-main-image-container">
        <img
          src={recipe.ATT_FILE_NO_MAIN}
          alt={recipe.RCP_NM}
          className="recipe-main-image"
        />
      </div>

      <div className="recipe-info">
        <p>
          <strong>요리분류:</strong> {recipe.RCP_PAT2}
        </p>
        <p>
          <strong>조리방법:</strong> {recipe.RCP_WAY2}
        </p>
        <p>
          <strong>열량:</strong> {recipe.INFO_ENG} kcal
        </p>
        <p>
          <strong>탄수화물:</strong> {recipe.INFO_CAR} g
        </p>
        <p>
          <strong>단백질:</strong> {recipe.INFO_PRO} g
        </p>
        <p>
          <strong>지방:</strong> {recipe.INFO_FAT} g
        </p>
        <p className="recipe-hashtag">
          <strong>#</strong> {recipe.HASH_TAG}
        </p>
      </div>
      <div className="recipe-details">
        <p>
          <strong>재료정보:</strong> {recipe.RCP_PARTS_DTLS}
        </p>
        <p>
          <strong>저감 조리법 TIP:</strong> {recipe.RCP_NA_TIP}
        </p>
      </div>
      <h2>&nbsp;&nbsp;&nbsp;&nbsp;조리 방법</h2>
      <ul className="recipe-steps">
        {Array.from({ length: 20 }, (_, i) => i + 1).map((num) => {
          const step = recipe[`MANUAL${String(num).padStart(2, "0")}`];
          const stepImg = recipe[`MANUAL_IMG${String(num).padStart(2, "0")}`];
          return (
            step && (
              <li key={num} className="recipe-step">
                <p>
                  <strong>단계 {num}:</strong> {step}
                </p>
                {stepImg && <img src={stepImg} alt={`단계 ${num}`} />}
              </li>
            )
          );
        })}
      </ul>
    </div>
  );
};

export default Recipe;
