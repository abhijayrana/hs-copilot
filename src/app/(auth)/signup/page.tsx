"use client";
import { useState } from "react";
import { useSignUp } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { trpc } from "@/app/_trpc/client";

export default function SignUpForm() {
  const { isLoaded, signUp } = useSignUp();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const { data: schools, isLoading: isSchoolsLoading } =
    trpc.school.getSchools.useQuery();
  const [selectedSchoolId, setSelectedSchoolId] = useState("");

  const { data, isLoading, isError, error } = trpc.user.trpcTester.useQuery();
  const addToDb = trpc.user.signup.useMutation();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error: {error.message}</div>;
  }

  // src/components/SignUpForm.tsx

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!isLoaded) {
      return;
    }
    try {
      await signUp
        .create({
          emailAddress: email,
          password,
          username,
        })
        .then((result) => {
          if (result.status === "complete") {
            if (
              !result.createdUserId ||
              !result.emailAddress ||
              !result.username
            ) {
              return;
            }
            addToDb.mutate({
              email: result.emailAddress,
              username: result.username,
              clerkAuthId: result.createdUserId,
              schoolId: selectedSchoolId, // Include the selected school ID
            });
            router.push("/");
          } else {
            console.error(result);
          }
        })
        .catch((error) => {
          console.error(error);
        });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="email">Email address</label>
        <input
          id="email"
          type="email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="username">Username</label>
        <input
          id="username"
          type="text"
          name="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>
      <div>
        <label className="block text-sm mt-8" htmlFor="password">
          Password
        </label>
        <input
          id="password"
          type="password"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      {!isSchoolsLoading && (
        <div>
          <label htmlFor="school">School</label>
          <select
            id="school"
            name="school"
            value={selectedSchoolId}
            onChange={(e) => setSelectedSchoolId(e.target.value)}
          >
            <option value="">Select a school</option>
            {schools!.map((school) => (
              <option key={school.id} value={school.id}>
                {school.name}
              </option>
            ))}
          </select>
        </div>
      )}
      <div>
        <button type="submit">Sign Up</button>
      </div>
    </form>
  );
}
