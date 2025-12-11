// components/RegisterForm.tsx
"use client";

import React, { useState, FormEvent, ChangeEvent, MouseEvent } from 'react';
import Link from 'next/link';
import { useAuthStore } from '@/store/authStore';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

const RegisterForm = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
    });
    const [showPassword, setShowPassword] = useState(false);

    const { register, isLoading } = useAuthStore();

    const router = useRouter();
    // Explicitly type 'e' as FormEvent
    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();

        const userID = await register(
            formData.name,
            formData.email,
            formData.password
        );

        if (userID) {
            toast("Registration Successful");
            router.push("/login");
        }
    };

    // Explicitly type 'e' as MouseEvent<HTMLButtonElement>
    const togglePasswordVisibility = (e: MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        setShowPassword(!showPassword);
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-900">
            <div className="w-full max-w-md bg-gray-800 p-8 rounded-xl shadow-2xl border border-gray-700/50">

                {/* Tabs Container */}
                <div className="flex mb-8 border-b border-gray-700">
                    {/* Link to Sign In Page */}
                    <Link href="/login" className="flex-1 py-3 text-center text-gray-400 text-lg font-semibold hover:text-white transition-colors">
                        Sign In
                    </Link>
                    <button
                        className="flex-1 py-3 text-center text-white text-lg font-semibold border-b-2 border-cyan-400"
                        disabled
                    >
                        Create Account
                    </button>
                </div>

                {/* Form Body */}
                <form onSubmit={handleSubmit}>

                    {/* Username Input */}
                    <div className="mb-4">
                        <label className="block text-gray-300 text-sm font-medium mb-2" htmlFor="username">
                            Name
                        </label>
                        <input
                            id="name"
                            type="text"
                            placeholder="Enter your Name"
                            value={formData.name}
                            // Explicitly type 'e' as ChangeEvent<HTMLInputElement>
                            onChange={(e: ChangeEvent<HTMLInputElement>) => setFormData({ ...formData, name: e.target.value })}
                            className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-400"
                            required
                        />
                    </div>

                    {/* Email Input (New Field) */}
                    <div className="mb-4">
                        <label className="block text-gray-300 text-sm font-medium mb-2" htmlFor="email">
                            Email Address
                        </label>
                        <input
                            id="email"
                            type="email"
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
                                placeholder="Create a Secure Password"
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
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d={showPassword ? "M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" : "M9.88 9.88a3 3 0 1 0 4.24 4.24M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68M6.61 6.61A13.52 13.52 0 0 0 2 12s3 7 10 7a9.7 9.7 0 0 0 5.27-1.39M2 2l20 20"}></path><circle cx="12" cy="12" r={showPassword ? "3" : "0"}></circle></svg>
                            </button>
                        </div>
                    </div>

                    {/* Create Account Button */}
                    <button
                        type="submit"
                        className="w-full bg-cyan-500 hover:bg-cyan-600 text-white font-bold py-3 rounded-lg transition-colors shadow-lg shadow-cyan-500/30"
                    >
                        Create Account
                    </button>
                </form>

                {/* Sign In Link */}
                <div className="text-center mt-6">
                    <Link href="/login" className="text-cyan-400 hover:text-cyan-300 text-sm">
                        Already have an account? Sign In
                    </Link>
                </div>

            </div>
        </div>
    );
};

export default RegisterForm;