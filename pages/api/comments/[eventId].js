import {
  connectDatabase,
  getAllDocuments,
  insertDocument,
} from "@/helpers/db-utils";

async function handler(req, res) {
  const eventId = req.query.eventId;

  let client;

  try {
    client = await connectDatabase();
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Connecting to the database failed!" });
  }

  if (req.method === "POST") {
    const { email, name, text } = req.body;

    if (
      !email ||
      !email.includes("@") ||
      !name ||
      name.trim() === "" ||
      !text ||
      text.trim() === ""
    ) {
      res.status(422).json({ message: "Invalid Input" });
      client.close();
      return;
    }

    const newComment = {
      eventId,
      email,
      name,
      text,
    };

    let result;

    try {
      result = insertDocument(client, "comments", newComment);
      newComment.id = result.insertedId;
      res.status(201).json({ message: "Success", comment: newComment });
    } catch (error) {
      res
        .status(500)
        .json({ message: "Inserting data to the database failed!" });
    }
  }

  if (req.method === "GET") {
    let documents;

    try {
      documents = await getAllDocuments(
        client,
        "comments",
        { eventId },
        { _id: -1 }
      );
      res.status(200).json({ comments: documents });
    } catch (error) {
      res.status(500).json({ message: "Get data from the database failed!" });
    }
  }

  client.close();
}

export default handler;
