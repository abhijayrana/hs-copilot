"use client";
import { useState } from "react";
import { trpc } from "@/app/_trpc/client";

export default function AdminDashboard() {
  const [schoolName, setSchoolName] = useState("");
  const [schoolLocation, setSchoolLocation] = useState("");
  const [courseName, setCourseName] = useState("");
  const [courseDescription, setCourseDescription] = useState("");
  const [courseDepartment, setCourseDepartment] = useState("");
  const [sectionName, setSectionName] = useState("");
  const [teacherName, setTeacherName] = useState("");
  const [courseSchoolId, setCourseSchoolId] = useState("");
  const [sectionCourseId, setSectionCourseId] = useState("");
  const [sectionTeacherId, setSectionTeacherId] = useState("");

  const createSchool = trpc.school.createSchool.useMutation();
  const createCourse = trpc.school.createCourse.useMutation();
  const createSection = trpc.school.createSection.useMutation();
  const createTeacher = trpc.school.createTeacher.useMutation();

  const handleCreateSchool = () => {
    createSchool.mutate({ name: schoolName, location: schoolLocation });
    setSchoolName("");
    setSchoolLocation("");
  };

  const handleCreateCourse = () => {
    createCourse.mutate({
      name: courseName,
      description: courseDescription,
      department: courseDepartment,
      schoolId: courseSchoolId,
    });
    setCourseName("");
    setCourseDescription("");
    setCourseDepartment("");
    setCourseSchoolId("");
  };

  const handleCreateSection = () => {
    createSection.mutate({
      courseId: sectionCourseId,
      teacherId: sectionTeacherId,
    });
    setSectionName("");
    setSectionCourseId("");
    setSectionTeacherId("");
  };

  const handleCreateTeacher = () => {
    createTeacher.mutate({ name: teacherName });
    setTeacherName("");
  };

  return (
    <div>
      <h1>Admin Dashboard</h1>

      {/* Create School */}
      <section>
        <h2>Create School</h2>
        <input
          type="text"
          placeholder="School Name"
          value={schoolName}
          onChange={(e) => setSchoolName(e.target.value)}
        />
        <input
          type="text"
          placeholder="School Location"
          value={schoolLocation}
          onChange={(e) => setSchoolLocation(e.target.value)}
        />
        <button onClick={handleCreateSchool}>Create School</button>
      </section>

      {/* Create Course */}
      {/* Create Course */}
      <section>
        <h2>Create Course</h2>
        <input
          type="text"
          placeholder="Course Name"
          value={courseName}
          onChange={(e) => setCourseName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Course Description"
          value={courseDescription}
          onChange={(e) => setCourseDescription(e.target.value)}
        />
        <select
          value={courseDepartment}
          onChange={(e) => setCourseDepartment(e.target.value)}
        >
          <option value="">Select Department</option>
          <option value="Mathematics">Mathematics</option>
          <option value="Science">Science</option>
          <option value="English">English</option>
          <option value="History">History</option>
          <option value="Art">Art</option>
          {/* Add more department options as needed */}
        </select>
        <input
          type="text"
          placeholder="School ID"
          value={courseSchoolId}
          onChange={(e) => setCourseSchoolId(e.target.value)}
        />
        <button onClick={handleCreateCourse}>Create Course</button>
      </section>

      {/* Create Section */}
      <section>
        <h2>Create Section</h2>
        <input
          type="text"
          placeholder="Course ID"
          value={sectionCourseId}
          onChange={(e) => setSectionCourseId(e.target.value)}
        />
        <input
          type="text"
          placeholder="Teacher ID"
          value={sectionTeacherId}
          onChange={(e) => setSectionTeacherId(e.target.value)}
        />
        <button onClick={handleCreateSection}>Create Section</button>
      </section>

      {/* Create Teacher */}
      <section>
        <h2>Create Teacher</h2>
        <input
          type="text"
          placeholder="Teacher Name"
          value={teacherName}
          onChange={(e) => setTeacherName(e.target.value)}
        />
        <button onClick={handleCreateTeacher}>Create Teacher</button>
      </section>
    </div>
  );
}
