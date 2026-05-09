import express from "express";
import axios from "axios";

const router = express.Router();
const BASE_URL = process.env.INDIA_POST_API_BASE || "https://api.postalpincode.in";

const isValidPin = (pin) => /^\d{6}$/.test(pin);

router.get("/pincode/:pin", async (req, res) => {
  const { pin } = req.params;

  if (!isValidPin(pin)) {
    return res.status(400).json({ message: "Pincode must be 6 digits" });
  }

  try {
    const response = await axios.get(`${BASE_URL}/pincode/${pin}`);
    const payload = response.data?.[0];

    if (!payload || payload.Status !== "Success" || !payload.PostOffice?.length) {
      return res.status(404).json({ message: "No results found" });
    }

    const results = payload.PostOffice.map((office) => ({
      name: office.Name,
      district: office.District,
      state: office.State
    }));

    return res.json({ message: "Success", data: results });
  } catch (error) {
    return res.status(500).json({ message: "Failed to fetch data" });
  }
});

router.get("/area/:name", async (req, res) => {
  const name = (req.params.name || "").trim();

  if (name.length < 3) {
    return res.status(400).json({ message: "Area name must be at least 3 characters" });
  }

  try {
    const response = await axios.get(`${BASE_URL}/postoffice/${encodeURIComponent(name)}`);
    const payload = response.data?.[0];

    if (!payload || payload.Status !== "Success" || !payload.PostOffice?.length) {
      return res.status(404).json({ message: "No results found" });
    }

    const normalizedQuery = name.toLowerCase();
    const exactMatches = payload.PostOffice.filter(
      (office) => office?.Name?.toLowerCase() === normalizedQuery
    );

    if (!exactMatches.length) {
      return res.status(404).json({ message: "No exact match found" });
    }

    const results = exactMatches.map((office) => ({
      pincode: office.Pincode,
      name: office.Name,
      district: office.District,
      state: office.State
    }));

    return res.json({ message: "Success", data: results });
  } catch (error) {
    return res.status(500).json({ message: "Failed to fetch data" });
  }
});

export default router;
