import React, { useState } from "react";
import { authApi } from "../../../api/AuthAPi";
import { useDispatch, useSelector } from "react-redux";
import {
  loginFailure,
  loginStart,
  loginSuccess,
} from "../../../store/slice/authSlice";
import type { RootState } from "../../../store/store";
import { Link, useNavigate } from "react-router";
import axios from "axios";
import { motion } from "motion/react";
import { FormField } from "./FormField";

const SignUpForm = () => {
  const dispatch = useDispatch();
  //   const [firstName, setFirstName] = useState("");
  //   const [lastName, setLastName] = useState("");
  //   const [username, setUsername] = useState("");
  //   const [password, setPassword] = useState("");
  const [formError, setFormError] = useState("");
  const [profilePicture, setProfilePicture] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState("");

  const [form, setForm] = useState({
    username: "",
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const updateField = (field: keyof typeof form, value: string) => {
    setForm((previous) => ({
      ...previous,
      [field]: value,
    }));
  };

  const { loading } = useSelector((state: RootState) => state.auth);
  const navigate = useNavigate();

  const fileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();

      reader.onload = () => {
        if (typeof reader.result === "string") {
          resolve(reader.result);
        } else {
          reject(new Error("Could not convert file to Base64"));
        }
      };

      reader.onerror = () => {
        reject(reader.error ?? new Error("File reading failed"));
      };

      reader.readAsDataURL(file);
    });
  };

  const handleProfilePictureChange = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = e.target.files?.[0];

    if (!file) return;

    //       const objectUrl = URL.createObjectURL(file);
    // setPreviewUrl(objectUrl);

    setProfilePicture(file);
    setPreviewUrl(URL.createObjectURL(file));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (form.password !== form.confirmPassword) {
      setFormError("Passwords do not match.");
      return;
    }

    setFormError("");
    dispatch(loginStart());

    try {
      let profilePictureBase64: string | undefined;

      if (profilePicture) {
        profilePictureBase64 = await fileToBase64(profilePicture);
        console.log(profilePictureBase64);
      }

      await authApi.register({
        pfp: profilePictureBase64,
        username: form.username,
        firstName: form.firstName,
        lastName: form.lastName,
        email: form.email,
        password: form.password,
      });

      const response = await authApi.login({
        username: form.username,
        password: form.password,
      });

      const { token, user } = response.data;

      dispatch(loginSuccess({ token, user }));
      navigate("/dashboard");
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        dispatch(
          loginFailure(
            err.response?.data?.message ||
              err.response?.data ||
              "Authentication failed",
          ),
        );
      } else {
        dispatch(loginFailure("Authentication failed"));
      }
    }
  };

  //   const handleSubmit = async (e: React.SubmitEvent) => {
  //   e.preventDefault();

  //   // Client-side validation
  //   if (form.password !== form.confirmPassword) {
  //     setFormError("Passwords do not match.");
  //     return;
  //   }

  //   setFormError("");
  //   dispatch(loginStart());

  //   try {
  //     await authApi.register({
  //       pfp: profilePicture,
  //       username: form.username,
  //       firstName: form.firstName,
  //       lastName: form.lastName,
  //       email: form.email,
  //       password: form.password,
  //     });

  //     const response = await authApi.login({
  //       username: form.username,
  //       password: form.password,
  //     });

  //     const { token, user } = response.data;

  //     dispatch(loginSuccess({ token, user }));
  //     navigate("/dashboard");
  //   } catch (err: unknown) {
  //     if (axios.isAxiosError(err)) {
  //       dispatch(
  //         loginFailure(
  //           err.response?.data?.message ||
  //             err.response?.data ||
  //             "Authentication failed"
  //         )
  //       );
  //     } else {
  //       dispatch(loginFailure("Authentication failed"));
  //     }
  //   }
  // };

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      // className="relative md:border border-slate-200 dark:border-zinc-800 rounded-xl w-[98%] md:w-[90%] max-w-250 p-6 flex flex-col justify-around bg-white dark:bg-transparent text-slate-900 dark:text-white shadow-sm dark:shadow-none overflow-y-auto"
      className="
  relative w-full max-w-250
  min-h-screen md:min-h-0
  rounded-none md:rounded-xl
  border-0 md:border
  border-slate-200 dark:border-zinc-800
  bg-white dark:bg-transparent
  p-4 sm:p-6
  text-slate-900 dark:text-white
  shadow-none md:shadow-sm
"
    >
      <div className="pb-2">
        <h1 className="text-2xl">Create Account</h1>
      </div>
      {/* <div className="grid grid-cols-1 md:grid-cols-[0.8fr_1.4fr]"> */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-[0.8fr_1.4fr] md:gap-0">
        {/* 
        <div className="flex flex-col items-center justify-center p-6
                        "> */}
        {/* border-b md:border-b-0 border-slate-200 dark:border-zinc-800 */}
        {/* md:border-r */}

        <div className="flex flex-col items-center justify-center px-2 py-2 sm:p-6">
          <label
            htmlFor="profilePicture"
            // className="group relative h-28 w-28 md:h-72 md:w-72  cursor-pointer
            //            overflow-hidden rounded-full border
            //            border-slate-300 bg-slate-100
            //            dark:border-white/15 dark:bg-white/10"
            className="
                group relative
                h-32 w-32
                sm:h-40 sm:w-40
                md:h-72 md:w-72
                cursor-pointer overflow-hidden rounded-full
                border border-slate-300 bg-slate-100
              dark:border-white/15 dark:bg-white/10
              "
          >
            {previewUrl ? (
              <img
                src={previewUrl}
                alt="Profile preview"
                className="h-full w-full object-cover"
              />
            ) : (
              <div
                className="flex h-full w-full flex-col
                              items-center justify-center"
              >
                <span className="text-3xl text-slate-400">+</span>
                <span className="text-xs text-slate-500">Add photo</span>
              </div>
            )}

            <div
              className="absolute inset-0 flex items-center
                            justify-center bg-black/50 text-xs
                            text-white opacity-0 transition-opacity
                            group-hover:opacity-100"
            >
              Change
            </div>
          </label>

          <input
            id="profilePicture"
            type="file"
            accept="image/png,image/jpeg,image/webp"
            className="hidden"
            onChange={handleProfilePictureChange}
          />
          {/* 
          <p className="mt-3 text-center text-xs text-slate-500">
            Profile picture
            <br />
            <span className="opacity-70">Optional</span>
          </p> */}
        </div>

        <div className="flex flex-col justify-center md:p-5">
          <form className="space-y-4" onSubmit={handleSubmit}>
            <FormField
              id="username"
              label="Username"
              placeholder="Username"
              value={form.username}
              autoComplete="username"
              required
              onChange={(value) => updateField("username", value)}
            />
            <div className="flex flex-row gap-2 w-full">
              <div className="flex-1">
                <FormField
                  id="firstName"
                  label="First Name"
                  placeholder="First Name"
                  value={form.firstName}
                  autoComplete="given-name"
                  onChange={(value) => updateField("firstName", value)}
                />
              </div>
              <div className="flex-1">
                <FormField
                  id="lastName"
                  label="Last Name"
                  placeholder="Last Name"
                  value={form.lastName}
                  autoComplete="family-name"
                  onChange={(value) => updateField("lastName", value)}
                />
              </div>
            </div>

            <FormField
              id="email"
              label="Email"
              type="email"
              placeholder="Email@email.com"
              value={form.email}
              autoComplete="email"
              onChange={(value) => updateField("email", value)}
            />

            <FormField
              id="password"
              label="Password"
              type="password"
              placeholder="••••••••"
              value={form.password}
              autoComplete="new-password"
              required
              onChange={(value) => updateField("password", value)}
            />

            <FormField
              id="confirmPassword"
              label="Confirm Password"
              type="password"
              placeholder="••••••••"
              value={form.confirmPassword}
              autoComplete="new-password"
              required
              onChange={(value) => updateField("confirmPassword", value)}
            />
            {formError && (
              <p className="text-sm text-red-500" role="alert">
                {formError}
              </p>
            )}

            <div className="flex items-center justify-between gap-4"></div>

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-2xl py-3 bg-slate-100 dark:bg-white/10
               border border-slate-300 dark:border-white/15
               hover:bg-slate-200 dark:hover:bg-white/15 transition-colors
               disabled:opacity-60 disabled:cursor-not-allowed
               text-slate-800 dark:text-slate-100 font-medium"
            >
              {loading ? "Creating account..." : "Sign up"}
            </button>
            <p className="text-center text-xs text-slate-600 dark:text-slate-300/70">
              Already existing user?{" "}
              <Link
                className="underline hover:text-slate-950 dark:hover:text-white"
                to="/login"
              >
                Sign in
              </Link>
              .
            </p>
          </form>
        </div>
      </div>
    </motion.div>
  );
};

export default SignUpForm;
