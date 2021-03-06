// Requirements
const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const axios = require('axios');

router.post('/', async (req, res) => {
    const newProperty = req.body;
    const geocodeResponse = await axios.get( // this is for the google maps api
        'https://maps.googleapis.com/maps/api/geocode/json', {
        params: {
            address: `${newProperty.address + ' ' + newProperty.unitNumber + ' ' + newProperty.city + ' ' + newProperty.state + ' ' + newProperty.zipCode}`,
            key: 'AIzaSyCHElb_DfSY05GT5sQL4K_8PU8fWIE--xo'
        }
    })
    const location = geocodeResponse.data.results[0].geometry.location;
    const queryText = `INSERT INTO "property" (user_id, active, address, unit_number, state, city, zip_code, property_type, 
        net_operating_income, gross_income, gross_expense, desired_price, latitude, longitude) VALUES ($1, TRUE, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13)`;
    pool.query(queryText, [newProperty.userId, newProperty.address, newProperty.unitNumber, newProperty.state, newProperty.city, newProperty.zipCode,
    newProperty.propertyType, newProperty.netOperatingIncome, newProperty.grossIncome, newProperty.grossExpense, newProperty.desiredPrice, location.lat, location.lng])
        .then(() => res.sendStatus(201))
        .catch(() => res.sendStatus(500));
});
// Adds new postings through the add listing page, while also populating the map with new markers

router.put('/approve/:id', (req, res) => {
    const updateUser = req.params.id;
    const queryText = `UPDATE "user" SET "approved_user" = 'TRUE' WHERE "id"=$1`;
    pool.query(queryText, [updateUser])
        .then(() => {
            res.sendStatus(200)
        }).catch(error => {
            res.sendStatus(500)
        });
});

router.get('/public', async (req, res) => {
    const results = await pool.query(`
    SELECT "id", "active", "city", "state", "zip_code", "property_type", "net_operating_income", "gross_income", "gross_expense", "desired_price", ROUND("latitude", 2) AS "latitude", ROUND("longitude", 2) AS "longitude"
    FROM property WHERE active = true ORDER BY "id" DESC;`)
    try {
        res.send(results.rows)
    } catch (error) {
        res.sendStatus(500)
    }
});
// Gets properties to list on the initial landing page .

router.post('/private', async (req, res) => {
    const results = await pool.query(`
    SELECT "id", "active", "address", "unit_number", "city", "state", "zip_code", "property_type", "net_operating_income", "gross_income", "gross_expense", "desired_price", CAST("latitude" AS DECIMAL), CAST("longitude" AS DECIMAL)
    FROM property
    WHERE id = ${req.body.singlePropertyId};`)
    try {
        res.send(results.rows)        
    } catch (error) {
        res.sendStatus(500)
    }
});
// This router is for after a user has been approved and signed an NDA for a property. They are given the full information about a property. 
// This shows up on property page. 

module.exports = router;
