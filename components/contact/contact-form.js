import { useEffect, useState } from "react";

import Notification from "../ui/notification";
import styles from "./contact-form.module.css";

async function sendContactData(contactDetails) {
  const response = await fetch("/api/contact", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(contactDetails),
  });
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Someting went wrong!");
  }
}

function ContactForm() {
  const [enteredEmail, setEnteredEmail] = useState("");
  const [enteredName, setEnteredName] = useState("");
  const [enteredMessage, setEnteredMessage] = useState("");
  const [requestState, setRequestState] = useState("");
  const [requestError, setRequestError] = useState("");

  useEffect(() => {
    if (requestState === "success" || requestState === "error") {
      const timer = setTimeout(() => {
        setRequestState(null);
        setRequestError(null);
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [requestState]);

  const sendMessageHandler = async (e) => {
    e.preventDefault();

    const newMessage = {
      email: enteredEmail,
      name: enteredName,
      message: enteredMessage,
    };

    setRequestState("pending");

    try {
      await sendContactData(newMessage);
    } catch (error) {
      setRequestState("error");
      setRequestError(error.message);
    }

    setRequestState("success");
  };

  let notification;

  if (requestState === "pending") {
    notification = {
      status: "pending",
      title: "Sending Message..",
      message: "Your message is on its way!",
    };
  }

  if (requestState === "success") {
    notification = {
      status: "success",
      title: "Success Message..",
      message: "Your message is Success",
    };
  }

  if (requestState === "error") {
    notification = {
      status: "error",
      title: "Error Message..",
      message: requestError,
    };
  }

  return (
    <section className={styles.contact}>
      <h1>How can I help you?</h1>

      <form className={styles.form} onSubmit={sendMessageHandler}>
        <div className={styles.controls}>
          <div className={styles.control}>
            <label htmlFor="email">Your Email</label>
            <input
              type="email"
              id="email"
              value={enteredEmail}
              onChange={(e) => setEnteredEmail(e.target.value)}
            />
          </div>

          <div className={styles.control}>
            <label htmlFor="name">Your Name</label>
            <input
              type="text"
              id="name"
              value={enteredName}
              onChange={(e) => setEnteredName(e.target.value)}
            />
          </div>
        </div>

        <div className={styles.control}>
          <label htmlFor="message">Your Message</label>
          <textarea
            id="message"
            rows={5}
            required
            value={enteredMessage}
            onChange={(e) => setEnteredMessage(e.target.value)}
          ></textarea>
        </div>

        <div className={styles.actions}>
          <button>Send Message</button>
        </div>
      </form>
      {notification && (
        <Notification
          status={notification.status}
          title={notification.title}
          message={notification.message}
        />
      )}
    </section>
  );
}

export default ContactForm;
