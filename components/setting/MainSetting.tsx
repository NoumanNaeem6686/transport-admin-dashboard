"use client";

import React, { useState } from 'react';
import axios from 'axios';
import { useCheckAdmin } from '../hooks/useCheckingAdmin';
import { Pencil } from 'lucide-react';
import { signIn, useSession } from 'next-auth/react';
import { toast } from 'sonner';

function MainSetting() {
    const { userData } = useCheckAdmin();
    const [name, setName] = useState(userData?.user?.name || '');
    const [newPassword, setNewPassword] = useState('');
    const { update } = useSession()
    const session = useSession();

    const [confirmNewPassword, setConfirmNewPassword] = useState('');
    const [profileImage, setProfileImage] = useState(userData?.user?.image);
    const [selectedImage, setSelectedImage] = useState(null);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false)

    const handleImageChange = (e: any) => {
        const file = e.target.files[0];
        if (file) {
            setSelectedImage(file);
            const imageUrl = URL.createObjectURL(file);
            setProfileImage(imageUrl);
        }
    };

    const handleSaveChanges = async () => {
        if (newPassword && newPassword !== confirmNewPassword) {
            setError("Confirm Password does not match.");
            return;
        }
        setLoading(true);

        let imageUrl = profileImage;

        if (selectedImage) {
            const formData = new FormData();
            formData.append("file", selectedImage);
            formData.append("upload_preset", "bagwise");

            try {
                const cloudinaryResponse = await axios.post(
                    `https://api.cloudinary.com/v1_1/di6r722sv/image/upload`,
                    formData
                );
                imageUrl = cloudinaryResponse.data.secure_url;
            } catch (error) {
                setError("Failed to upload image. Please try again.");
                setLoading(false);
                return;
            }
        }

        try {
            const response = await axios.put(
                `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/users/update/${userData?.user?.id}`,
                {
                    name,
                    newPassword,
                    profileImage: imageUrl,
                }
            );
            console.log("🚀 ~ handleSaveChanges ~ response:", response.data)

            setProfileImage(imageUrl);
            setError('');
            toast.success("User Update Successfully")

            update({
                user: {
                    // @ts-ignore
                    ...session.user,
                    name: response.data.user.full_name,
                    image: response.data.user.profileImage,
                }
            })
        } catch (error) {
            console.error("Error updating profile:", error);
            setError("Failed to update profile. Please try again.");
        } finally {
            setLoading(false);
        }
    };


    return (
        <div className="flex flex-col items-center p-6 w-11/12 md:w-[36rem] dark:bg-neutral-900 rounded-2xl bg-slate-50 mx-auto mt-20">
            <div className='flex items-start justify-start w-full'>
                <div className="relative w-20 h-20">
                    <label htmlFor="modalProfileImageInput" className="h-20 w-20 rounded-full cursor-pointer relative">
                        <Pencil className="p-1 rounded-full bg-[#222222b9] text-white dark:bg-neutral-800 dark:text-gray-500 absolute h-5 w-5 right-1 bottom-1" />
                        <img
                            // @ts-ignore
                            src={profileImage}
                            alt="Profile"
                            className="rounded-full h-20 w-20 object-cover"
                        />
                        <input
                            type="file"
                            id="modalProfileImageInput"
                            className="hidden"
                            onChange={handleImageChange}
                        />
                    </label>
                </div>
            </div>
            <div className='flex flex-col lg:flex-row items-end gap-x-4 w-full'>
                <div className="mt-6 w-full">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-400 mb-1">Name</label>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full px-4 py-2 border dark:border-gray-600 rounded-lg focus:outline-none focus:ring"
                    />
                </div>
                <div className="mt-4 w-full">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-400 mb-1">Email
                        <span className='text-xs ml-2'>(You Cannot Change Email)</span>
                    </label>
                    <input
                        type="email"
                        // @ts-ignore
                        value={userData?.user?.email}
                        disabled
                        className="w-full px-4 py-2 border dark:border-gray-600 rounded-lg bg-gray-100 dark:bg-[#2222] dark:text-gray-500 text-gray-600 cursor-not-allowed"
                    />
                </div>
            </div>
            <div className='flex flex-col lg:flex-row items-end gap-x-4 w-full'>

                <div className="mt-4 w-full">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-400 mb-1">New Password</label>
                    <input
                        type="password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        className="w-full px-4 py-2 border dark:border-gray-600 rounded-lg focus:outline-none focus:ring"
                    />
                </div>
                <div className="mt-4 w-full">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-400 mb-1">Confirm New Password</label>
                    <input
                        type="password"
                        value={confirmNewPassword}
                        onChange={(e) => setConfirmNewPassword(e.target.value)}
                        className="w-full px-4 py-2 border dark:border-gray-600 rounded-lg focus:outline-none focus:ring"
                    />
                </div>
            </div>
            {error && <p className="text-red-500 my-4 w-full text-start">{error}</p>}

            <div className='flex items-center justify-end w-full'>
                <button
                    type="button"
                    onClick={handleSaveChanges}
                    className="mt-6 px-4 py-2 text-white rounded-lg bg-[#05549F] focus:outline-none focus:ring-2"
                >
                    {
                        loading ? "Updating...." : "Save Changes"
                    }

                </button>
            </div>
        </div>
    );
}

export default MainSetting;
