import { buildFeedbackFilePath, extractFeedbackContent } from "./index";

function handler(req, res) {
  const feedbackId = req.query.feedbackId;

  const filePath = buildFeedbackFilePath();
  const fileData = extractFeedbackContent(filePath);

  const selectedFeedback = fileData.find((data) => data.id === feedbackId);

  res.status(200).json({ feedback: selectedFeedback });
}

export default handler;
