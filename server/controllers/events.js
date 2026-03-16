import { pool } from '../config/database.js'

export const getAllEvents = async (req, res) => {
    try {
        const { locationId } = req.query
        let result
        if (locationId) {
            result = await pool.query(
                'SELECT * FROM events WHERE location_id = $1 ORDER BY date, time',
                [locationId]
            )
        } else {
            result = await pool.query('SELECT * FROM events ORDER BY date, time')
        }
        res.json(result.rows)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

export const getEventById = async (req, res) => {
    try {
        const { id } = req.params
        const result = await pool.query('SELECT * FROM events WHERE id = $1', [id])
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Event not found' })
        }
        res.json(result.rows[0])
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}
