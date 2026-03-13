require('dotenv').config();
const connectDB = require('../config/db');
const User = require('../models/User');
const Lesson = require('../models/Lesson');
const Progress = require('../models/Progress');
const userService = require('../services/userService');

const run = async () => {
  try {
    await connectDB();

    console.log('Clearing database...');
    await Promise.all([User.deleteMany(), Lesson.deleteMany(), Progress.deleteMany()]);

    console.log('Creating users...');
    const admin = await userService.createUser({
      name: 'Admin',
      email: 'admin@example.com',
      password: 'password123',
      role: 'admin',
    });

    const student = await userService.createUser({
      name: 'Student',
      email: 'student@example.com',
      password: 'password123',
      role: 'student',
    });

    console.log('Creating lessons...');
    const lessons = await Lesson.create([
      {
        title: 'Basic Greetings',
        description: 'Learn common English greetings.',
        content: 'Hello, Hi, Good morning, ...',
        difficulty: 'beginner',
      },
      {
        title: 'Present Simple',
        description: 'Introduction to present simple tense.',
        content: 'I work. You work. He works...',
        difficulty: 'beginner',
      },
      {
        title: 'Past Tenses',
        description: 'Learn past simple and past continuous.',
        content: 'I walked. I was walking...',
        difficulty: 'intermediate',
      },
    ]);

    console.log('Creating progress...');
    await Progress.create({
      user: student._id,
      lesson: lessons[0]._id,
      status: 'completed',
      score: 90,
    });

    await Progress.create({
      user: student._id,
      lesson: lessons[1]._id,
      status: 'in-progress',
      score: 65,
    });

    console.log('Seed complete!');
    process.exit(0);
  } catch (error) {
    console.error('Seed failed', error);
    process.exit(1);
  }
};

run();
