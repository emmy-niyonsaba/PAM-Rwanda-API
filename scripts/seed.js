import sequelize from './src/config/database.js';
import User from './src/models/User.js';
import LearningSession from './src/models/LearningSession.js';
import AfricanHistory from './src/models/AfricanHistory.js';
import Panafricanist from './src/models/Panafricanist.js';
import Opportunity from './src/models/Opportunity.js';
import { hashPassword } from './src/utils/auth.js';

async function seedDatabase() {
  try {
    await sequelize.authenticate();
    console.log('Database connected');

    await sequelize.sync({ alter: true });
    console.log('Database synchronized');

    // Seed Learning Sessions
    const sessions = await LearningSession.bulkCreate([
      {
        title: 'Introduction to Pan-Africanism',
        description: 'Learn the foundational principles of Pan-Africanism',
        content: 'Pan-Africanism is a worldwide movement that emerged in the early 20th century advocating for the unity of all Africans...',
        order: 1,
        duration: 45,
      },
      {
        title: 'African History: Pre-Colonial Era',
        description: 'Explore the rich pre-colonial African kingdoms and civilizations',
        content: 'Before European colonization, Africa had sophisticated kingdoms and empires with advanced political systems...',
        order: 2,
        duration: 60,
      },
      {
        title: 'Colonial Impact and Resistance',
        description: 'Understand colonialism and African resistance movements',
        content: 'European colonization changed Africa drastically. However, Africans resisted through various freedom movements...',
        order: 3,
        duration: 50,
      },
      {
        title: 'Independence and Nation Building',
        description: 'Study post-independence African nations',
        content: 'After gaining independence, African nations worked towards development and unity...',
        order: 4,
        duration: 55,
      },
    ]);

    console.log('Learning sessions seeded');

    // Seed African History
    await AfricanHistory.bulkCreate([
      {
        title: 'Egypt: Gift of the Nile',
        content: 'Ancient Egypt, one of the world"s oldest civilizations, flourished along the Nile River with advanced agriculture, architecture, and governance.',
        country: 'Egypt',
        era: 'precolonial',
        year: -3100,
      },
      {
        title: 'Mali Empire: Golden Age of African Civilization',
        content: 'The Mali Empire (1226-1600s) was a powerful West African empire known for its wealth in gold, Islamic scholarship, and great cities like Timbuktu.',
        country: 'Mali',
        era: 'precolonial',
        year: 1226,
      },
      {
        title: 'Great Zimbabwe: Architectural Marvel',
        content: 'Great Zimbabwe was a medieval city in southern Africa, famous for its stone structures and thriving trade network.',
        country: 'Zimbabwe',
        era: 'precolonial',
        year: 1100,
      },
      {
        title: 'Berlin Conference 1884-1885',
        content: 'European powers partitioned Africa without African representation, marking the beginning of formal colonialism.',
        country: 'Pan-Africa',
        era: 'colonial',
        year: 1884,
      },
      {
        title: 'Rwanda Independence',
        content: 'Rwanda gained independence from Belgian rule in 1962, beginning its journey as a sovereign nation.',
        country: 'Rwanda',
        era: 'postindependence',
        year: 1962,
      },
    ]);

    console.log('African history seeded');

    // Seed Panafricanists
    await Panafricanist.bulkCreate([
      {
        name: 'Kwame Nkrumah',
        biography: 'First President of independent Ghana and one of the key figures in Pan-Africanism',
        contributions: 'Led Ghana to independence and advocated for continental African unity',
        country: 'Ghana',
        birthYear: 1909,
        deathYear: 1972,
        era: '20th Century',
      },
      {
        name: 'Nelson Mandela',
        biography: 'Anti-apartheid revolutionary and first Black president of South Africa',
        contributions: 'Fought against racial segregation and promoted African unity and democracy',
        country: 'South Africa',
        birthYear: 1918,
        deathYear: 2013,
        era: 'Modern',
      },
      {
        name: 'Thomas Sankara',
        biography: 'Revolutionary leader of Burkina Faso who championed African self-reliance',
        contributions: 'Promoted African independence, anti-imperialism, and indigenous African solutions',
        country: 'Burkina Faso',
        birthYear: 1949,
        deathYear: 1987,
        era: '20th Century',
      },
      {
        name: 'Haile Selassie',
        biography: 'Emperor of Ethiopia and symbol of African independence',
        contributions: 'Represented Africa on the world stage and opposed colonialism',
        country: 'Ethiopia',
        birthYear: 1892,
        deathYear: 1975,
        era: '20th Century',
      },
    ]);

    console.log('Panafricanists seeded');

    // Seed Opportunities
    await Opportunity.bulkCreate([
      {
        title: 'African Tech Innovation Fund',
        description: 'Startup funding for African tech entrepreneurs',
        type: 'startup',
        country: 'Pan-Africa',
        organization: 'African Tech Hub',
        link: 'https://africantechhub.com',
        deadline: new Date('2026-12-31'),
      },
      {
        title: 'African Leaders Scholarship Program',
        description: 'Full scholarship for master"s studies at African universities',
        type: 'scholarship',
        country: 'Pan-Africa',
        organization: 'African Education Foundation',
        link: 'https://africaneducation.org',
        deadline: new Date('2026-06-30'),
      },
      {
        title: 'Pan-African Enterprise Jobs',
        description: 'Career opportunities with leading African companies',
        type: 'job',
        country: 'Pan-Africa',
        organization: 'African Enterprise Network',
        link: 'https://africanenterprise.org/jobs',
        deadline: new Date('2026-05-31'),
      },
    ]);

    console.log('Opportunities seeded');

    // Seed Admin User
    const adminPassword = await hashPassword('admin123');
    await User.create({
      firstName: 'Admin',
      lastName: 'User',
      email: 'admin@pam.africa',
      password: adminPassword,
      country: 'Pan-Africa',
      role: 'admin',
      isMember: true,
    });

    console.log('Admin user created');
    console.log('Database seeding completed successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase();
