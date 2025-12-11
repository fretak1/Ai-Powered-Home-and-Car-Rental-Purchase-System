// components/SignInForm.tsx
"use client";

import React, { useState, FormEvent, ChangeEvent, MouseEvent } from 'react';
import Link from 'next/link'; // Import Link for routing
import { useAuthStore } from '@/store/authStore';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

const SignInForm = () => {
    const [formData, setFormData] = useState({ email: "", password: "" });
    const [showPassword, setShowPassword] = useState(false);

    const { login, user, isLoading } = useAuthStore();
    const router = useRouter();


    // Explicitly type 'e' as FormEvent
    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        // Replace with your actual authentication logic (e.g., calling an API)
        const success = await login(formData.email, formData.password);
        console.log(success);
        if (success) {
            toast("Login Successful");
            router.push("/");
        }

    };

    // Explicitly type 'e' as MouseEvent<HTMLButtonElement>
    const togglePasswordVisibility = (e: MouseEvent<HTMLButtonElement>) => {
        e.preventDefault(); // Prevents button from submitting the form
        setShowPassword(!showPassword);
    };

    return (
        // Outer container for the dark background and centered form
        <div className="flex justify-center items-center min-h-screen bg-gray-900">

            {/* Form Card */}
            <div className="w-full max-w-md bg-gray-800 p-8 rounded-xl shadow-2xl border border-gray-700/50">

                {/* Tabs Container */}
                <div className="flex mb-8 border-b border-gray-700">
                    <button
                        className="flex-1 py-3 text-center text-white text-lg font-semibold border-b-2 border-cyan-400"
                        disabled
                    >
                        Sign In
                    </button>
                    {/* Use Link component for navigation */}
                    <Link className="flex-1 py-3 text-center text-gray-400 text-lg font-semibold hover:text-white transition-colors" href="/register" >

                        Create Account

                    </Link>
                </div>

                {/* Form Body */}
                <form onSubmit={handleSubmit}>

                    {/* Username Input */}
                    <div className="mb-6">
                        <label className="block text-gray-300 text-sm font-medium mb-2" htmlFor="username">
                            Email
                        </label>
                        <input
                            id="email"
                            type="text"
                            placeholder="Enter your Email"
                            value={formData.email}
                            // Explicitly type 'e' as ChangeEvent<HTMLInputElement>
                            onChange={(e: ChangeEvent<HTMLInputElement>) => setFormData({ ...formData, email: e.target.value })}
                            className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-400"
                            required
                        />
                    </div>

                    {/* Password Input */}
                    <div className="mb-8">
                        <label className="block text-gray-300 text-sm font-medium mb-2" htmlFor="password">
                            Password
                        </label>
                        <div className="relative">
                            <input
                                id="password"
                                type={showPassword ? 'text' : 'password'}
                                placeholder="Enter your Password"
                                value={formData.password}
                                // Explicitly type 'e' as ChangeEvent<HTMLInputElement>
                                onChange={(e: ChangeEvent<HTMLInputElement>) => setFormData({ ...formData, password: e.target.value })}
                                className="w-full p-3 pr-10 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-400"
                                required
                            />
                            <button
                                type="button"
                                className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-white"
                                onClick={togglePasswordVisibility}
                            >
                                {/* Eye Icon SVG logic */}
                                {showPassword ? (
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"></path><circle cx="12" cy="12" r="3"></circle></svg>
                                ) : (
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9.88 9.88a3 3 0 1 0 4.24 4.24"></path><path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68"></path><path d="M6.61 6.61A13.52 13.52 0 0 0 2 12s3 7 10 7a9.7 9.7 0 0 0 5.27-1.39"></path><path d="M2 2l20 20"></path></svg>
                                )}
                            </button>
                        </div>
                    </div>

                    {/* Sign In Button */}
                    <button
                        type="submit"
                        className="w-full bg-cyan-500 hover:bg-cyan-600 text-white font-bold py-3 rounded-lg transition-colors shadow-lg shadow-cyan-500/30"
                    >
                        Sign in
                    </button>
                </form>

                {/* Forgot Password Link */}
                <div className="text-center mt-6">
                    <a href="#" className="text-cyan-400 hover:text-cyan-300 text-sm">
                        Forgot your password?
                    </a>
                </div>

            </div>
        </div>
    );
};

export default SignInForm;