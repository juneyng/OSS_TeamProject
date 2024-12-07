import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const Recipe = () => {
  const { id } = useParams(); // URL의 :id 파라미터 가져오기
  const [recipe, setRecipe] = useState(null); // 레시피 데이터 저장
  const [error, setError] = useState(null); // 에러 상태 관리
  const [loading, setLoading] = useState(true); // 로딩 상태 관리

  useEffect(() => {
    const fetchRecipe = async () => {
      const API_KEY = "12847d8415f74e28b267"; // 발급받은 API 키
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
        ); // RCP_SEQ로 필터링
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
    <div style={{ maxWidth: "800px", margin: "0 auto" }}>
      <h1>{recipe.RCP_NM}</h1>
      <img
        src={recipe.ATT_FILE_NO_MAIN}
        alt={recipe.RCP_NM}
        style={{ maxWidth: "100%", height: "auto", marginBottom: "20px" }}
      />
      <p>
        <strong>일련번호:</strong> {recipe.RCP_SEQ}
      </p>
      <p>
        <strong>요리분류:</strong> {recipe.RCP_PAT2}
      </p>
      <p>
        <strong>조리방법:</strong> {recipe.RCP_WAY2}
      </p>
      <p>
        <strong>중량(1인분):</strong> {recipe.INFO_WGT}
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
      <p>
        <strong>나트륨:</strong> {recipe.INFO_NA} mg
      </p>
      <p>
        <strong>해쉬태그:</strong> {recipe.HASH_TAG}
      </p>
      <p>
        <strong>재료정보:</strong> {recipe.RCP_PARTS_DTLS}
      </p>
      <p>
        <strong>저감 조리법 TIP:</strong> {recipe.RCP_NA_TIP}
      </p>

      <h2>조리 방법</h2>
      <ul>
        {Array.from({ length: 20 }, (_, i) => i + 1).map((num) => {
          const step = recipe[`MANUAL${String(num).padStart(2, "0")}`];
          const stepImg = recipe[`MANUAL_IMG${String(num).padStart(2, "0")}`];
          return (
            step && (
              <li key={num} style={{ marginBottom: "20px" }}>
                <p>
                  <strong>단계 {num}:</strong> {step}
                </p>
                {stepImg && (
                  <img
                    src={stepImg}
                    alt={`단계 ${num}`}
                    style={{
                      maxWidth: "100%",
                      height: "auto",
                      marginTop: "10px",
                    }}
                  />
                )}
              </li>
            )
          );
        })}
      </ul>
    </div>
  );
};

export default Recipe;
