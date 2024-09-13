import { Request, Response } from "express";
import { pool } from "../config/connectDB";

// Get all user visited countries
export const getVisitedCountries = async (req: Request, res: Response) => {
    const { userId } = req.params;
    try {
        const countries = await pool.query(
            "SELECT country_code FROM visited_countries JOIN users ON users.id = user_id WHERE user_id = $1;",
            [Number(userId)]
        );
        if (countries.rows.length === 0) {
        return res.status(404).json({ message: "No visited countries found for this user" });
      }
      return res.status(200).json(countries.rows);
    } catch (error) {
        return res.status(500).json({ message: "Internal Server Error" });
    }
}

// Add new visited country
export const addNewCountry = async (req: Request, res: Response) => {
    const input = req.body["country"];
    const { userId } = req.params;
    try {
        const result = await pool.query(
            "SELECT country_code FROM countries WHERE LOWER(country_name) LIKE '%' || $1 || '%';",
            [input.toLowerCase()]
        );

        const data = result.rows[0];
        const countryCode = data.country_code;
        await pool.query(
            "INSERT INTO visited_countries (country_code, user_id) VALUES ($1, $2)",
            [countryCode, userId]
        );
        return res.status(201).json({ message: "Country added successfully" });
    } catch (err) {
        return res.status(500).json({ message: "Internal Server Error" });
    }
}