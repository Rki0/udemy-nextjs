import { connectToDatabase } from "@/lib/db";
import { hashPassword } from "@/lib/auth";

async function handler(req, res) {
  if (req.method === "POST") {
    const { email, password } = req.body;

    if (
      !email ||
      !email.includes("@") ||
      !password ||
      password.trim().length < 7
    ) {
      return res.status(422).json({ message: "Invalid Input" });
    }

    const client = await connectToDatabase();

    const db = client.db();

    const existingUser = db.collection("users").findOne({ email });

    if (existingUser) {
      client.close();
      return res.status(422).json({ meesage: "Already Signed up!" });
    }

    const hashedPassword = await hashPassword(password);

    const result = await db.collection("users").insertOne({
      email,
      password: hashedPassword,
    });

    res.status(201).json({ message: "Created User!" });
    client.close();
  }
}

export default handler;
