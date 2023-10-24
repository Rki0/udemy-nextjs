import { connectDatabase, insertDocument } from "@/helpers/db-utils";

async function handler(req, res) {
  if (req.method === "POST") {
    const userEmail = req.body.email;

    if (!userEmail || !userEmail.includes("@")) {
      return res.status(422).json({ message: "Invalid Email Format" });
    }

    let client;

    try {
      client = await connectDatabase();
    } catch (error) {
      return res
        .status(500)
        .json({ message: "Connecting to the database failed!" });
    }

    try {
      insertDocument(client, "emails", { email: userEmail });
      client.close();
    } catch (error) {
      return res
        .status(500)
        .json({ message: "Inserting data to the database failed!" });
    }

    client.close();

    return res.status(201).json({ message: "Signed up!" });
  }
}

export default handler;
