import React from "react";
import { useLocation } from "react-router-dom";

const Recipe = () => {
  const location = useLocation();
  const recipe = location.state?.recipe; // 전달받은 레시피 데이터

  if (!recipe) {
    return <p>레시피 데이터를 찾을 수 없습니다.</p>;
  }

  return (
    <div>
      <h1>{recipe.RCP_NM}</h1>
      <p>
        <strong>요리분류:</strong> {recipe.RCP_PAT2}
      </p>
      <p>
        <strong>재료:</strong> {recipe.RCP_PARTS_DTLS}
      </p>
      <p>
        <strong>조리방법:</strong>
      </p>
      <ul>
        {Array.from({ length: 20 }, (_, i) => i + 1)
          .map((num) => recipe[`MANUAL${String(num).padStart(2, "0")}`])
          .filter((step) => step)
          .map((step, index) => (
            <li key={index}>{step}</li>
          ))}
      </ul>
      {recipe.ATT_FILE_NO_MAIN && (
        <img
          src={recipe.ATT_FILE_NO_MAIN}
          alt={recipe.RCP_NM}
          style={{ maxWidth: "300px" }}
        />
      )}
    </div>
  );
};

export default Recipe;
