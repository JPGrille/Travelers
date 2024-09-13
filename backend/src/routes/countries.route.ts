import { Router } from "express";
import { addNewCountry, getVisitedCountries } from "../controller/countries.controller";

const countriesRouter = Router();

// Get all users visited countries
countriesRouter.get("/:userId", getVisitedCountries);

// Add new visited Country
countriesRouter.post("/newCountry", addNewCountry);

export default countriesRouter;