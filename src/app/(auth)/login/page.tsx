"use client";
import { useState } from "react";
import { useSignIn } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { trpc } from "@/app/_trpc/client";
import Link from "next/link";

export default function SignInForm() {
  const { isLoaded, signIn } = useSignIn();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!isLoaded) {
      return;
    }

    try {
      await signIn.create({
        identifier: email,
        password,
      }).then((result) => {
        if (result.status === "complete") {
          router.push("/");
        } else {
          console.error(result);
        }
      }).catch((error) => {
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
      <div>
        <button type="submit">Sign In</button>
      </div>
      <div>
        Don't have an account? <Link href="/signup">Sign up</Link>
      </div>
    </form>
  );
}