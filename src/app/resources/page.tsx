"use client"
import React from 'react';
import { trpc } from '@/app/_trpc/client';
import { useUser } from '@clerk/nextjs';
import Link from 'next/link';

interface Department {
  name: string;
  courses: HSCourse[];
}

interface HSCourse {
  id: string;
  name: string;
  description: string;
  department: string;
}

const Courses: React.FC = () => {
  const { user, isLoaded } = useUser();


//@ts-expect-error
  const { data: hsUser, isLoading: isUserLoading } = trpc.user.getUser.useQuery({clerkAuthId: user?.id}, {
    enabled: !!user,
  });
//@ts-expect-error
  const { data: courses, isLoading: isCoursesLoading } = trpc.school.getCourses.useQuery({schoolId: hsUser?.schoolId},
    {
      enabled: !!hsUser,
    }
  );

  if (!isLoaded) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return <div>User not found. Login instead <Link href={"/login"}>here</Link></div>;
  }

  if (isUserLoading || isCoursesLoading) {
    return <div>Loading...</div>;
  }

  if(hsUser?.schoolId === undefined){
    return <div>School not found.</div>;
  }




  if (!hsUser) {
    return <div>User not found.</div>;
  }

  if (!courses) {
    return <div>No courses found.</div>;
  }

  const departments: Department[] = [];

  courses.forEach((course:any) => {
    const existingDepartment = departments.find((dept) => dept.name === course.department);

    if (existingDepartment) {
      existingDepartment.courses.push(course);
    } else {
      departments.push({
        name: course.department,
        courses: [course],
      });
    }
  });

  return (
    <div>
      <h1>Welcome, {hsUser.username}!</h1>
      {departments.map((department) => (
        <div key={department.name} className="department-card">
          <h2>{department.name}</h2>
          <ul>
            {department.courses.map((course) => (
              <li key={course.id}>{course.name}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default Courses;