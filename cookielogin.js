const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const { DateTime } = require("luxon");
const app = express();
const port = process.env.PORT || 2410;
app.use(cors());
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Credentials", "true"); 
  next();
});
app.use(express.json());
app.use(cookieParser());
app.use((req, res, next) => {
  const trackerData = req.cookies.tracker || [];
  console.log("cookies=",req.cookies.tracker)
  trackerData.push({
    name: req.cookies.name ? req.cookies.name : "Guest",
    empCode: req.cookies.empCode ? req.cookies.empCode : "Guest",
    url: req.originalUrl,
    date: DateTime.now().toFormat("yyyy-MM-dd HH:mm:ss"),
  });

  res.cookie("tracker", trackerData, {httpOnly:false, sameSite: 'none', secure: true });
  next();
});

const employees = [
  {
    empCode: 1451,
    name: "Jack",
    department: "Finance",
    designation: "Manager",
    salary: 52500,
    gender: "Male",
  },
  {
    empCode: 1029,
    name: "Steve",
    department: "Technology",
    designation: "Manager",
    salary: 71000,
    gender: "Male",
  },
  {
    empCode: 1891,
    name: "Anna",
    department: "HR",
    designation: "Manager",
    salary: 55100,
    gender: "Female",
  },
  {
    empCode: 1322,
    name: "Kathy",
    department: "Operations",
    designation: "Manager",
    salary: 49200,
    gender: "Female",
  },
  {
    empCode: 1367,
    name: "Bob",
    department: "Marketing",
    designation: "Manager",
    salary: 39000,
    gender: "Male",
  },
  {
    empCode: 1561,
    name: "George",
    department: "Finance",
    designation: "Trainee",
    salary: 22500,
    gender: "Male",
  },
  {
    empCode: 1777,
    name: "Harry",
    department: "Technology",
    designation: "Trainee",
    salary: 31000,
    gender: "Male",
  },
  {
    empCode: 1606,
    name: "Julia",
    department: "HR",
    designation: "Manager",
    Trainee: 25100,
    gender: "Female",
  },
  {
    empCode: 1509,
    name: "Kristina",
    department: "Operations",
    designation: "Trainee",
    salary: 19200,
    gender: "Female",
  },
  {
    empCode: 1533,
    name: "William",
    department: "Marketing",
    designation: "Trainee",
    salary: 16200,
    gender: "Male",
  },
  {
    empCode: 1161,
    name: "Stephen",
    department: "Finance",
    designation: "VP",
    salary: 82500,
    gender: "Male",
  },
  {
    empCode: 1377,
    name: "Winston",
    department: "Technology",
    designation: "VP",
    salary: 91000,
    gender: "Male",
  },
  {
    empCode: 1206,
    name: "Victoria",
    department: "HR",
    designation: "Manager",
    VP: 65100,
    gender: "Female",
  },
  {
    empCode: 1809,
    name: "Pamela",
    department: "Operations",
    designation: "VP",
    salary: 78600,
    gender: "Female",
  },
  {
    empCode: 1033,
    name: "Tim",
    department: "Marketing",
    designation: "VP",
    salary: 66800,
    gender: "Male",
  },
  {
    empCode: 1787,
    name: "Peter",
    department: "Technology",
    designation: "Manager",
    salary: 47400,
    gender: "Male",
  },
  {
    empCode: 1276,
    name: "Barbara",
    department: "Technology",
    designation: "Trainee",
    salary: 21800,
    gender: "Female",
  },
  {
    empCode: 1859,
    name: "Donna",
    department: "Operations",
    designation: "Trainee",
    salary: 21900,
    gender: "Female",
  },
  {
    empCode: 1874,
    name: "Igor",
    department: "Operations",
    designation: "Manager",
    salary: 48300,
    gender: "Male",
  },
];

const checkLoggedIn = (req, res, next) => {
  if (req.cookies.empCode) {
    next();
  } else {
    res.status(401).json({ error: "Unauthorized" });
  }
};
app.get("/",function(req,res){
  res.send("Server running fine")
})


app.post("/login", function (req, res) {
  let { empCode, name } = req.body;
  const user = employees.find(
    (employee) => employee.empCode === Number(empCode) && employee.name === name
  );
  if (user) {
    res.cookie("empCode", empCode);
    res.cookie("name",name);
    res.json({ message: "Login successful" });
  } else {
    res.status(401).json({ error: "Login failed" });
  }
});

app.get("/logout", (req, res) => {
  res.clearCookie("empCode");

  res.json({ message: "Logged out successfully" });
});

app.get("/myDetails", checkLoggedIn, (req, res) => {
  const empCode = req.cookies.empCode;
  console.log(empCode);
  const user = employees.find(
    (employee) => employee.empCode === Number(empCode)
  );
  res.json(user);
});

app.get("/company", (req, res) => {
  res.send("Welcome to the Employee Portal of XYZ Company.");
});
app.get("/myJuniors", checkLoggedIn, (req, res) => {
  const empCode = req.cookies.empCode;
  const user = employees.find(
    (employee) => employee.empCode === Number(empCode)
  );
  console.log(user.designation);
  switch (user.designation) {
    case "VP":
      res.json(
        employees.filter(
          (emp) => emp.designation === "VP" || emp.designation === "Manager"
        )
      );
      break;
    case "Manager":
      let filteredarray = employees.filter(
        (emp) => emp.designation === "Trainee"
      );

      res.json(filteredarray);

      break;
    default:
      res.json({});
  }
});

app.get("/tracker", (req, res) => {
  const trackerData = req.cookies.tracker || [];
  res.send(trackerData);
});

app.get("/loginm", (req, res) => {
  const user = {
    name: req.cookies.name,
    empCode: req.cookies.empCode,
  };
  res.send(user);
  console.log(user);
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
