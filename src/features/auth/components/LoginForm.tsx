import React, { useState } from 'react'
import { authApi } from '../../../api/AuthAPi';
import { useDispatch, useSelector } from 'react-redux';
import { loginFailure, loginStart, loginSuccess } from '../../../store/slice/authSlice';
import type { RootState } from '../../../store/store';
import { Link, useNavigate } from 'react-router';
import axios from 'axios';
import { motion } from 'motion/react';

interface LoginFormProps  {
  type: "login" | "register"
}

const LoginForm: React.FC<LoginFormProps> = ({type}) => {
    const dispatch = useDispatch();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    // const [remember, setRemember] = useState(true);
    const { loading } = useSelector((state: RootState) => state.auth);
    const navigate = useNavigate();

    const handleSubmit = async (e: React.SubmitEvent) => {
      e.preventDefault();
      dispatch(loginStart());
      try{
        if(type === 'register') await authApi.register({ username, password});
        const response = await authApi.login({username, password});
        const {token, user} = response.data;
        // console.log(user);
        try{
          dispatch(loginSuccess({token, user}));

        } catch (error: unknown) {
          console.log(error);
          
        }
        
        navigate("/dashboard")
        
      }catch (err: unknown) {
        if (axios.isAxiosError(err)) {
          dispatch(
            loginFailure(
              err.response?.data || "Authentication failed"
            )
          );
        } else {
          dispatch(loginFailure("Authentication failed"));
        }

    }

    }

  return (
    <motion.div
    
                initial={{opacity: 0, y:40}}
                animate={{opacity:1, y:0}}
                transition={{duration: 0.4, ease:"easeOut"}}
    className='relative border border-slate-200 dark:border-zinc-800 rounded-xl w-[90%] max-w-120 h-120 p-6 flex flex-col justify-around bg-white dark:bg-transparent text-slate-900 dark:text-white shadow-sm dark:shadow-none'>
        {/* <div className='bg-white blur-2xl'>
            login
        </div> */}
        <div>
        <h1 className='text-2xl'>{type === "login" ? "Welcome Back" : "Create Account"}</h1>
        <p className="mt-1 text-sm text-slate-600 dark:text-slate-300/80">Enter your credentials to continue.</p>
        </div>
        <div className='flex flex-col justify-center'>
          {/* <div>Username</div>
          <div></div>
          <div>
            Password
          </div> */}
          <form className="space-y-4" onSubmit={handleSubmit}>
                <div>
                  <label htmlFor={username} className="block text-sm mb-2 text-slate-700 dark:text-slate-300/90">
                    Username
                  </label>
                  <div className="relative">
                    <input
                      id={username}
                      type="text"
                      // autoComplete="email"
                      placeholder="Username"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      className="w-full rounded-2xl px-4 py-3 bg-slate-100 dark:bg-white/5 border border-slate-300 dark:border-white/10 outline-none
                                 focus:border-slate-400 dark:focus:border-white/20 focus:ring-1 focus:ring-slate-300 dark:focus:ring-white/10
                                 text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm mb-2 text-slate-700 dark:text-slate-300/90">
                    Password
                  </label>
                  <input
                    type="password"
                    autoComplete="current-password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full rounded-2xl px-4 py-3 bg-slate-100 dark:bg-white/5 border border-slate-300 dark:border-white/10 outline-none
                               focus:border-slate-400 dark:focus:border-white/20 focus:ring-1 focus:ring-slate-300 dark:focus:ring-white/10
                               text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500"
                    required
                  />
                </div>

                <div className="flex items-center justify-between gap-4">
                  {/* <label className="inline-flex items-center gap-2 select-none text-sm text-slate-300/90">
                    <input
                      type="checkbox"
                      checked={remember}
                      onChange={(e) => setRemember(e.target.checked)}
                      className="accent-emerald-400"
                    />
                    Remember me
                  </label> */}

                  {type === "login" &&
                    <a href="#" className="text-sm text-slate-700 dark:text-slate-200/80 hover:text-slate-950 dark:hover:text-white transition-colors">
                    Forgot password?
                  </a>}
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full rounded-2xl py-3 bg-slate-100 dark:bg-white/10 border border-slate-300 dark:border-white/15
                             hover:bg-slate-200 dark:hover:bg-white/15 transition-colors disabled:opacity-60 disabled:cursor-not-allowed
                             text-slate-800 dark:text-slate-100 font-medium"
                >
                  {type=== "login" ? 
                    (loading ? "Signing in..." : "Sign in") : 
                    (loading ? "Signing up..." : "Sign up")
                  }
                </button>

                {type === "login" ?
                  <p className="text-center text-xs text-slate-600 dark:text-slate-300/70">
                  New here? <Link className="underline hover:text-slate-950 dark:hover:text-white" to="/signup">Create an account</Link>.
                </p>
                :
                  <p className="text-center text-xs text-slate-600 dark:text-slate-300/70">
                  Already existing user? <Link className="underline hover:text-slate-950 dark:hover:text-white" to="/login">Sign in</Link>.
                </p>
                }
                {/* <p className="text-center text-xs text-slate-300/70">
                  By continuing, you agree to our <a className="underline hover:text-white" href="#">Terms</a> and{" "}
                  <a className="underline hover:text-white" href="#">Privacy</a>.
                </p> */}
              </form>
            
        </div>
    </motion.div>
  )
}

export default LoginForm
