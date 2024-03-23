"use client";
import { useState } from "react";
import { useSignUp } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { trpc } from "@/app/_trpc/client";

export default function SignUpForm() {
  const { isLoaded, signUp, setActive } = useSignUp();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [pendingVerification, setPendingVerification] = useState(false);
  const [code, setCode] = useState("");

  const addToDb = trpc.user.signup.useMutation();
  const updateVerification = trpc.user.verifyEmailAddress.useMutation();

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
          if (result.status === "missing_requirements") {
            console.log(result);
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
            });
          } else {
            console.error(result);
          }
        })
        .catch((error) => {
          console.error(error);
        });

      await signUp.prepareEmailAddressVerification({ strategy: "email_code" });
      setPendingVerification(true);
      console.log("Pending verification");
    } catch (error) {
      console.error(error);
    }
  };

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isLoaded) {
      return;
    }
    try {
      const completeSignUp = await signUp.attemptEmailAddressVerification({
        code,
      });
      if (completeSignUp.status !== "complete") {
        /*  investigate the response, to see if there was an error
           or if the user needs to complete more steps.*/
        console.log(JSON.stringify(completeSignUp, null, 2));
      }
      if (completeSignUp.status === "complete") {
        await setActive({ session: completeSignUp.createdSessionId });
        updateVerification.mutate({
          userClerkAuthId: completeSignUp.createdUserId!,
        });
      }
    } catch (err: any) {
      console.error(JSON.stringify(err, null, 2));
    }
  };

  // Once the sign-up form was submitted, verifying was set to true and as a result, this verification form is presented to the user to input their verification code.
  if (pendingVerification) {
    return (
      <form onSubmit={handleVerify}>
        <label id="code">Code</label>
        <input
          value={code}
          id="code"
          name="code"
          onChange={(e) => setCode(e.target.value)}
        />
        <button type="submit">Complete Sign Up</button>
      </form>
    );
  }

  // Display the initial sign-up form to capture the email and password
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
      <div>
        <button type="submit">Verify Email</button>
      </div>
    </form>
  );
}
