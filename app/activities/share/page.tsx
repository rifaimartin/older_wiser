"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import { API_BASE_URL } from "@/constants";
import { usePathname } from "next/navigation";

interface Activity {
  id: string;
  title: string;
  image: string;
  category: string;
}

export default function ShareActivityPage() {
  const [selectedActivity, setSelectedActivity] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [images, setImages] = useState<File[]>([]);
  const [imagesPreviews, setImagesPreviews] = useState<string[]>([]);
  const [userActivities, setUserActivities] = useState<Activity[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  // Fetch user's activities
  useEffect(() => {
    const fetchUserActivities = async () => {
      try {
        const token = localStorage.getItem("token");
        const userData = localStorage.getItem("user");

        if (!userData || !token) {
          console.log("No user data or token found");
          return;
        }

        const user = JSON.parse(userData);

        // Debug log
        console.log("User data:", user);

        if (!user.email) {
          console.log("No user ID found");
          return;
        }

        const response = await fetch(
          `${API_BASE_URL}/activities/user/${user.email}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch activities");
        }

        const { data } = await response.json();
        console.log("Activities data:", data);
        setUserActivities(data);
      } catch (error) {
        console.error("Error fetching user activities:", error);
      }
    };

    fetchUserActivities();
  }, []);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length + images.length > 3) {
      alert("Maximum 3 images allowed");
      return;
    }

    setImages((prev) => [...prev, ...files]);

    // Create previews
    files.forEach((file) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagesPreviews((prev) => [...prev, reader.result as string]);
      };
      reader.readAsDataURL(file);
    });
  };

  const removeImage = (index: number) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
    setImagesPreviews((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const formData = new FormData();
      formData.append("activityId", selectedActivity);
      formData.append("title", title);
      formData.append("description", description);
      images.forEach((image) => {
        formData.append("images", image);
      });

      const token = localStorage.getItem("token");
      const response = await fetch(`${API_BASE_URL}/activities/share`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      if (!response.ok) throw new Error("Failed to share activity");

      alert("Activity shared successfully!");
      // Reset form
      setTitle("");
      setDescription("");
      setImages([]);
      setImagesPreviews([]);
      setSelectedActivity("");
    } catch (error) {
      console.error("Error sharing activity:", error);
      alert("Failed to share activity");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-8">
      <div className="flex items-center gap-2 text-sm text-gray-600 mb-6">
        <span>Share</span>
        <span>›</span>
        <b>
          <span>Documentation</span>
        </b>
        <span>›</span>
        <span>Voucher</span>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Left Column - Upload Section */}
        <div className="bg-white rounded-[20px] p-8 shadow-sm">
          <h2 className="text-xl font-medium mb-6 text-center">
            Upload Documentation
          </h2>

          <div
            className="border-2 border-dashed border-gray-200 rounded-[20px] p-12
            flex flex-col items-center justify-center cursor-pointer hover:border-[#6A8270] transition-colors"
            onDrop={(e) => {
              e.preventDefault();
              const files = Array.from(e.dataTransfer.files);
              if (files.length + images.length > 3) {
                alert("Maximum 3 images allowed");
                return;
              }
              setImages((prev) => [...prev, ...files]);
            }}
            onDragOver={(e) => e.preventDefault()}
          >
            {imagesPreviews.length === 0 ? (
              <>
                <div className="w-24 h-24 bg-[#f8f8f8] rounded-full flex items-center justify-center mb-4">
                  <svg
                    className="w-10 h-10 text-[#6A8270]"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"
                    />
                  </svg>
                </div>
                <p className="text-gray-600 mb-1">
                  Drag and drop photo files to upload
                </p>
                <p className="text-sm text-gray-400">(max 3 photos)</p>
              </>
            ) : (
              <div className="grid grid-cols-3 gap-4 w-full">
                {imagesPreviews.map((preview, index) => (
                  <div
                    key={index}
                    className="relative rounded-lg overflow-hidden"
                  >
                    <img
                      src={preview}
                      alt={`Preview ${index + 1}`}
                      className="w-full h-24 object-cover"
                    />
                    <button
                      onClick={() => removeImage(index)}
                      className="absolute top-2 right-2 w-6 h-6 bg-red-500 text-white rounded-full 
                      flex items-center justify-center text-sm hover:bg-red-600 transition-colors"
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Right Column - Form */}
        <div className="space-y-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Activity Selection */}
            <div>
              <select
                value={selectedActivity}
                onChange={(e) => setSelectedActivity(e.target.value)}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-[20px] focus:outline-none 
                focus:border-[#6A8270] bg-white appearance-none"
                required
              >
                <option value="">Select an activity</option>
                {userActivities.map((activity) => (
                  <option key={activity.id} value={activity.id}>
                    {activity.title}
                  </option>
                ))}
              </select>
            </div>

            {/* Title */}
            <div>
              <div className="relative">
                <textarea
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Title (required)&#10;What do you want to say..."
                  rows={3}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-[20px] focus:outline-none 
                  focus:border-[#6A8270] resize-none bg-white"
                  required
                />
              </div>
            </div>

            {/* Description */}
            <div>
              <div className="relative">
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Description (required)&#10;What do you want to say..."
                  rows={4}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-[20px] focus:outline-none 
                  focus:border-[#6A8270] resize-none bg-white"
                  required
                />
              </div>
            </div>

            {/* Submit Button */}
            <div className="flex justify-end">
              <button
                type="submit"
                disabled={isLoading}
                className="px-6 py-2 bg-[#6A8270] text-white rounded-full hover:bg-[#5a7260] 
                disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {isLoading ? "Posting..." : "Post Now"}
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Hidden file input */}
      <input
        type="file"
        multiple
        accept="image/*"
        onChange={handleImageUpload}
        className="hidden"
        id="image-upload"
      />
    </div>
  );
}
