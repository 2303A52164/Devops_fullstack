const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// In-memory data store with initial sample data from assignment
let students = [
  {
    id: 1,
    name: "Rahul",
    rollNo: "CSE101",
    branch: "CSE",
    email: "rahul.cse101@college.edu",
    semester: "6th Semester",
    cgpa: "8.8"
  },
  {
    id: 2,
    name: "Priya",
    rollNo: "CSE102",
    branch: "CSE",
    email: "priya.cse102@college.edu",
    semester: "6th Semester",
    cgpa: "9.2"
  },
  {
    id: 3,
    name: "Amit Sharma",
    rollNo: "ECE201",
    branch: "ECE",
    email: "amit.ece201@college.edu",
    semester: "4th Semester",
    cgpa: "8.4"
  },
  {
    id: 4,
    name: "Sneha Reddy",
    rollNo: "MECH301",
    branch: "MECH",
    email: "sneha.mech301@college.edu",
    semester: "6th Semester",
    cgpa: "8.6"
  }
];

let nextId = 5;

// Root route
app.get('/', (req, res) => {
  res.send('College Student Management System Backend API is running.');
});

// GET /api/students - Retrieve all students
app.get('/api/students', (req, res) => {
  try {
    const { branch, search } = req.query;
    let results = [...students];

    if (branch && branch !== 'All') {
      results = results.filter(s => s.branch.toLowerCase() === branch.toLowerCase());
    }

    if (search) {
      const q = search.toLowerCase();
      results = results.filter(
        s => s.name.toLowerCase().includes(q) || s.rollNo.toLowerCase().includes(q)
      );
    }

    res.status(200).json(results);
  } catch (error) {
    res.status(500).json({ message: "Server error retrieving students", error: error.message });
  }
});

// GET /api/students/:id - Retrieve student by ID
app.get('/api/students/:id', (req, res) => {
  const studentId = parseInt(req.params.id, 10);
  const student = students.find(s => s.id === studentId);

  if (!student) {
    return res.status(404).json({ message: `Student with ID ${studentId} not found.` });
  }

  res.status(200).json(student);
});

// POST /api/students - Add a new student
app.post('/api/students', (req, res) => {
  const { name, rollNo, branch, email, semester, cgpa } = req.body;

  if (!name || !rollNo || !branch) {
    return res.status(400).json({ message: "Name, roll number, and branch are required fields." });
  }

  // Check for duplicate rollNo
  const existing = students.find(s => s.rollNo.toLowerCase() === rollNo.trim().toLowerCase());
  if (existing) {
    return res.status(409).json({ message: `Student with Roll Number '${rollNo}' already exists.` });
  }

  const newStudent = {
    id: nextId++,
    name: name.trim(),
    rollNo: rollNo.trim().toUpperCase(),
    branch: branch.trim().toUpperCase(),
    email: email ? email.trim() : `${rollNo.toLowerCase()}@college.edu`,
    semester: semester ? semester.trim() : "Current",
    cgpa: cgpa ? cgpa.toString().trim() : "N/A"
  };

  students.push(newStudent);
  res.status(201).json(newStudent);
});

// PUT /api/students/:id - Update an existing student
app.put('/api/students/:id', (req, res) => {
  const studentId = parseInt(req.params.id, 10);
  const studentIndex = students.findIndex(s => s.id === studentId);

  if (studentIndex === -1) {
    return res.status(404).json({ message: `Student with ID ${studentId} not found.` });
  }

  const { name, rollNo, branch, email, semester, cgpa } = req.body;

  if (rollNo) {
    const existing = students.find(
      s => s.id !== studentId && s.rollNo.toLowerCase() === rollNo.trim().toLowerCase()
    );
    if (existing) {
      return res.status(409).json({ message: `Roll Number '${rollNo}' is already taken by another student.` });
    }
  }

  const updatedStudent = {
    ...students[studentIndex],
    ...(name && { name: name.trim() }),
    ...(rollNo && { rollNo: rollNo.trim().toUpperCase() }),
    ...(branch && { branch: branch.trim().toUpperCase() }),
    ...(email !== undefined && { email: email.trim() }),
    ...(semester !== undefined && { semester: semester.trim() }),
    ...(cgpa !== undefined && { cgpa: cgpa.toString().trim() })
  };

  students[studentIndex] = updatedStudent;
  res.status(200).json(updatedStudent);
});

// DELETE /api/students/:id - Delete a student
app.delete('/api/students/:id', (req, res) => {
  const studentId = parseInt(req.params.id, 10);
  const studentIndex = students.findIndex(s => s.id === studentId);

  if (studentIndex === -1) {
    return res.status(404).json({ message: `Student with ID ${studentId} not found.` });
  }

  const deletedStudent = students.splice(studentIndex, 1)[0];
  res.status(200).json({
    message: `Student '${deletedStudent.name}' deleted successfully.`,
    student: deletedStudent
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`Backend server is running on port ${PORT}`);
});
