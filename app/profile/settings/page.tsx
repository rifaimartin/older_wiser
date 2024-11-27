"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { AvatarUpload } from "@/components/AvatarUpload";
import { API_BASE_URL } from "@/constants";
import Swal from "sweetalert2";

interface UserSettings {
  name: string;
  email: string;
  phone: string;
  imageUrl?: string;
  theme: "light" | "dark";
  language: string;
  region: string;
}

export default function Settings() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<"profile" | "settings">("profile");
  const [settings, setSettings] = useState<UserSettings>({
    name: "",
    email: "",
    phone: "",
    theme: "light",
    language: "English (US)",
    region: "Indonesia",
  });
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Fetch profile data
  const fetchProfile = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`${API_BASE_URL}/auth/me`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch profile");
      }

      const data = await response.json();

      // Update settings with fetched data
      setSettings((prev) => ({
        ...prev,
        name: data.data.personalInfo.name,
        email: data.data.personalInfo.email,
        phone: data.data.personalInfo.phone || "",
        imageUrl: data.data.personalInfo.imageUrl || "",
        theme: data.data.settings?.theme || "light",
        language: data.data.settings?.language || "English (US)",
        region: data.data.settings?.region || "Indonesia",
      }));

      // Update localStorage
      localStorage.setItem("user", JSON.stringify(data.data.personalInfo));
    } catch (error) {
      console.error("Error fetching profile:", error);
      alert("Failed to load profile data");
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  const handleAvatarUpdate = (imagePath: string) => {
    setSettings((prev) => ({
      ...prev,
      imageUrl: imagePath,
    }));

    // Update user in localStorage
    const userData = localStorage.getItem("user");
    if (userData) {
      const user = JSON.parse(userData);
      const updatedUser = {
        ...user,
        imageUrl: imagePath,
      };
      localStorage.setItem("user", JSON.stringify(updatedUser));
    }
  };

  const handleSaveChanges = async () => {
    setIsLoading(true);
    try {
      const token = localStorage.getItem("token");
      const formData = new FormData();

      // Append file if exists
      if (selectedFile) {
        formData.append("avatar", selectedFile);
      }

      // Append other fields
      formData.append("name", settings.name);
      formData.append("email", settings.email);
      formData.append("phone", settings.phone);

      // Send to API
      const response = await fetch(`${API_BASE_URL}/auth/update-profile`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Failed to update profile");
      }

      const data = await response.json();

      // Update localStorage and refetch profile
      Swal.fire({
        title: "Activity update succefully!",
        // text: "Your battery is below 20%. Would you like to enable dark mode to save battery?",
        icon: "success",
        // showCancelButton: true,
        confirmButtonColor: "#6A8270",
        confirmButtonText: "ok",
      }).then((result) => {});
    } catch (error) {
      console.error("Error updating profile:", error);
      alert("Failed to update profile. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    document.cookie = "token=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT";
    document.cookie = "user=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT";
    router.push("/auth/login");
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex gap-8">
        {/* Sidebar */}
        <div className="w-64 border-r dark:border-gray-700 pr-8">
          <div className="flex flex-col items-center mb-12">
            <AvatarUpload
              name={settings.name}
              currentImage={
                settings.imageUrl
                  ? `${API_BASE_URL}${settings.imageUrl}`
                  : undefined
              }
              onFileSelect={setSelectedFile}
            />
          </div>
          <nav className="flex flex-col space-y-4">
            <Link
              href="#profile"
              className={`px-4 py-3 rounded-lg ${
                activeTab === "profile"
                  ? "bg-[#6A8270] text-white"
                  : "text-gray-300 hover:bg-gray-800"
              }`}
              onClick={() => setActiveTab("profile")}
            >
              Profile
            </Link>
            <Link
              href="#settings"
              className={`px-4 py-3 rounded-lg ${
                activeTab === "settings"
                  ? "bg-[#6A8270] text-white"
                  : "text-gray-300 hover:bg-gray-800"
              }`}
              onClick={() => setActiveTab("settings")}
            >
              Settings
            </Link>
            <Link
              href="#activity"
              className="px-4 py-3 rounded-lg text-gray-300 hover:bg-gray-800"
            >
              My Activity
            </Link>
            <button
              onClick={handleLogout}
              className="px-4 py-3 rounded-lg text-red-400 hover:bg-gray-800 text-left w-full mt-4"
            >
              Log Out
            </button>
          </nav>
        </div>

        {/* Main Content */}
        <div className="flex-1">
          {activeTab === "profile" ? (
            <div className="space-y-6">
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-2xl font-semibold dark:text-white">
                  Profile Information
                </h2>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Name
                  </label>
                  <input
                    type="text"
                    value={settings.name}
                    onChange={(e) =>
                      setSettings({ ...settings, name: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm bg-white dark:bg-gray-800 dark:border-gray-700 dark:text-white"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    value={settings.email}
                    onChange={(e) =>
                      setSettings({ ...settings, email: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm bg-white dark:bg-gray-800 dark:border-gray-700 dark:text-white"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Mobile number
                  </label>
                  <input
                    type="tel"
                    value={settings.phone}
                    onChange={(e) =>
                      setSettings({ ...settings, phone: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm bg-white dark:bg-gray-800 dark:border-gray-700 dark:text-white"
                  />
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-2xl font-semibold dark:text-white">
                  App Settings
                </h2>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Theme
                  </label>
                  <span className="text-gray-600 dark:text-gray-400">
                    {settings.theme}
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Language
                  </label>
                  <span className="text-gray-600 dark:text-gray-400">
                    {settings.language}
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Region
                  </label>
                  <span className="text-gray-600 dark:text-gray-400">
                    {settings.region}
                  </span>
                </div>
              </div>
            </div>
          )}

          <div className="mt-6">
            <button
              onClick={handleSaveChanges}
              disabled={isLoading}
              className="px-4 py-2 bg-[#6A8270] text-white rounded-lg hover:bg-[#7c9884] transition-colors disabled:opacity-50 flex items-center"
            >
              {isLoading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                  Saving...
                </>
              ) : (
                "Save Changes"
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
