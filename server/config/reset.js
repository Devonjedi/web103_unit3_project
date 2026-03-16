import path from 'path'
import { fileURLToPath } from 'url'
import dotenv from 'dotenv'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
dotenv.config({ path: path.join(__dirname, '..', '.env') })

import { pool } from './database.js'

const createTables = async () => {
    await pool.query(`
        DROP TABLE IF EXISTS events;
        DROP TABLE IF EXISTS locations;

        CREATE TABLE locations (
            id SERIAL PRIMARY KEY,
            name VARCHAR(100) NOT NULL,
            slug VARCHAR(100) UNIQUE NOT NULL,
            address VARCHAR(200),
            city VARCHAR(100),
            state VARCHAR(50),
            zip VARCHAR(20),
            image TEXT,
            description TEXT
        );

        CREATE TABLE events (
            id SERIAL PRIMARY KEY,
            title VARCHAR(200) NOT NULL,
            date DATE NOT NULL,
            time TIME NOT NULL,
            image TEXT,
            description TEXT,
            location_id INTEGER REFERENCES locations(id) ON DELETE CASCADE
        );
    `)

    const locations = [
        {
            name: 'Spyhouse Coffee',
            slug: 'spyhouse',
            address: '2451 Nicollet Ave S',
            city: 'Minneapolis',
            state: 'MN',
            zip: '55404',
            image: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=800&auto=format&fit=crop',
            description: 'A beloved Minneapolis staple known for its industrial-chic atmosphere, expertly crafted espresso drinks, and commitment to single-origin beans.'
        },
        {
            name: 'Dogwood Coffee',
            slug: 'dogwood',
            address: '4101 Harriet Ave S',
            city: 'Minneapolis',
            state: 'MN',
            zip: '55409',
            image: 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=800&auto=format&fit=crop',
            description: 'A Minneapolis roaster and cafe with a bright, welcoming atmosphere. Known for thoughtfully sourced beans and precision brewing methods.'
        },
        {
            name: 'Quixotic Coffee',
            slug: 'quixotic',
            address: '769 Cleveland Ave S',
            city: 'St. Paul',
            state: 'MN',
            zip: '55116',
            image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=800&auto=format&fit=crop',
            description: 'A cozy St. Paul neighborhood cafe with a rotating menu of specialty coffees and a warm, community-focused vibe.'
        },
        {
            name: 'Five Watt Coffee',
            slug: 'fivewatt',
            address: '3757 Chicago Ave',
            city: 'Minneapolis',
            state: 'MN',
            zip: '55407',
            image: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=800&auto=format&fit=crop',
            description: 'South Minneapolis coffeehouse celebrated for its creative seasonal drinks, relaxed atmosphere, and dedication to quality sourcing.'
        }
    ]

    for (const loc of locations) {
        await pool.query(
            `INSERT INTO locations (name, slug, address, city, state, zip, image, description)
             VALUES ($1, $2, $3, $4, $5, $6, $7, $8)`,
            [loc.name, loc.slug, loc.address, loc.city, loc.state, loc.zip, loc.image, loc.description]
        )
    }

    const events = [
        // Spyhouse (id: 1)
        {
            title: 'Latte Art Workshop',
            date: '2026-03-22',
            time: '14:00:00',
            image: 'https://images.unsplash.com/photo-1534040385115-33dcb3acba5b?w=800&auto=format&fit=crop',
            description: 'Learn the art of milk steaming and pouring beautiful latte art with our head barista.',
            location_id: 1
        },
        {
            title: 'Ethiopian Coffee Tasting',
            date: '2026-03-01',
            time: '11:00:00',
            image: 'https://images.unsplash.com/photo-1442512595331-e89e73853f31?w=800&auto=format&fit=crop',
            description: 'Explore the complex flavors of our newest Ethiopian single-origin beans with guided tasting notes.',
            location_id: 1
        },
        {
            title: 'Barista Championship Watch Party',
            date: '2026-04-05',
            time: '13:00:00',
            image: 'https://images.unsplash.com/photo-1510591509098-f4fdc6d0ff04?w=800&auto=format&fit=crop',
            description: 'Watch the regional barista championship live on the big screen while enjoying specialty drinks.',
            location_id: 1
        },
        // Dogwood (id: 2)
        {
            title: 'Cold Brew Release Party',
            date: '2026-04-12',
            time: '12:00:00',
            image: 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=800&auto=format&fit=crop',
            description: 'Be the first to taste our summer cold brew blend — refreshing, smooth, and complex.',
            location_id: 2
        },
        {
            title: 'Coffee & Jazz Night',
            date: '2026-02-28',
            time: '19:00:00',
            image: 'https://images.unsplash.com/photo-1415201364774-f6f0bb35f28f?w=800&auto=format&fit=crop',
            description: 'Unwind with live jazz music and curated coffee cocktails in our cozy back room.',
            location_id: 2
        },
        {
            title: 'Single Origin Cupping',
            date: '2026-03-28',
            time: '10:00:00',
            image: 'https://images.unsplash.com/photo-1446671756826-c5eca1025c74?w=800&auto=format&fit=crop',
            description: 'A guided cupping session exploring coffees from three continents. No experience needed!',
            location_id: 2
        },
        // Quixotic (id: 3)
        {
            title: 'Open Mic Night',
            date: '2026-03-21',
            time: '18:00:00',
            image: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800&auto=format&fit=crop',
            description: 'An open stage for local musicians, poets, and storytellers. Sign up at the door!',
            location_id: 3
        },
        {
            title: 'Pour Over Masterclass',
            date: '2026-03-08',
            time: '09:00:00',
            image: 'https://images.unsplash.com/photo-1484723091739-30a097e8f929?w=800&auto=format&fit=crop',
            description: 'Learn to brew the perfect pour over from our certified Q Grader.',
            location_id: 3
        },
        {
            title: 'Spring Blend Launch',
            date: '2026-04-18',
            time: '11:00:00',
            image: 'https://images.unsplash.com/photo-1504630083234-14187a9df0f5?w=800&auto=format&fit=crop',
            description: 'Join us for the launch of our seasonal spring blend with complimentary tastings all day.',
            location_id: 3
        },
        // Five Watt (id: 4)
        {
            title: 'Beginner Barista Class',
            date: '2026-03-29',
            time: '10:00:00',
            image: 'https://images.unsplash.com/photo-1521302200778-33500795e128?w=800&auto=format&fit=crop',
            description: 'Ever wanted to make espresso drinks at home? Learn the basics in this fun hands-on class.',
            location_id: 4
        },
        {
            title: 'Espresso & Chocolate Pairing',
            date: '2026-03-10',
            time: '15:00:00',
            image: 'https://images.unsplash.com/photo-1511920170033-f8396924c348?w=800&auto=format&fit=crop',
            description: 'Discover how different espresso roasts complement various chocolate profiles.',
            location_id: 4
        },
        {
            title: 'Coffee Documentary Screening',
            date: '2026-04-25',
            time: '18:30:00',
            image: 'https://images.unsplash.com/photo-1478720568477-152d9b164e26?w=800&auto=format&fit=crop',
            description: 'Watch "A Film About Coffee" followed by a discussion with our head roaster.',
            location_id: 4
        }
    ]

    for (const event of events) {
        await pool.query(
            `INSERT INTO events (title, date, time, image, description, location_id)
             VALUES ($1, $2, $3, $4, $5, $6)`,
            [event.title, event.date, event.time, event.image, event.description, event.location_id]
        )
    }

    console.log('✓ Tables created and seeded successfully!')
    pool.end()
}

createTables().catch(console.error)
