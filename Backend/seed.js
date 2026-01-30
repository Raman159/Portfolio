import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Certificate from './models/Certificate.js';
import Project from './models/Project.js';
import Experience from './models/Experience.js';
import Admin from './models/Admin.js';
import Profile from './models/Profile.js';
import Education from './models/Education.js';

dotenv.config();

const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/portfolioDB';

const certificates = [
  {
    title: "AWS Academy Cloud Foundations - Basic Practitioner",
    date: "07-20-2023",
    description: "Developed a strong understanding of cloud computing concepts and AWS foundational services, security, architecture, and support."
  },
  {
    title: "Machine Learning and AI Workshop",
    date: "16-hour Workshop",
    description: "Gained hands-on experience in obtaining, cleaning, and processing data, as well as developing machine-learning models."
  },
  {
    title: "IT Course at Right Choice Academy",
    date: "2021 – 2022",
    description: "Completed an IT course focused on Microsoft Office Tools, web development, and graphic design."
  },
  {
    title: "Instagram Marketing Strategy",
    date: "16-01-2024",
    description: "Training in Instagram marketing strategies, covering content creation, audience engagement, and growth techniques."
  },
  {
    title: "Social Media Marketing & Management",
    date: "03-02-2024",
    description: "Focused on social media management, content strategy, and using analytics to enhance online branding."
  }
];

const projects = [
  {
    title: "Reflex Solutions Website",
    description: "Designed Reflex IT solution new website with animation and UI focused with react for learning purpose.",
    tech: ["React", "CSS", "Animations"],
    category: "Web Development",
    year: "2024",
    visitLink: "https://reflexitsolution.com"
  },
  {
    title: "Café Management System",
    description: "Worked on a café management system using Java, focusing on order management, inventory tracking, and user interface design.",
    tech: ["Java", "Database"],
    category: "Desktop Application",
    year: "2023"
  },
  {
    title: "KIST Hackathon: Blood Donation Web Project",
    description: "Participated in KIST Hackathon, developing a Blood Donation web platform using HTML, CSS, JavaScript, Bootstrap, jQuery, and Node.js.",
    tech: ["HTML/CSS", "JavaScript", "Bootstrap", "jQuery", "Node.js"],
    category: "Web Development",
    year: "2023"
  },
  {
    title: "MERN Stack Freelancing Platform",
    description: "Freelancing platform using MERN with email, AI Chatbot, real-time messaging features.",
    tech: ["MongoDB", "Express", "React", "Node.js", "AI Chatbot"],
    category: "Full Stack",
    year: "2024"
  },
  {
    title: "Data Analysis using R",
    description: "Conducted data analysis on a student dataset, investigating factors such as age, gender, scholarship, family background, and academic performance.",
    tech: ["R", "Data Analysis", "Statistics"],
    category: "Data Science",
    year: "2023"
  },
  {
    title: "Climate Data Analysis in Python",
    description: "Analyzed climate data in Nepal using Python, focusing on data preprocessing, visualization, regression, and predictive modeling.",
    tech: ["Python", "Data Visualization", "Machine Learning"],
    category: "Data Science",
    year: "2023"
  },
  {
    title: "Learning Management System (LMS) in .NET Web Forms",
    description: "Developed an LMS platform using ASP.NET Web Forms, providing features for course management, student, teacher and admin enrollment.",
    tech: [".NET", "ASP.NET", "SQL"],
    category: "Web Development",
    year: "2023"
  },
  {
    title: "E-commerce Platform on .NET Web Forms",
    description: "Created a e-commerce platform with email support on .NET webforms.",
    tech: [".NET", "ASP.NET", "Email Integration"],
    category: "Web Development",
    year: "2023"
  }
];

const experiences = [
  {
    company: "Reflex It Solution Pvt. Ltd.",
    position: "Frontend Development Intern",
    duration: "2024 (3 months)",
    description: [
      "Developed responsive web applications using React.js and modern frontend technologies",
      "Collaborated with design team to implement UI/UX improvements",
      "Optimized website performance and improved loading times",
      "Participated in code reviews and agile development processes"
    ],
    location: "Kathmandu, Nepal",
    type: "Internship"
  }
];

const admin = {
  username: 'admin',
  password: 'admin123'
};

const profile = {
  aboutMe: "I am a passionate Full Stack Developer with expertise in MERN stack, .NET, and data science. I love building innovative solutions and learning new technologies.",
  technicalSkills: ["React", "Node.js", "MongoDB", "Express", ".NET", "Python", "Java", "R", "Data Analysis", "Machine Learning"],
  softSkills: ["Communication", "Problem Solving", "Team Collaboration", "Time Management", "Adaptability"]
};

const education = [
  {
    degree: "Secondary Education Examination (SEE)",
    institution: "Meridian International School, Baluwatar",
    duration: "2020",
    description: "GPA: 3.40"
  },
  {
    degree: "+2 in Management with Computers",
    institution: "Bhanubhakta Memorial College, Panipokhari",
    duration: "2020 - 2022",
    description: "GPA: 3.03"
  },
  {
    degree: "Bachelor of Science in Information Technology",
    institution: "Lord Buddha Education Foundation, Maitidevi",
    duration: "2022 - 2025",
    description: "GPA: 3.50"
  }
];

const seedDatabase = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log('✅ MongoDB Connected');

    await Certificate.deleteMany({});
    await Project.deleteMany({});
    await Experience.deleteMany({});
    await Admin.deleteMany({});
    await Profile.deleteMany({});
    await Education.deleteMany({});
    console.log('🗑️  Cleared existing data');

    await Certificate.insertMany(certificates);
    await Project.insertMany(projects);
    await Experience.insertMany(experiences);
    await Admin.create(admin);
    await Profile.create(profile);
    await Education.insertMany(education);
    console.log('✅ Database seeded successfully');
    console.log('👤 Admin credentials: username=admin, password=admin123');

    mongoose.connection.close();
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  }
};

seedDatabase();
