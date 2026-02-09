const translations = {
  he: {
    nav: {
      home: 'בית',
      projects: 'פרויקטים',
      team: 'שותפי דרך',
      skills: 'מיומנויות',
      experience: 'ניסיון',
      contact: 'יצירת קשר',
    },
    hero: {
      greeting: 'שלום, אני',
      name: 'ליפז נוסן',
      title: 'איש אופרציה, טכנולוגיה וניהול',
      subtitle: 'בונה כלים דיגיטליים, מנהל מערכות, ומוביל תהליכים טכנולוגיים',
      cta: 'צפו בפרויקטים',
      resume: 'קורות חיים',
    },
    projects: {
      title: 'הפרויקטים שלי',
      subtitle: 'מבחר פרויקטים שפיתחתי ובניתי',
      viewCode: 'קוד מקור',
      viewLive: 'צפה באתר',
      items: [
        {
          title: 'מערכת ניהול מתנדבים',
          description: 'מערכת Full-Stack לניהול סניפי מתנדבים — דשבורד ניהול, ניהול משתמשים, עיצוב באנרים דינמי לכל סניף, ואינטגרציה עם Redis.',
          tags: ['Next.js', 'Redis', 'Railway', 'REST API'],
          color: '#3b82f6',
        },
        {
          title: 'בוט טלגרם אוטומטי',
          description: 'בוט מתקדם ליצירת גרפיקות אוטומטיות — דוחות שבועיים, כרטיסי קבלת פנים, ניהול סניפים, עם ממשק ניהול וחיבור למערכת הראשית.',
          tags: ['Node.js', 'Telegram API', 'OG Images', 'Redis'],
          color: '#8b5cf6',
        },
        {
          title: 'מחולל גרפי סטטי',
          description: 'אפליקציית Single-Page ליצירת באנרים ודוחות שבועיים עם ייצוא ל-PNG, מערכת auto-save, dark mode, ושיתוף תבניות.',
          tags: ['HTML', 'CSS', 'JavaScript', 'html2canvas'],
          color: '#10b981',
        },
        {
          title: 'מנהל פידים לצוות תוכן',
          description: 'מערכת ניהול פידים מבוססת Next.js עם מסד נתונים בענן, ניהול מקורות תוכן מרובים, הטמעת embed חכמה, ופאנל ניהול — פרויקט צוותי עם 5 תורמים.',
          tags: ['Next.js', 'SQL', 'Cloud DB', 'Team Project'],
          color: '#f59e0b',
          // link removed
        },
        {
          title: 'ContentPilot — כלי תוכן חכם',
          description: 'פלטפורמת AI לניהול תוכן — מחולל כתבות, סורק טרנדים עם אלגוריתם ניקוד, ספירת מילות מפתח, והצעות תוכן אוטומטיות מבוססות Gemini AI.',
          tags: ['Python', 'Flask', 'Gemini AI', 'Web Scraping'],
          color: '#ef4444',
        },
        {
          title: 'ResumeKit — מחולל קורות חיים',
          description: 'כלי ליצירת כרטיס ביקור דיגיטלי וקורות חיים — מילוי טופס, הורדת ZIP עם שני דפי HTML מעוצבים, שליפת אווטאר מ-GitHub, ותמיכה בהדפסה.',
          tags: ['Next.js 15', 'React 19', 'Tailwind 4', 'JSZip'],
          color: '#06b6d4',
        },
        {
          title: 'AlertGen — מחולל התראות חירום',
          description: 'אפליקציה ליצירת הודעות חירום מעוצבות לארגוני מתנדבים — בחירת סוג אירוע, כתובת, קישור Waze ושיתוף ישיר ל-WhatsApp.',
          tags: ['React 19', 'Material UI', 'GeoJSON', 'WhatsApp API'],
          color: '#22c55e',
        },
      ],
    },
    team: {
      title: 'שותפי דרך',
      subtitle: 'האנשים שמובילים איתי את הדרך',
      members: [
        {
          name: 'ליפז נוסן',
          role: 'מייסד ומוביל טכנולוגי',
          desc: 'אופרציה, פיתוח וניהול פרויקטים',
          avatar: 'https://avatars.githubusercontent.com/u/18376581?v=4',
          isFuture: false,
        },
        {
          name: 'מחפשים אותך!',
          role: 'איש/ת מכירות ושירות לקוחות',
          desc: 'מישהו/י עם חשיבה עסקית, יחסי אנוש מעולים ודרייב — בואו נבנה ביחד',
          avatar: null,
          isFuture: true,
        },
        {
          name: 'מחפשים אותך!',
          role: 'מזכיר/ה ועוזר/ת אישי/ת',
          desc: 'מישהו/י עם יכולת ארגון גבוהה, תשומת לב לפרטים ויכולת ריבוי משימות',
          avatar: null,
          isFuture: true,
        },
      ],
    },
    skills: {
      title: 'מיומנויות',
      subtitle: 'הטכנולוגיות והכלים שאני עובד איתם',
      categories: [
        {
          name: 'פיתוח',
          items: ['JavaScript', 'Node.js', 'Next.js', 'React', 'HTML/CSS', 'Python', 'REST APIs'],
        },
        {
          name: 'תשתיות',
          items: ['Linux', 'Railway', 'Git/GitHub', 'Redis', 'Nginx', 'Docker'],
        },
        {
          name: 'כלים',
          items: ['VS Code', 'WordPress', 'Telegram Bots', 'Priority ERP', 'Excel מתקדם'],
        },
        {
          name: 'ניהול',
          items: ['ניהול צוותים', 'ניהול רכש B2B', 'הטמעת מערכות', 'Troubleshooting'],
        },
      ],
    },
    experience: {
      title: 'ניסיון מקצועי',
      subtitle: 'מסלול קריירה',
      items: [
        { year: '2025–הווה', role: 'תומך טכני ומוביל תהליכים', company: 'סלקום', desc: 'תמיכה טכנית מורכבת, פיתוח כלי עבודה פנימיים, אסקלציות הנדסיות' },
        { year: '2024–2025', role: 'אחראי תפעול קופות עצמאיות', company: 'יוחננוף', desc: 'אחריות טכנית ותפעולית על מתחם SCO, Troubleshooting חומרה ותוכנה' },
        { year: '2023–2024', role: 'מנהל משמרת ובקרה תפעולית', company: 'דלק מנטה', desc: 'ניהול משמרות עצמאי, בקרת מלאי ותזרים מזומנים' },
        { year: '2023–2024', role: 'ניהול פרויקטים דיגיטליים', company: 'עצמאי', desc: 'מיקור חוץ, בניית נכסים דיגיטליים, ניהול קהילות' },
        { year: '2019', role: 'מנהל קופות ומזכיר הנהלה', company: 'דוגל (לונא גל)', desc: 'הטמעת מערכת קופות חדשה, הדרכת צוותים, Back Office' },
      ],
    },
    contact: {
      title: 'בואו נדבר',
      subtitle: 'מחפשים שיתוף פעולה? צרו קשר',
      email: 'אימייל',
      phone: 'טלפון',
      location: 'מיקום',
      locationValue: 'חיפה והקריות',
    },
    footer: {
      built: 'נבנה עם',
      by: 'על ידי ליפז נוסן',
      rights: 'כל הזכויות שמורות',
    },
  },
  en: {
    nav: {
      home: 'Home',
      projects: 'Projects',
      team: 'Partners',
      skills: 'Skills',
      experience: 'Experience',
      contact: 'Contact',
    },
    hero: {
      greeting: "Hi, I'm",
      name: 'Lipaz Nussen',
      title: 'Operations, Technology & Management',
      subtitle: 'Building digital tools, managing systems, and driving tech processes',
      cta: 'View Projects',
      resume: 'Resume',
    },
    projects: {
      title: 'My Projects',
      subtitle: 'A selection of projects I built',
      viewCode: 'Source Code',
      viewLive: 'Live Demo',
      items: [
        {
          title: 'Volunteer Management System',
          description: 'Full-Stack system for managing volunteer branches — admin dashboard, user management, dynamic banner design per branch, Redis integration.',
          tags: ['Next.js', 'Redis', 'Railway', 'REST API'],
          color: '#3b82f6',
        },
        {
          title: 'Automated Telegram Bot',
          description: 'Advanced bot for auto-generating graphics — weekly reports, welcome cards, branch management, with admin interface and main system integration.',
          tags: ['Node.js', 'Telegram API', 'OG Images', 'Redis'],
          color: '#8b5cf6',
        },
        {
          title: 'Static Graphics Generator',
          description: 'Single-Page app for creating banners & weekly reports with PNG export, auto-save, dark mode, and template sharing.',
          tags: ['HTML', 'CSS', 'JavaScript', 'html2canvas'],
          color: '#10b981',
        },
        {
          title: 'Content Feed Manager',
          description: 'Next.js-based feed management system with cloud database, multi-source content management, smart embed integration, and admin panel — team project with 5 contributors.',
          tags: ['Next.js', 'SQL', 'Cloud DB', 'Team Project'],
          color: '#f59e0b',
          // link removed
        },
        {
          title: 'ContentPilot — Smart Content Tool',
          description: 'AI-powered content platform — article generator, trend scraper with scoring algorithm, keyword counter, and automated content suggestions powered by Gemini AI.',
          tags: ['Python', 'Flask', 'Gemini AI', 'Web Scraping'],
          color: '#ef4444',
        },
        {
          title: 'ResumeKit — Resume Generator',
          description: 'Tool for creating digital business cards & resumes — fill a form, download a ZIP with two styled HTML pages, GitHub avatar fetching, and print support.',
          tags: ['Next.js 15', 'React 19', 'Tailwind 4', 'JSZip'],
          color: '#06b6d4',
        },
        {
          title: 'AlertGen — Emergency Alert Generator',
          description: 'App for generating formatted emergency messages for volunteer organizations — event type selection, address, Waze link, and direct WhatsApp sharing.',
          tags: ['React 19', 'Material UI', 'GeoJSON', 'WhatsApp API'],
          color: '#22c55e',
        },
      ],
    },
    team: {
      title: 'Partners',
      subtitle: 'The people leading the way with me',
      members: [
        {
          name: 'Lipaz Nussen',
          role: 'Founder & Tech Lead',
          desc: 'Operations, development & project management',
          avatar: 'https://avatars.githubusercontent.com/u/18376581?v=4',
          isFuture: false,
        },
        {
          name: 'We\'re looking for you!',
          role: 'Sales & Customer Service',
          desc: 'Someone with business mindset, great people skills and drive — let\'s build together',
          avatar: null,
          isFuture: true,
        },
        {
          name: 'We\'re looking for you!',
          role: 'Secretary & Personal Assistant',
          desc: 'Someone with strong organizational skills, attention to detail and multitasking ability',
          avatar: null,
          isFuture: true,
        },
      ],
    },
    skills: {
      title: 'Skills',
      subtitle: 'Technologies and tools I work with',
      categories: [
        {
          name: 'Development',
          items: ['JavaScript', 'Node.js', 'Next.js', 'React', 'HTML/CSS', 'Python', 'REST APIs'],
        },
        {
          name: 'Infrastructure',
          items: ['Linux', 'Railway', 'Git/GitHub', 'Redis', 'Nginx', 'Docker'],
        },
        {
          name: 'Tools',
          items: ['VS Code', 'WordPress', 'Telegram Bots', 'Priority ERP', 'Advanced Excel'],
        },
        {
          name: 'Management',
          items: ['Team Leadership', 'B2B Procurement', 'System Integration', 'Troubleshooting'],
        },
      ],
    },
    experience: {
      title: 'Experience',
      subtitle: 'Career Path',
      items: [
        { year: '2025–Present', role: 'Technical Support & Process Lead', company: 'Cellcom', desc: 'Complex technical support, internal tool development, engineering escalations' },
        { year: '2024–2025', role: 'Self-Checkout Operations Manager', company: 'Yochananof', desc: 'Full technical & operational responsibility for SCO area, HW/SW troubleshooting' },
        { year: '2023–2024', role: 'Shift Manager & Operations Control', company: 'Delek Menta', desc: 'Independent shift management, inventory control and cash flow management' },
        { year: '2023–2024', role: 'Digital Project Manager', company: 'Freelance', desc: 'Outsourcing services, digital asset creation, community management' },
        { year: '2019', role: 'POS Manager & Executive Assistant', company: 'Dogal (Luna Gal)', desc: 'POS system implementation, team training, Back Office management' },
      ],
    },
    contact: {
      title: "Let's Talk",
      subtitle: 'Looking for collaboration? Get in touch',
      email: 'Email',
      phone: 'Phone',
      location: 'Location',
      locationValue: 'Haifa & Krayot, Israel',
    },
    footer: {
      built: 'Built with',
      by: 'by Lipaz Nussen',
      rights: 'All rights reserved',
    },
  },
};

export default translations;
