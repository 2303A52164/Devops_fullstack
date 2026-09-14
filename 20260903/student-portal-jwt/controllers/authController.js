const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// In-memory data store for users/students
const users = [];

// POST /register
const register = async (req, res) => {
  try {
    const { id, name, email, password, role, department } = req.body;

    if (!id || !name || !email || !password || !role || !department) {
      return res.status(400).json({ message: 'All fields are required.' });
    }

    // Check if email already exists
    const existingUser = users.find((u) => u.email === email);
    if (existingUser) {
      return res.status(400).json({ message: 'Email already registered.' });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = {
      id,
      name,
      email,
      password: hashedPassword,
      role, // 'Student', 'Faculty', or 'Admin'
      department
    };

    users.push(newUser);
    res.status(201).json({ message: 'User registered successfully.', userId: id });
  } catch (error) {
    res.status(500).json({ message: 'Server error during registration.' });
  }
};

// POST /login
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Verify user credentials
    const user = users.find((u) => u.email === email);
    if (!user) {
      return res.status(400).json({ message: 'Invalid email or password.' });
    }

    // Compare password with hashed password
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(400).json({ message: 'Invalid email or password.' });
    }

    // Generate JWT
    const payload = {
      id: user.id,
      email: user.email,
      role: user.role
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN
    });

    res.status(200).json({ message: 'Login successful', token });
  } catch (error) {
    res.status(500).json({ message: 'Server error during login.' });
  }
};

// GET /profile (Student, Faculty, Admin can view their own profile)
const getProfile = (req, res) => {
  const user = users.find((u) => u.id === req.user.id);
  if (!user) {
    return res.status(404).json({ message: 'User not found.' });
  }

  const { password, ...userProfile } = user;
  res.status(200).json({ profile: userProfile });
};

// GET /students (Faculty and Admin view all student records)
const getStudents = (req, res) => {
  const studentRecords = users
    .filter((u) => u.role === 'Student')
    .map(({ password, ...student }) => student);

  res.status(200).json({ students: studentRecords });
};

// PUT /students/:id (Faculty and Admin can update student records)
const updateStudent = (req, res) => {
  const { id } = req.params;
  const { name, department } = req.body;

  const student = users.find((u) => u.id === id && u.role === 'Student');

  if (!student) {
    return res.status(404).json({ message: 'Student not found.' });
  }

  if (name) student.name = name;
  if (department) student.department = department;

  const { password, ...updatedStudent } = student;
  res.status(200).json({ message: 'Student updated successfully.', student: updatedStudent });
};

module.exports = { register, login, getProfile, getStudents, updateStudent };