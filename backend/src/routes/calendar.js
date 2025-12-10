import express from "express";
import supabase from "../utils/supabaseClient.js";

const router = express.Router();
router.get("/month/:userId/:year/:month", async (req, res) => {
  try {
    const { userId, year, month } = req.params;

    const yearNum = parseInt(year);
    const monthNum = parseInt(month); // 0–11 format

    // First and last day of month
    const start = new Date(yearNum, monthNum, 1).toISOString().slice(0, 10);
    const end = new Date(yearNum, monthNum + 1, 0).toISOString().slice(0, 10);

    // Reflect data
    const { data: reflect } = await supabase
      .from("reflect_summaries")
      .select("*")
      .eq("user_id", userId)
      .gte("date", start)
      .lte("date", end);

    // Focus data
    const { data: focus } = await supabase
      .from("focus_summaries")
      .select("*")
      .eq("user_id", userId)
      .gte("date", start)
      .lte("date", end);

    const combined = {};

    reflect?.forEach((r) => {
      combined[r.date] = combined[r.date] || {};
      combined[r.date].reflect = r;
    });

    focus?.forEach((f) => {
      combined[f.date] = combined[f.date] || {};
      combined[f.date].focus = f;
    });

    res.json(combined);

  } catch (e) {
    console.log(e);
    res.status(500).json({ error: "Failed to load month data" });
  }
});
export default router;
