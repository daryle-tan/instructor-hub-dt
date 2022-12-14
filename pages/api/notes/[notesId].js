import postgres from "postgres";

// const { DB_CONNECTION_URL, PORT, NODE_ENV } = process.env;
const sql = postgres(
  process.env.DB_CONNECTION_URL,
  process.env.NODE_ENV === "production"
    ? {
        ssl: { rejectUnauthorized: false },
        // max_lifetime: 60 * 30,
      }
    : {}
);

export default async function getNotes(req, res) {
  const id = req.query.notesId;
  if (req.method === "GET") {
    try {
      const getNotesId = await sql`
            SELECT * FROM notes WHERE student_id = ${id}`;
      res.status(200).json(getNotesId);
    } catch (error) {
      console.error("Bad news in index api: ", error);
      return res.status(500).json({ msg: "Messed up on our end" });
    }
  } else if (req.method === "DELETE") {
    try {
      const deleteNotes = await sql`
            DELETE FROM notes WHERE student_id = ${id}`;
      res.status(200).json(deleteNotes[0]);
    } catch (error) {
      console.error("Bad news in index api: ", error);
      return res.status(500).json({ msg: "Messed up on our end" });
    }
  } else if (req.method === "PATCH") {
    try {
      const { notes, name} = req.body;
      const patchNotes = await sql`
            UPDATE notes SET notes = ${notes}, name = ${name}, note_date = NOW() WHERE note_id = ${id} RETURNING *`;
      res.send(patchNotes[0]);
    } catch (error) {
      console.error("Bad news in index api: ", error);
      return res.status(500).json({ msg: "Messed up on our end" });
    }
  } else {
    res.status(400).json({ msg: "You messed up" });
  }
}
