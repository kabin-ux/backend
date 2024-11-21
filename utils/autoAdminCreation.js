import bcrypt from 'bcrypt';
import User from '../users/userModel.js';
import QuestionModel from '../questions/questionModel.js';
import TopicModel from '../ctf-topic/topicModel.js';

export const createAdminTopicAndQuestion = async () => {
  try {
    let user = await User.findOne({ role: 'admin' });
    let adminId;

    if (!user) {
      const hashedPassword = await bcrypt.hash('Admin@123', 10);

      const adminUser = new User({
        fullname: 'admin',
        username: 'admin',
        email: 'admin@gmail.com',
        password: hashedPassword,
        country: 'Nepal',
        role: 'admin',
        province: 'Bagmati',
        district: 'Kathmandu',
      });

      user = await adminUser.save();
      adminId = user._id;
      console.log('Admin created successfully');
    } else {
      adminId = user._id;
    }

    let topic = await TopicModel.findOne({ topic: 'Phishing' });
    let topicId;

    if (!topic) {
      const newTopic = new TopicModel({
        topic: 'Phishing',
        image: 'https://res.cloudinary.com/dkmvrsxbs/image/upload/v1722590302/Phising_ojc8pq.png',
        description: 'This topic delves into the concept of phishing, a prevalent cyber attack method where attackers deceive individuals into divulging sensitive information. It covers various phishing techniques, tools used by attackers, and real-world scenarios to help understand and mitigate the risks associated with phishing attacks.',
        difficulty: 'Medium',
        createdBy: adminId,
      });

      topic = await newTopic.save();
      topicId = topic._id;
      console.log('Topic created successfully!');
    } else {
      topicId = topic._id;
    }

    const questionCount = await QuestionModel.countDocuments();
    if (questionCount === 0) {
      const question = new QuestionModel({
        scenario: 'You receive an email asking you to verify your account details. Evaluate the signs to determine if it might be a phishing attempt.',
        quiz: [
          {
            question: 'What is a typical sign of a phishing email?',
            options: ['Errors', 'Signature', 'Personalization', 'Legitimacy'],
            correctAnswers: ['Errors'],
            hint: 'Phishing emails often contain spelling and grammatical mistakes.',
            hintkey: 4,
          },
          {
            question: 'What should you do with a suspected phishing email?',
            options: ['Delete', 'Click', 'Forward', 'Reply'],
            correctAnswers: ['Forward'],
            hint: 'Report the email to your IT department or security team for verification.',
            hintkey: 2,
          },
          {
            question: 'Which of the following are common signs of a phishing attack?',
            options: [
              'Urgent requests',
              'Unsolicited attachments',
              'Personal greetings',
              'Official logos',
            ],
            correctAnswers: ['Urgent requests', 'Unsolicited attachments'],
            hint: 'Phishing attacks often use urgency and unsolicited attachments to trick victims.',
            hintkey: 1,
          },
        ],
        topic: topicId,
        createdBy: adminId,
      });

      await question.save();
      console.log('Questions created successfully!');
    }
  } catch (error) {
    console.error(`Error while creating questions: ${error.message}`);
    return;
  }
};
