import { useRef, useState } from "react";

function HomePage() {
  const [feedbackItems, setFeedbackItems] = useState([]);
  const emailInputRef = useRef();
  const feedbackInputRef = useRef();

  const submitHandler = async (e) => {
    e.preventDefault();

    const response = await fetch("/api/feedback", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: emailInputRef.current.value,
        text: feedbackInputRef.current.value,
      }),
    });
    const data = await response.json();
    console.log(data);
  };

  const loadFeedbackHandler = async () => {
    const response = await fetch("/api/feedback");
    const data = await response.json();
    setFeedbackItems(data.feedback);
  };

  return (
    <div>
      <h1>Home page</h1>
      <form onSubmit={submitHandler}>
        <div>
          <label htmlFor="email">Your Email Address</label>
          <input type="email" id="email" ref={emailInputRef} />
        </div>

        <div>
          <label htmlFor="feedback">Your Feedback</label>
          <textarea id="feedback" rows="5" ref={feedbackInputRef} />
        </div>

        <button type="submit">Send Feedback</button>
      </form>

      <button onClick={loadFeedbackHandler}>Load Feedback</button>

      <ul>
        {feedbackItems.map((item) => (
          <li key={item.id}>{item.feedback}</li>
        ))}
      </ul>
    </div>
  );
}

export default HomePage;
