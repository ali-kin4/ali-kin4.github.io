// Populates the subject page based on the "topic" query parameter.
// A map of slugs to subject details drives the content. If the slug is
// missing or unknown, the page will show a friendly 404 message.

document.addEventListener('DOMContentLoaded', () => {
  // Map each slug to its descriptive content.
  const subjects = {
    'machine-learning-ai': {
      title: 'Machine Learning & AI',
      description:
        'Master the foundations of machine learning, from data preprocessing to neural networks. Through hands‑on lessons and real‑world projects, you’ll gain the skills to build intelligent systems with confidence.',
      topics: [
        'Supervised and unsupervised learning techniques',
        'Neural networks and deep learning fundamentals',
        'Model evaluation, optimisation and deployment',
        'AI ethics and real‑world applications'
      ],
      price: 'From $60/hr'
    },
    'python-data-science': {
      title: 'Python & Data Science',
      description:
        'Develop a solid foundation in Python programming and data science. You’ll learn to clean and analyse data, build visualisations and automate tasks to solve real problems.',
      topics: [
        'Data wrangling and cleaning with pandas',
        'Visualisation with Matplotlib & Seaborn',
        'Automation and scripting for efficiency',
        'Project‑based learning with practical examples'
      ],
      price: 'From $55/hr'
    },
    'mechanical-engineering': {
      title: 'Mechanical Engineering',
      description:
        'Explore core mechanical engineering concepts and tools. From thermodynamics to CAD/CAE, gain the skills needed for coursework, research and industry projects.',
      topics: [
        'Thermodynamics and heat transfer',
        'Computer‑aided design and analysis (CAD/CAE)',
        'Finite element analysis fundamentals',
        'Project guidance and thesis support'
      ],
      price: 'From $65/hr'
    },
    'excel-data-analysis': {
      title: 'Excel & Data Analysis',
      description:
        'Transform raw data into actionable insights using Excel. Learn formulas, pivot tables and dashboard techniques along with automation via VBA.',
      topics: [
        'Formulas, functions and pivot tables',
        'VBA scripting for automation',
        'Dashboard creation and visualisation',
        'Best practices for data analysis'
      ],
      price: 'From $50/hr'
    },
    'crypto-trading-basics': {
      title: 'Crypto & Trading Basics',
      description:
        'Get a solid introduction to the world of cryptocurrencies and trading. Understand blockchain fundamentals, interpret charts and manage risk like a professional.',
      topics: [
        'Blockchain fundamentals and terminology',
        'Technical analysis & chart patterns',
        'Risk management and position sizing',
        'Portfolio diversification strategies'
      ],
      price: 'From $45/hr'
    },
    'confidence-time-management': {
      title: 'Confidence & Time Management',
      description:
        'Build unshakeable confidence and learn to manage your time effectively. Master communication, prioritisation and mindset techniques to excel in your studies and career.',
      topics: [
        'Overcoming anxiety and self‑doubt',
        'Goal setting and prioritisation methods',
        'Effective communication and assertiveness',
        'Work‑life balance and productivity hacks'
      ],
      price: 'From $40/hr'
    },
    'accounting-principles': {
      title: 'Accounting Principles',
      description:
        'Understand the language of business through accounting. Learn fundamental concepts, financial statements and prepare for academic exams or professional qualifications.',
      topics: [
        'Double‑entry accounting and ledgers',
        'Preparing financial statements',
        'Budgeting and forecasting techniques',
        'CPA exam preparation'
      ],
      price: 'From $50/hr'
    },
    'corporate-finance': {
      title: 'Corporate Finance',
      description:
        'Master the key principles of corporate finance. From valuation to capital budgeting, build solid financial models and analyse investment opportunities.',
      topics: [
        'Valuation methods (DCF, comparables)',
        'Capital budgeting and investment decisions',
        'Financial modelling in Excel',
        'Risk analysis and management'
      ],
      price: 'From $55/hr'
    },
    'large-language-models': {
      title: 'Large Language Models',
      description:
        'Dive into cutting‑edge natural language processing. Learn prompt engineering, fine‑tune existing models and deploy LLMs responsibly in your own applications.',
      topics: [
        'Prompt engineering and best practices',
        'Transformer architectures explained',
        'Fine‑tuning on custom datasets',
        'Deployment and ethical considerations'
      ],
      price: 'From $70/hr'
    },
    'solidworks-cad': {
      title: 'SolidWorks CAD',
      description:
        'Become proficient in SolidWorks for parametric modelling and mechanical design. Learn to create assemblies, drawings and simulations that meet industry standards.',
      topics: [
        'Parametric modelling basics',
        'Assembly design and mating',
        'Creating production drawings',
        'Using built‑in simulation tools'
      ],
      price: 'From $60/hr'
    },
    'ansys-fea-cfd': {
      title: 'ANSYS FEA/CFD',
      description:
        'Master simulation techniques for structural and fluid analyses using ANSYS. Learn how to set up models, mesh effectively and interpret your results.',
      topics: [
        'Setting up FEA and CFD simulations',
        'Meshing strategies and boundary conditions',
        'Interpreting and validating results',
        'Optimising designs using simulation feedback'
      ],
      price: 'From $70/hr'
    },
    'autocad-drafting': {
      title: 'AutoCAD Drafting',
      description:
        'Learn the essentials of 2D and 3D drafting in AutoCAD. You’ll master layers, blocks, plotting and advanced modelling techniques.',
      topics: [
        '2D and 3D drafting essentials',
        'Layer management and blocks',
        'Plotting and annotation',
        'Advanced modelling workflows'
      ],
      price: 'From $55/hr'
    },
    'sage-accounting': {
      title: 'Sage Accounting',
      description:
        'Harness the power of Sage for small business accounting. From setting up ledgers to generating reports, simplify your financial management.',
      topics: [
        'Setting up accounts and ledgers',
        'Automating invoicing and billing',
        'Generating financial reports',
        'Integrating Sage with your business workflows'
      ],
      price: 'From $50/hr'
    },
    'mathematics-all-levels': {
      title: 'Mathematics (All Levels)',
      description:
        'Build a strong mathematical foundation from basic arithmetic to advanced calculus. Lessons are tailored to your syllabus and learning style.',
      topics: [
        'Algebra and geometry fundamentals',
        'Differential and integral calculus',
        'Differential equations basics',
        'Problem‑solving strategies and proofs'
      ],
      price: 'From $45/hr'
    },
    algebra: {
      title: 'Algebra',
      description:
        'From linear systems to abstract algebra, this subject demystifies equations and structures. Learn to manipulate expressions and explore algebraic thinking.',
      topics: [
        'Linear algebra basics and matrices',
        'Abstract algebra concepts',
        'Equation solving and factoring',
        'Functions, graphs and transformations'
      ],
      price: 'From $40/hr'
    },
    physics: {
      title: 'Physics',
      description:
        'Explore the laws that govern the universe. With practical demonstrations and problem‑solving, you’ll gain intuition for mechanics, electromagnetism and modern physics.',
      topics: [
        'Mechanics and dynamics',
        'Electricity and magnetism',
        'Waves, optics and thermodynamics',
        'Modern physics and relativity'
      ],
      price: 'From $45/hr'
    }
  };

  // Helper to extract a query parameter from the URL.
  function getQueryParam(name) {
    const params = new URLSearchParams(window.location.search);
    return params.get(name);
  }

  const slug = getQueryParam('topic');
  const subject = subjects[slug];

  const titleEl = document.getElementById('subject-title');
  const descEl = document.getElementById('subject-description');
  const listEl = document.getElementById('subject-topics');
  const priceEl = document.getElementById('subject-price');

  if (!subject) {
    // If the subject doesn’t exist, show a 404 message
    titleEl.textContent = 'Subject Not Found';
    descEl.textContent = 'The page you are looking for does not exist.';
    listEl.innerHTML = '';
    priceEl.textContent = '';
  } else {
    // Populate page with subject details
    document.title = `${subject.title} – Ali Jabbary`;
    titleEl.textContent = subject.title;
    descEl.textContent = subject.description;
    // Clear any existing list items
    listEl.innerHTML = '';
    subject.topics.forEach((topic) => {
      const li = document.createElement('li');
      li.textContent = topic;
      listEl.appendChild(li);
    });
    priceEl.textContent = subject.price;
  }
  // Update footer year
  document.getElementById('year').textContent = new Date().getFullYear();
});