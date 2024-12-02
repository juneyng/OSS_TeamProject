import React, { useEffect, useState } from "react";

const App = () => {
  const [recipes, setRecipes] = useState([]); // 레시피 데이터를 저장할 상태
  const [error, setError] = useState(null); // 에러 상태 관리
  const [loading, setLoading] = useState(true); // 로딩 상태 관리

  useEffect(() => {
    const fetchRecipes = async () => {
      const API_KEY = "12847d8415f74e28b267"; // 발급받은 API 키
      const SERVICE_ID = "COOKRCP01"; // 서비스 ID
      const DATA_TYPE = "json"; // JSON 형식 요청
      const START_IDX = 1; // 데이터 요청 시작 인덱스
      const END_IDX = 5; // 데이터 요청 종료 인덱스

      // 요청 URL 구성
      const url = `https://openapi.foodsafetykorea.go.kr/api/${API_KEY}/${SERVICE_ID}/${DATA_TYPE}/${START_IDX}/${END_IDX}`;

      try {
        const response = await fetch(url); // API 요청
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json(); // JSON 형태로 변환
        setRecipes(data.COOKRCP01.row); // 레시피 데이터 설정
      } catch (err) {
        setError(err.message); // 에러 상태 설정
      } finally {
        setLoading(false); // 로딩 완료
      }
    };

    fetchRecipes();
  }, []); // 컴포넌트가 마운트될 때 한 번만 실행

  // 로딩 상태 처리
  if (loading) return <p>Loading...</p>;

  // 에러 상태 처리
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <h1>레시피 목록</h1>
      <ul>
        {recipes.map((recipe) => (
          <li key={recipe.RCP_SEQ}>
            <h2>{recipe.RCP_NM}</h2>
            <p>{recipe.RCP_PARTS_DTLS}</p>
            {recipe.ATT_FILE_NO_MAIN && (
              <img
                src={recipe.ATT_FILE_NO_MAIN}
                alt={recipe.RCP_NM}
                style={{ maxWidth: "200px" }}
              />
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
