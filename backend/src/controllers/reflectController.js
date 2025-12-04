import { processJournalEntry } from "../services/reflectiveService.js";

export const handleJournalEntry = async (req, res) => {
  try {
    const { entry } = req.body;
    const result = await processJournalEntry(entry);
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
