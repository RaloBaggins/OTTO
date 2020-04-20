const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

router.get('/', (req, res) => {
    console.log("in getAdminProperty route");
    let queryString = `SELECT * FROM "property" WHERE "active" = 'TRUE'`;
    pool.query(queryString)
        .then(results => {
            res.send(results.rows);
        }).catch(error => {
            console.log(error);
            res.sendStatus(500);
        });
});
router.get('/history/', (req, res) => {
    console.log("in getAdminPropertyHistory route");
    let queryString = `SELECT * FROM "property" WHERE "active" = 'FALSE'`;
    pool.query(queryString)
        .then(results => {
            res.send(results.rows);
        }).catch(error => {
            console.log(error);
            res.sendStatus(500);
        });
});
router.put('/:id', (req, res) => {
    console.log("in updateAdminProperty route", req.params);
    let queryString = `UPDATE "property" SET "active" = 'FALSE' WHERE "id" = $1`;
    pool.query(queryString, [req.params.id])
        .then(() => res.sendStatus(200))
        .catch(() => res.sendStatus(500));
});
router.delete('/delete/:id', async (req, res) => {
    console.log("in deleteAdminProperty route", req.params.id);
    const propertyId = req.params.id;
    const connection = await pool.connect();
    try {
        await connection.query('BEGIN');
        const queryString = `DELETE FROM "interest" WHERE "property_id" = $1`;
        const queryString2 = `DELETE FROM "property" WHERE "id" = $1`;
        await connection.query(queryString, [propertyId]);
        await connection.query(queryString2, [propertyId]);
        await connection.query('COMMIT');
        res.sendStatus(200);
        console.log('end of Commit');
    } catch (error) {
        await connection.query('ROLLBACK');
        console.log('error in deleting history', error);
        sendStatus(500);
    } finally {
        connection.release();
        console.log('released');
    }
});
module.exports = router;

// router.post('/specific'), async (req, res) => {
//     const toId = req.body.toId;
//     const fromId = req.body.fromId;
//     const amount = req.body.amount;
//     console.log(`Transfer ${amount} from account ${fromId} to acct ${toId}`);
//     const connection = await pool.connect();
//     try {
//         await connection.query('BEGIN');
//         const sqlText = `INSERT INTO register (acct_id, amount) VALUES ($1, $2)`;
//         await connection.query(sqlText, [fromId, -amount]);
//         await connection.query(sqlText, [toId, amount]);
//         await connection.query('COMMIT');
//         res.sendStatus(200);
//     } catch (error) {
//         await connection.query('ROLLBACK');
//         console.log("error", error);
//         sendStatus(500);
//     } finally {
//         connection.release();
//     }
// } 