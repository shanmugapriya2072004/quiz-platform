// ======================================================
// QUIZ PLATFORM - DATABASE SEED
// Run: node seed.js
// ======================================================

require("dotenv").config();

const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const connectDB = require("./config/db");

const User = require("./models/User");
const Category = require("./models/Category");
const Question = require("./models/Question");

// ======================================================
// ADMIN DETAILS
// ======================================================

const ADMIN_EMAIL = "admin@quizplatform.com";
const ADMIN_PASSWORD = "Admin@123";

// ======================================================
// QUIZ QUESTIONS
// ======================================================

const questionData = [

  // ====================================================
  // JAVASCRIPT - 10 QUESTIONS
  // ====================================================

  {
    category: "JavaScript",
    question: "Which keyword declares a block-scoped variable?",
    options: ["var", "let", "define", "constant"],
    correctAnswer: "let",
    difficulty: "easy",
  },

  {
    category: "JavaScript",
    question: "Which method converts a JSON string into a JavaScript object?",
    options: [
      "JSON.stringify()",
      "JSON.parse()",
      "JSON.convert()",
      "JSON.object()",
    ],
    correctAnswer: "JSON.parse()",
    difficulty: "easy",
  },

  {
    category: "JavaScript",
    question: "Which method adds an element to the end of an array?",
    options: ["push()", "pop()", "shift()", "unshift()"],
    correctAnswer: "push()",
    difficulty: "easy",
  },

  {
    category: "JavaScript",
    question: "What does === check?",
    options: [
      "Only value",
      "Only type",
      "Value and type",
      "Reference only",
    ],
    correctAnswer: "Value and type",
    difficulty: "easy",
  },

  {
    category: "JavaScript",
    question: "Which function executes code after a specified delay?",
    options: ["setTimeout()", "setDelay()", "delay()", "wait()"],
    correctAnswer: "setTimeout()",
    difficulty: "easy",
  },

  {
    category: "JavaScript",
    question: "What is a closure?",
    options: [
      "A loop",
      "A function with access to its outer scope",
      "An object",
      "A class",
    ],
    correctAnswer: "A function with access to its outer scope",
    difficulty: "medium",
  },

  {
    category: "JavaScript",
    question: "Which keyword creates a constant?",
    options: ["var", "let", "const", "static"],
    correctAnswer: "const",
    difficulty: "easy",
  },

  {
    category: "JavaScript",
    question: "Which method creates a new array by transforming elements?",
    options: ["filter()", "map()", "reduce()", "find()"],
    correctAnswer: "map()",
    difficulty: "medium",
  },

  {
    category: "JavaScript",
    question: "What is the result of typeof null?",
    options: ["null", "undefined", "object", "number"],
    correctAnswer: "object",
    difficulty: "hard",
  },

  {
    category: "JavaScript",
    question: "Which operator represents logical AND?",
    options: ["||", "&&", "!", "??"],
    correctAnswer: "&&",
    difficulty: "easy",
  },


  // ====================================================
  // REACT.JS - 10 QUESTIONS
  // ====================================================

  {
    category: "React.js",
    question: "What is React?",
    options: [
      "Database",
      "JavaScript library",
      "Operating system",
      "Programming language",
    ],
    correctAnswer: "JavaScript library",
    difficulty: "easy",
  },

  {
    category: "React.js",
    question: "Which hook is used to manage state?",
    options: ["useState", "useRoute", "usePage", "useData"],
    correctAnswer: "useState",
    difficulty: "easy",
  },

  {
    category: "React.js",
    question: "Which hook is used for side effects?",
    options: ["useState", "useEffect", "useMemo", "useRef"],
    correctAnswer: "useEffect",
    difficulty: "easy",
  },

  {
    category: "React.js",
    question: "What is JSX?",
    options: [
      "JavaScript XML",
      "Java Syntax XML",
      "JSON XML",
      "Java Extended Syntax",
    ],
    correctAnswer: "JavaScript XML",
    difficulty: "easy",
  },

  {
    category: "React.js",
    question: "What is used to uniquely identify list elements?",
    options: ["id", "key", "indexOnly", "ref"],
    correctAnswer: "key",
    difficulty: "easy",
  },

  {
    category: "React.js",
    question: "Which hook is used to access a DOM element?",
    options: ["useRef", "useDOM", "useElement", "useNode"],
    correctAnswer: "useRef",
    difficulty: "medium",
  },

  {
    category: "React.js",
    question: "Which hook memoizes a calculated value?",
    options: ["useMemo", "useValue", "useCache", "useStore"],
    correctAnswer: "useMemo",
    difficulty: "medium",
  },

  {
    category: "React.js",
    question: "Which hook memoizes a function?",
    options: ["useMemo", "useCallback", "useFunction", "useEvent"],
    correctAnswer: "useCallback",
    difficulty: "medium",
  },

  {
    category: "React.js",
    question: "What is Virtual DOM?",
    options: [
      "Real browser DOM",
      "Lightweight representation of DOM",
      "Database",
      "CSS file",
    ],
    correctAnswer: "Lightweight representation of DOM",
    difficulty: "medium",
  },

  {
    category: "React.js",
    question: "Which package is commonly used for React routing?",
    options: ["React Router", "Express", "Mongoose", "Axios"],
    correctAnswer: "React Router",
    difficulty: "easy",
  },


  // ====================================================
  // NODE.JS - 10 QUESTIONS
  // ====================================================

  {
    category: "Node.js",
    question: "What is Node.js?",
    options: [
      "Browser",
      "JavaScript runtime",
      "Database",
      "CSS framework",
    ],
    correctAnswer: "JavaScript runtime",
    difficulty: "easy",
  },

  {
    category: "Node.js",
    question: "Which JavaScript engine does Node.js use?",
    options: ["V8", "SpiderMonkey", "Java", "WebKit"],
    correctAnswer: "V8",
    difficulty: "easy",
  },

  {
    category: "Node.js",
    question: "Which command initializes a Node project?",
    options: ["npm init", "node start", "npm create-node", "node init"],
    correctAnswer: "npm init",
    difficulty: "easy",
  },

  {
    category: "Node.js",
    question: "Which object is used to access environment variables?",
    options: ["process.env", "node.env", "env.process", "global.env"],
    correctAnswer: "process.env",
    difficulty: "easy",
  },

  {
    category: "Node.js",
    question: "Which module provides file system operations?",
    options: ["http", "fs", "pathway", "file"],
    correctAnswer: "fs",
    difficulty: "easy",
  },

  {
    category: "Node.js",
    question: "Which package manager is commonly used with Node.js?",
    options: ["npm", "pip", "composer", "gem"],
    correctAnswer: "npm",
    difficulty: "easy",
  },

  {
    category: "Node.js",
    question: "What does npm stand for?",
    options: [
      "Node Package Manager",
      "Node Program Module",
      "New Package Manager",
      "Node Project Manager",
    ],
    correctAnswer: "Node Package Manager",
    difficulty: "easy",
  },

  {
    category: "Node.js",
    question: "Which module can be used to create an HTTP server?",
    options: ["http", "server", "request", "web"],
    correctAnswer: "http",
    difficulty: "medium",
  },

  {
    category: "Node.js",
    question: "Node.js is primarily:",
    options: [
      "Single-threaded",
      "Multi-threaded only",
      "Database",
      "Frontend framework",
    ],
    correctAnswer: "Single-threaded",
    difficulty: "medium",
  },

  {
    category: "Node.js",
    question: "Which file normally contains Node project dependencies?",
    options: ["package.json", "node.json", "server.json", "config.json"],
    correctAnswer: "package.json",
    difficulty: "easy",
  },


  // ====================================================
  // EXPRESS.JS - 10 QUESTIONS
  // ====================================================

  {
    category: "Express.js",
    question: "What is Express.js?",
    options: [
      "Database",
      "Node.js web framework",
      "Frontend library",
      "CSS framework",
    ],
    correctAnswer: "Node.js web framework",
    difficulty: "easy",
  },

  {
    category: "Express.js",
    question: "Which method creates an Express application?",
    options: ["express()", "app.create()", "createExpress()", "ExpressApp()"],
    correctAnswer: "express()",
    difficulty: "easy",
  },

  {
    category: "Express.js",
    question: "Which method handles GET requests?",
    options: ["app.get()", "app.fetch()", "app.read()", "app.request()"],
    correctAnswer: "app.get()",
    difficulty: "easy",
  },

  {
    category: "Express.js",
    question: "Which method handles POST requests?",
    options: ["app.send()", "app.post()", "app.create()", "app.add()"],
    correctAnswer: "app.post()",
    difficulty: "easy",
  },

  {
    category: "Express.js",
    question: "What is middleware?",
    options: [
      "Database",
      "Function executed during request-response cycle",
      "HTML tag",
      "React component",
    ],
    correctAnswer: "Function executed during request-response cycle",
    difficulty: "medium",
  },

  {
    category: "Express.js",
    question: "Which middleware parses JSON request bodies?",
    options: [
      "express.json()",
      "express.body()",
      "express.parse()",
      "express.data()",
    ],
    correctAnswer: "express.json()",
    difficulty: "easy",
  },

  {
    category: "Express.js",
    question: "Which object contains route parameters?",
    options: ["req.params", "req.route", "req.values", "req.data"],
    correctAnswer: "req.params",
    difficulty: "medium",
  },

  {
    category: "Express.js",
    question: "Which object contains query string values?",
    options: ["req.query", "req.search", "req.urlParams", "req.filter"],
    correctAnswer: "req.query",
    difficulty: "medium",
  },

  {
    category: "Express.js",
    question: "Which function sends a JSON response?",
    options: ["res.json()", "res.sendJSON()", "res.data()", "res.object()"],
    correctAnswer: "res.json()",
    difficulty: "easy",
  },

  {
    category: "Express.js",
    question: "Which HTTP status code means Not Found?",
    options: ["200", "201", "404", "500"],
    correctAnswer: "404",
    difficulty: "easy",
  },


  // ====================================================
  // MONGODB - 10 QUESTIONS
  // ====================================================

  {
    category: "MongoDB",
    question: "What type of database is MongoDB?",
    options: ["SQL", "NoSQL", "Graph", "Relational"],
    correctAnswer: "NoSQL",
    difficulty: "easy",
  },

  {
    category: "MongoDB",
    question: "MongoDB stores data in:",
    options: ["Tables", "Documents", "Rows", "Sheets"],
    correctAnswer: "Documents",
    difficulty: "easy",
  },

  {
    category: "MongoDB",
    question: "MongoDB documents are stored in which format?",
    options: ["BSON", "HTML", "CSV", "XML"],
    correctAnswer: "BSON",
    difficulty: "easy",
  },

  {
    category: "MongoDB",
    question: "What is a collection?",
    options: [
      "Group of documents",
      "Single field",
      "Database server",
      "Query",
    ],
    correctAnswer: "Group of documents",
    difficulty: "easy",
  },

  {
    category: "MongoDB",
    question: "Which method finds documents?",
    options: ["find()", "select()", "search()", "getAll()"],
    correctAnswer: "find()",
    difficulty: "easy",
  },

  {
    category: "MongoDB",
    question: "Which method inserts one document?",
    options: ["insertOne()", "addOne()", "createOne()", "pushOne()"],
    correctAnswer: "insertOne()",
    difficulty: "easy",
  },

  {
    category: "MongoDB",
    question: "Which field is commonly used as MongoDB document identifier?",
    options: ["_id", "id", "key", "docId"],
    correctAnswer: "_id",
    difficulty: "easy",
  },

  {
    category: "MongoDB",
    question: "Which method updates one document?",
    options: ["updateOne()", "changeOne()", "editOne()", "modifyOne()"],
    correctAnswer: "updateOne()",
    difficulty: "medium",
  },

  {
    category: "MongoDB",
    question: "Which method deletes one document?",
    options: ["deleteOne()", "removeOne()", "dropOne()", "eraseOne()"],
    correctAnswer: "deleteOne()",
    difficulty: "easy",
  },

  {
    category: "MongoDB",
    question: "Which library is commonly used with MongoDB in Node.js?",
    options: ["Mongoose", "Sequelize", "Redux", "Axios"],
    correctAnswer: "Mongoose",
    difficulty: "easy",
  },


  // ====================================================
  // HTML - 10 QUESTIONS
  // ====================================================

  {
    category: "HTML",
    question: "What does HTML stand for?",
    options: [
      "HyperText Markup Language",
      "HighText Machine Language",
      "Hyperlink Text Management Language",
      "Home Tool Markup Language",
    ],
    correctAnswer: "HyperText Markup Language",
    difficulty: "easy",
  },

  {
    category: "HTML",
    question: "Which tag creates a hyperlink?",
    options: ["<a>", "<link>", "<href>", "<url>"],
    correctAnswer: "<a>",
    difficulty: "easy",
  },

  {
    category: "HTML",
    question: "Which tag creates an image?",
    options: ["<image>", "<img>", "<picture>", "<src>"],
    correctAnswer: "<img>",
    difficulty: "easy",
  },

  {
    category: "HTML",
    question: "Which tag creates a paragraph?",
    options: ["<p>", "<para>", "<text>", "<paragraph>"],
    correctAnswer: "<p>",
    difficulty: "easy",
  },

  {
    category: "HTML",
    question: "Which tag is used for the largest heading?",
    options: ["<h1>", "<h6>", "<head>", "<heading>"],
    correctAnswer: "<h1>",
    difficulty: "easy",
  },

  {
    category: "HTML",
    question: "Which attribute provides alternative text for an image?",
    options: ["alt", "src", "title", "text"],
    correctAnswer: "alt",
    difficulty: "easy",
  },

  {
    category: "HTML",
    question: "Which tag creates an unordered list?",
    options: ["<ul>", "<ol>", "<list>", "<li>"],
    correctAnswer: "<ul>",
    difficulty: "easy",
  },

  {
    category: "HTML",
    question: "Which tag creates a form?",
    options: ["<form>", "<input>", "<field>", "<submit>"],
    correctAnswer: "<form>",
    difficulty: "easy",
  },

  {
    category: "HTML",
    question: "Which HTML element is semantic?",
    options: ["<div>", "<span>", "<header>", "<b>"],
    correctAnswer: "<header>",
    difficulty: "medium",
  },

  {
    category: "HTML",
    question: "Which tag is used for a table row?",
    options: ["<tr>", "<td>", "<th>", "<row>"],
    correctAnswer: "<tr>",
    difficulty: "easy",
  },


  // ====================================================
  // CSS - 10 QUESTIONS
  // ====================================================

  {
    category: "CSS",
    question: "What does CSS stand for?",
    options: [
      "Cascading Style Sheets",
      "Computer Style System",
      "Creative Style Syntax",
      "Colorful Style Sheets",
    ],
    correctAnswer: "Cascading Style Sheets",
    difficulty: "easy",
  },

  {
    category: "CSS",
    question: "Which property changes text color?",
    options: ["color", "font-color", "text-color", "foreground"],
    correctAnswer: "color",
    difficulty: "easy",
  },

  {
    category: "CSS",
    question: "Which property changes background color?",
    options: [
      "background-color",
      "bg-color",
      "color-background",
      "background",
    ],
    correctAnswer: "background-color",
    difficulty: "easy",
  },

  {
    category: "CSS",
    question: "Which property makes text bold?",
    options: ["font-weight", "text-bold", "font-style", "bold"],
    correctAnswer: "font-weight",
    difficulty: "easy",
  },

  {
    category: "CSS",
    question: "Which layout system uses rows and columns?",
    options: ["Grid", "Float", "Inline", "Position"],
    correctAnswer: "Grid",
    difficulty: "easy",
  },

  {
    category: "CSS",
    question: "Which property enables Flexbox?",
    options: [
      "display: flex",
      "flex: display",
      "position: flex",
      "layout: flex",
    ],
    correctAnswer: "display: flex",
    difficulty: "easy",
  },

  {
    category: "CSS",
    question: "Which unit is relative to the root font size?",
    options: ["rem", "px", "cm", "pt"],
    correctAnswer: "rem",
    difficulty: "medium",
  },

  {
    category: "CSS",
    question: "Which property controls space inside an element?",
    options: ["padding", "margin", "spacing", "inside"],
    correctAnswer: "padding",
    difficulty: "easy",
  },

  {
    category: "CSS",
    question: "Which property controls space outside an element?",
    options: ["margin", "padding", "outside", "gap"],
    correctAnswer: "margin",
    difficulty: "easy",
  },

  {
    category: "CSS",
    question: "Which CSS feature is used for responsive design?",
    options: ["@media", "@responsive", "@screen", "@device"],
    correctAnswer: "@media",
    difficulty: "medium",
  },


  // ====================================================
  // JQUERY - 10 QUESTIONS
  // ====================================================

  {
    category: "jQuery",
    question: "What is jQuery?",
    options: [
      "JavaScript library",
      "Database",
      "CSS language",
      "Server",
    ],
    correctAnswer: "JavaScript library",
    difficulty: "easy",
  },

  {
    category: "jQuery",
    question: "Which symbol is commonly used with jQuery?",
    options: ["$", "#", "@", "&"],
    correctAnswer: "$",
    difficulty: "easy",
  },

  {
    category: "jQuery",
    question: "Which method hides an element?",
    options: [".hide()", ".remove()", ".hidden()", ".display()"],
    correctAnswer: ".hide()",
    difficulty: "easy",
  },

  {
    category: "jQuery",
    question: "Which method shows a hidden element?",
    options: [".show()", ".display()", ".visible()", ".open()"],
    correctAnswer: ".show()",
    difficulty: "easy",
  },

  {
    category: "jQuery",
    question: "Which method adds a click event?",
    options: [".click()", ".onClick()", ".press()", ".event()"],
    correctAnswer: ".click()",
    difficulty: "easy",
  },

  {
    category: "jQuery",
    question: "Which method gets or sets HTML content?",
    options: [".html()", ".text()", ".value()", ".content()"],
    correctAnswer: ".html()",
    difficulty: "easy",
  },

  {
    category: "jQuery",
    question: "Which method gets or sets text?",
    options: [".text()", ".html()", ".value()", ".string()"],
    correctAnswer: ".text()",
    difficulty: "easy",
  },

  {
    category: "jQuery",
    question: "Which method performs an AJAX request?",
    options: ["$.ajax()", "$.request()", "$.fetch()", "$.http()"],
    correctAnswer: "$.ajax()",
    difficulty: "medium",
  },

  {
    category: "jQuery",
    question: "Which method removes an element from DOM?",
    options: [".remove()", ".delete()", ".destroy()", ".clear()"],
    correctAnswer: ".remove()",
    difficulty: "easy",
  },

  {
    category: "jQuery",
    question: "Which method adds a class?",
    options: [
      ".addClass()",
      ".classAdd()",
      ".setClass()",
      ".appendClass()",
    ],
    correctAnswer: ".addClass()",
    difficulty: "easy",
  },

];


// ======================================================
// SEED FUNCTION
// ======================================================

const run = async () => {

  try {

    console.log("\n======================================");
    console.log("       QUIZ PLATFORM SEED START");
    console.log("======================================\n");


    // --------------------------------------------------
    // CONNECT DATABASE
    // --------------------------------------------------

    await connectDB();

    console.log("MongoDB connection successful.\n");


    // --------------------------------------------------
    // ADMIN USER
    // --------------------------------------------------

    let admin = await User.findOne({
      email: ADMIN_EMAIL,
    });

    const hashedPassword = await bcrypt.hash(
      ADMIN_PASSWORD,
      10
    );

    if (!admin) {

      admin = await User.create({
        name: "Admin",
        email: ADMIN_EMAIL,
        password: hashedPassword,
        role: "admin",
        status: "active",
      });

      console.log("Admin created successfully.");

    } else {

      admin.name = "Admin";
      admin.password = hashedPassword;
      admin.role = "admin";
      admin.status = "active";

      await admin.save();

      console.log("Admin updated successfully.");

    }

    console.log("--------------------------------------");
    console.log(`Admin Email    : ${ADMIN_EMAIL}`);
    console.log(`Admin Password : ${ADMIN_PASSWORD}`);
    console.log("--------------------------------------\n");


    // --------------------------------------------------
    // CREATE CATEGORIES
    // --------------------------------------------------

    const categoryNames = [
      "JavaScript",
      "React.js",
      "Node.js",
      "Express.js",
      "MongoDB",
      "HTML",
      "CSS",
      "jQuery",
    ];

    const categoryMap = {};


    for (const categoryName of categoryNames) {

      let category = await Category.findOne({
        name: categoryName,
      });

      if (!category) {

        category = await Category.create({
          name: categoryName,
          description: `${categoryName} quiz questions`,
        });

        console.log(`Category created: ${categoryName}`);

      } else {

        console.log(`Category exists: ${categoryName}`);

      }

      categoryMap[categoryName] = category._id;
    }


    console.log("\nCategories ready.\n");


    // --------------------------------------------------
    // INSERT QUESTIONS
    // --------------------------------------------------

    let inserted = 0;
    let skipped = 0;


    for (const item of questionData) {

      const categoryId = categoryMap[item.category];

      if (!categoryId) {

        console.log(
          `Category not found: ${item.category}`
        );

        continue;
      }


      // Check duplicate question

      const existingQuestion = await Question.findOne({
        categoryId: categoryId,
        question: item.question,
      });


      if (existingQuestion) {

        skipped++;

        continue;
      }


      await Question.create({
        categoryId: categoryId,
        question: item.question,
        options: item.options,
        correctAnswer: item.correctAnswer,
        difficulty: item.difficulty,
      });


      inserted++;
    }


    // --------------------------------------------------
    // FINAL COUNTS
    // --------------------------------------------------

    const totalCategories = await Category.countDocuments();

    const totalQuestions = await Question.countDocuments();

    const totalUsers = await User.countDocuments();


    console.log("\n======================================");
    console.log("          SEED COMPLETED");
    console.log("======================================");

    console.log(`Categories : ${totalCategories}`);
    console.log(`Questions  : ${totalQuestions}`);
    console.log(`Inserted   : ${inserted}`);
    console.log(`Skipped    : ${skipped}`);
    console.log(`Users      : ${totalUsers}`);

    console.log("\n======================================");
    console.log("             ADMIN LOGIN");
    console.log("======================================");

    console.log(`Email    : ${ADMIN_EMAIL}`);
    console.log(`Password : ${ADMIN_PASSWORD}`);

    console.log("======================================\n");


    // --------------------------------------------------
    // CLOSE DATABASE
    // --------------------------------------------------

    await mongoose.connection.close();

    console.log("MongoDB connection closed.");

    process.exit(0);

  } catch (error) {

    console.error("\n======================================");
    console.error("             SEED ERROR");
    console.error("======================================");

    console.error(error);

    await mongoose.connection.close();

    process.exit(1);
  }
};


// ======================================================
// RUN
// ======================================================

run();