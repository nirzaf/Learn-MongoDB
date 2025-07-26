import { PrismaClient } from '@prisma/client';
import { config } from 'dotenv';

// Load environment variables
config({ path: '.env.local' });

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting database seeding...');

  // Clear existing data
  await prisma.userProgress.deleteMany();
  await prisma.challenge.deleteMany();
  await prisma.lesson.deleteMany();
  await prisma.module.deleteMany();
  await prisma.user.deleteMany();

  // Create Tier 1: MongoDB Fundamentals Module
  const fundamentalsModule = await prisma.module.create({
    data: {
      title: 'MongoDB Fundamentals',
      description: 'Learn the basics of MongoDB, including documents, collections, and basic operations.',
      tier: 1,
      order: 1,
    },
  });

  // Create lessons for MongoDB Fundamentals
  const lessons = [
    {
      title: 'Introduction to MongoDB',
      description: 'Understanding what MongoDB is and its key concepts',
      content: `# Introduction to MongoDB

MongoDB is a NoSQL document database that stores data in flexible, JSON-like documents. Unlike traditional relational databases, MongoDB doesn't require a predefined schema, making it ideal for applications with evolving data requirements.

## Key Concepts

### Documents
Documents are the basic unit of data in MongoDB, similar to rows in relational databases. They are stored in BSON (Binary JSON) format.

Example document:
\`\`\`json
{
  "_id": ObjectId("..."),
  "name": "John Doe",
  "email": "john@example.com",
  "age": 30,
  "hobbies": ["reading", "coding", "hiking"]
}
\`\`\`

### Collections
Collections are groups of documents, similar to tables in relational databases. Collections don't enforce a schema, so documents within a collection can have different fields.

### Databases
A MongoDB instance can host multiple databases, each containing multiple collections.

## Advantages of MongoDB

1. **Flexible Schema**: Documents can have different structures
2. **Scalability**: Built-in support for horizontal scaling
3. **Rich Query Language**: Powerful querying capabilities
4. **High Performance**: Optimized for read and write operations
5. **JSON-like Documents**: Natural fit for modern applications

## When to Use MongoDB

- Rapid application development
- Applications with evolving schemas
- Real-time analytics
- Content management systems
- IoT applications`,
      order: 1,
      moduleId: fundamentalsModule.id,
    },
    {
      title: 'Documents and Collections',
      description: 'Deep dive into MongoDB documents and collections',
      content: `# Documents and Collections

## Documents in Detail

MongoDB documents are BSON objects that can contain:
- **Scalar values**: strings, numbers, booleans, dates
- **Arrays**: ordered lists of values
- **Embedded documents**: nested objects
- **ObjectIds**: unique identifiers

### Document Structure
\`\`\`json
{
  "_id": ObjectId("507f1f77bcf86cd799439011"),
  "title": "MongoDB Tutorial",
  "author": {
    "name": "Jane Smith",
    "email": "jane@example.com"
  },
  "tags": ["database", "nosql", "mongodb"],
  "published": true,
  "publishedDate": ISODate("2023-01-15T10:30:00Z"),
  "views": 1250
}
\`\`\`

## Collections

Collections are schema-less containers for documents. Key characteristics:

1. **Dynamic Schema**: Documents can have different fields
2. **No Joins**: Related data can be embedded or referenced
3. **Indexing**: Support for various index types
4. **Capped Collections**: Fixed-size collections with insertion order

### Collection Naming Conventions
- Use lowercase names
- Use underscores for multi-word names
- Avoid special characters
- Keep names descriptive but concise

Examples: \`users\`, \`blog_posts\`, \`product_reviews\`

## Data Types

MongoDB supports various BSON data types:
- **String**: UTF-8 strings
- **Number**: 32-bit and 64-bit integers, doubles
- **Boolean**: true/false
- **Date**: BSON date type
- **ObjectId**: 12-byte unique identifier
- **Array**: Ordered list of values
- **Object**: Embedded document
- **Null**: Null value
- **Binary**: Binary data`,
      order: 2,
      moduleId: fundamentalsModule.id,
    },
    {
      title: 'Basic CRUD Operations',
      description: 'Learn Create, Read, Update, and Delete operations',
      content: `# Basic CRUD Operations

CRUD operations are the foundation of database interactions. MongoDB provides intuitive methods for each operation.

## Create Operations

### insertOne()
Insert a single document:
\`\`\`javascript
db.users.insertOne({
  name: "Alice Johnson",
  email: "alice@example.com",
  age: 28,
  city: "New York"
});
\`\`\`

### insertMany()
Insert multiple documents:
\`\`\`javascript
db.users.insertMany([
  { name: "Bob Smith", email: "bob@example.com", age: 32 },
  { name: "Carol Davis", email: "carol@example.com", age: 25 }
]);
\`\`\`

## Read Operations

### find()
Query documents:
\`\`\`javascript
// Find all users
db.users.find();

// Find users with specific criteria
db.users.find({ age: { $gte: 25 } });

// Find with projection (specific fields)
db.users.find({}, { name: 1, email: 1, _id: 0 });
\`\`\`

### findOne()
Find a single document:
\`\`\`javascript
db.users.findOne({ email: "alice@example.com" });
\`\`\`

## Update Operations

### updateOne()
Update a single document:
\`\`\`javascript
db.users.updateOne(
  { email: "alice@example.com" },
  { $set: { age: 29, city: "San Francisco" } }
);
\`\`\`

### updateMany()
Update multiple documents:
\`\`\`javascript
db.users.updateMany(
  { age: { $lt: 30 } },
  { $set: { category: "young_adult" } }
);
\`\`\`

## Delete Operations

### deleteOne()
Delete a single document:
\`\`\`javascript
db.users.deleteOne({ email: "bob@example.com" });
\`\`\`

### deleteMany()
Delete multiple documents:
\`\`\`javascript
db.users.deleteMany({ age: { $lt: 18 } });
\`\`\`

## Best Practices

1. **Always use specific queries** for updates and deletes
2. **Use projection** to limit returned fields
3. **Consider using upsert** for conditional inserts
4. **Validate data** before insertion
5. **Use appropriate data types** for better performance`,
      order: 3,
      moduleId: fundamentalsModule.id,
    },
  ];

  // Insert lessons
  for (const lessonData of lessons) {
    await prisma.lesson.create({ data: lessonData });
  }

  console.log('✅ Database seeding completed successfully!');
  console.log(`Created ${lessons.length} lessons in the MongoDB Fundamentals module.`);
}

main()
  .catch((e) => {
    console.error('❌ Error during seeding:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
