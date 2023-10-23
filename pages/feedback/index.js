import { useState } from "react";
import { buildFeedbackFilePath, extractFeedbackContent } from "../api/feedback";

function FeedbackPage(props) {
  const [feedbackData, setFeedbackData] = useState();

  const loadFeedbackHandler = async (id) => {
    const response = await fetch(`/api/feedback/${id}`);
    const data = await response.json();
    setFeedbackData(data.feedback);
  };

  return (
    <>
      {feedbackData && <p>{feedbackData.email}</p>}

      <ul>
        {props.feedbackItems.map((item) => (
          <li key={item.id}>
            {item.feedback}
            <button onClick={loadFeedbackHandler.bind(null, item.id)}>
              Show Details
            </button>
          </li>
        ))}
      </ul>
    </>
  );
}

export async function getStaticProps() {
  // 외부 API 연결에는 fetch를 써도 되지만, Next.js 내부에 만든 API에는 fetch를 쓰면 안된다.
  // 직접 api 폴더에 있는 node.js 코드를 사용한다.
  const filePath = buildFeedbackFilePath();
  const data = extractFeedbackContent(filePath);

  return {
    props: {
      feedbackItems: data,
    },
  };
}

export default FeedbackPage;
