import { publicProcedure as procedure, router } from "../trpc";
import { TRPCError } from "@trpc/server";
import { z } from "zod";
import prisma from "@database/prisma";
import { Prisma } from "@prisma/client";

export const schoolRouter = router({
  getSchools: procedure.query(async () => {
    const schools = await prisma.hSSchool.findMany();
    return schools;
  }),
  createSchool: procedure
    .input(
      z.object({
        name: z.string(),
        location: z.string(),
      })
    )
    .mutation(async ({ input }) => {
      const { name, location } = input;
      const school = await prisma.hSSchool.create({
        data: {
          name,
          location,
        },
      });
      return school;
    }),

  createCourse: procedure
    .input(
      z.object({
        name: z.string(),
        description: z.string(),
        department: z.string(),
        schoolId: z.string(), // Add schoolId to the input
      })
    )
    .mutation(async ({ input }) => {
      const { name, description, department, schoolId } = input;
      const course = await prisma.hSCourse.create({
        data: {
          name,
          description,
          department,
          school: {
            connect: { id: schoolId }, // Connect the course to the school using schoolId
          },
        },
      });
      return course;
    }),

  createSection: procedure
    .input(
      z.object({
        courseId: z.string(), // Add courseId to the input
        teacherId: z.string(), // Add teacherId to the input
      })
    )
    .mutation(async ({ input }) => {
      const { courseId, teacherId } = input;
      const section = await prisma.hSSection.create({
        data: {
          course: {
            connect: { id: courseId }, // Connect the section to the course using courseId
          },
          teacher: {
            connect: { id: teacherId }, // Connect the section to the teacher using teacherId
          },
        },
      });
      return section;
    }),

  createTeacher: procedure
    .input(
      z.object({
        name: z.string(),
      })
    )
    .mutation(async ({ input }) => {
      const { name } = input;
      const teacher = await prisma.hSTeacher.create({
        data: {
          name,
        },
      });
      return teacher;
    }),

    getCourses: procedure
    .input(
        z.object({
            schoolId: z.string(),
        })
        )
    .query(async ({ input }) => {
        const { schoolId } = input;
        const courses = await prisma.hSCourse.findMany({
            where: {
                schoolId,
            },
        });
        return courses;
    }
    ),
});
