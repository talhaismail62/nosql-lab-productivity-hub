// seed.js
// =============================================================================
//  Seed the database with realistic test data.
//  Run with: npm run seed
//
//  Required minimum:
//    - 2 users
//    - 4 projects (split across the users)
//    - 5 tasks (with embedded subtasks and tags arrays)
//    - 5 notes (some attached to projects, some standalone)
//
//  Use the bcrypt module to hash passwords before inserting users.
//  Use ObjectId references for relationships (projectId, ownerId).
// =============================================================================

require('dotenv').config();
const bcrypt = require('bcryptjs');
const { connect } = require('./db/connection');

(async () => {
  const db = await connect();

  // OPTIONAL: clear existing data so re-seeding is idempotent
  await db.collection('users').deleteMany({});
  await db.collection('projects').deleteMany({});
  await db.collection('tasks').deleteMany({});
  await db.collection('notes').deleteMany({});

  const pass1 = await bcrypt.hash('bigredcow', 10);
  const u1 = await db.collection('users').insertOne({ 
    email: "cow@gmail.com",
    passwordHash: pass1,
    name: "COW",
    createdAt: new Date()
  });

  const pass2 = await bcrypt.hash('mango', 10);
  const u2 = await db.collection('users').insertOne({ 
    email: "fruits@gmail.com",
    passwordHash: pass2,
    name: "MANGO",
    createdAt: new Date()
  });

  const id1 = u1.insertedId;
  const id2 = u2.insertedId;

  const p1 = await db.collection('projects').insertOne({
    ownerId: id1,
    name: "Project ONE ONE ONE",
    description: "Hum cow hain",
    archived: false,
    createdAt: new Date()
  })

  const p2 = await db.collection('projects').insertOne({
    ownerId: id1,
    name: "Project TWO TOW TWO",
    description: "2 COW",
    archived: false,
    createdAt: new Date()
  })

  const p3 = await db.collection('projects').insertOne({
    ownerId: id2,
    name: "Project THREE THREE THREE",
    description: "3 COW",
    archived: false,
    createdAt: new Date()
  })

  const p4 = await db.collection('projects').insertOne({
    ownerId: id2,
    name: "Project FOUR FOUR FOUR",
    description: "4 COW",
    archived: true,
    createdAt: new Date()
  })
  
  const t1 = await db.collection('tasks').insertOne({
    ownerId: id1,
    projectId: p1.insertedId,
    title: "TASK PEHLA",
    status: "in-progress",
    priority: 2,
    tags: ["apple","mango","juice"],
    subtasks: [
      { title: "subtask one", done: false }
    ],
    description: "Hum achaar daalte hain",         // schema flexibility
    dueDate: new Date('2026-4-28T23:59:00Z'),               // schema flexibility
    createdAt: new Date()
  }) 

  const t2 = await db.collection('tasks').insertOne({
    ownerId: id1,
    projectId: p1.insertedId,
    title: "TASK DOOSRA",
    status: "done",
    priority: 1,
    tags: ["apple","mango","juice"],
    subtasks: [
      { title: "subtask one", done: false }
    ],
    description: "Hum achaar daalte hain",         // schema flexibility
    dueDate: new Date('2026-4-27T23:59:00Z'),               // schema flexibility
    createdAt: new Date()
  }) 

  const t3 = await db.collection('tasks').insertOne({
    ownerId: id1,
    title: "TASK TEESRA",
    status: "in-progress",
    priority: 4,
    tags: ["apple","mango","juice"],
    subtasks: [
      { title: "subtask one", done: false }
    ],        // schema flexibility
    dueDate: new Date('2026-4-29T23:59:00Z'),               // schema flexibility
    createdAt: new Date()
  }) 

  const t4 = await db.collection('tasks').insertOne({
    ownerId: id2,
    projectId: p2.insertedId,
    title: "TASK FOUR",
    status: "todo",
    priority: 5,
    tags: ["apple","mango","juice"],
    subtasks: [
      { title: "subtask one", done: true },
      { title: "subtask two", done: false }
    ],
    description: "Hum achaar daalte hain",         // schema flexibility
    dueDate: new Date('2026-5-1T23:59:00Z'),               // schema flexibility
    createdAt: new Date()
  }) 

  const t5 = await db.collection('tasks').insertOne({
    ownerId: id2,
    projectId: p2.insertedId,
    title: "TASK PANCHWA",
    status: "in-progress",
    priority: 2,
    tags: ["apple","mango","juice"],
    subtasks: [
      { title: "subtask one", done: false }
    ],       // schema flexibility
    dueDate: new Date('2026-4-28T21:59:00Z'),               // schema flexibility
    createdAt: new Date()
  }) 

  const n1 = await db.collection('notes').insertOne({
    ownerId: id1,
    projectId: p1.insertedId,
    title: "NOTE ONE",
    body: "MAI TAG AUR MERE PYARE MAMA, ACHI HA PYARI HA HUMARE FAMILY, MISAALI HA NIYAARI HA SAMRE FAMILY!",
    tags: [],
    pinned: true,             // schema flexibility — only on some
    createdAt: new Date()
  })

  const n2 = await db.collection('notes').insertOne({
    ownerId: id1,
    projectId: p1.insertedId,
    title: "NOTE TWO",
    body: "MAI AIK NOTE HON",
    tags: ['tag', 'tag'],
    pinned: false,             // schema flexibility — only on some
    createdAt: new Date()
  })

  const n3 = await db.collection('notes').insertOne({
    ownerId: id2,
    title: "NOTE THREE",
    body: "MAI AIK NOTE HON",
    tags: [],
    pinned: false,             // schema flexibility — only on some
    createdAt: new Date()
  })

  const n4 = await db.collection('notes').insertOne({
    ownerId: id2,
    projectId: p2.insertedId,
    title: "NOTE FOUR",
    body: "MAI AIK NOTE HON",
    tags: [],
    pinned: false,             // schema flexibility — only on some
    createdAt: new Date()
  })

  const n5 = await db.collection('notes').insertOne({
    ownerId: id2,
    projectId: p2.insertedId,
    title: "NOTE FIVE",
    body: "MAI AIK NOTE HON",
    tags: false,
    pinned: false,             // schema flexibility — only on some
    createdAt: new Date()
  })

  console.log('TODO: implement seed.js');
  process.exit(0);
})();
