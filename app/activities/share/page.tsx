"use client";
import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { API_BASE_URL } from "@/constants";
import { usePathname } from "next/navigation";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";

interface Activity {
  _id: string;
  title: string;
  image: string;
  category: string;
}

export default function ShareActivityPage() {
  const router = useRouter();
  const [selectedActivity, setSelectedActivity] = useState("");
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [images, setImages] = useState<File[]>([]);
  const [imagesPreviews, setImagesPreviews] = useState<string[]>([]);
  const [userActivities, setUserActivities] = useState<Activity[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [fileSizes, setFileSizes] = useState<{ name: string; size: string }[]>([]);
  const [totalSize, setTotalSize] = useState<string>("");

  // Format file size function
  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 MB';
    
    const mb = bytes / (1024 * 1024);
    return `${mb.toFixed(2)} MB`;
  };

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

  const uploadImages = async (files: File[]): Promise<string[]> => {
    try {
      const token = localStorage.getItem("token");
      const uploadPromises = files.map(async (file) => {
        const formData = new FormData();
        formData.append("image", file);
  
        const response = await fetch(`${API_BASE_URL}/activities/upload`, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        });
  
        if (!response.ok) throw new Error("Failed to upload image");
  
        const data = await response.json();
        return data.data.path;
      });
  
      return await Promise.all(uploadPromises);
    } catch (error) {
      console.error("Error uploading images:", error);
      throw error;
    }
  };

  const removeImage = (index: number) => {
    setImages(prev => {
      const newImages = prev.filter((_, i) => i !== index);
      const totalBytes = newImages.reduce((acc, file) => acc + file.size, 0);
      setTotalSize(formatFileSize(totalBytes));
      return newImages;
    });
    setImagesPreviews(prev => prev.filter((_, i) => i !== index));
    setFileSizes(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
  
    try {
      const imagePaths = await uploadImages(images);
      console.log('Uploaded image paths:', imagePaths);
  
      const token = localStorage.getItem("token");
      const response = await fetch(`${API_BASE_URL}/activities/create`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          description,
          image: imagePaths[0],
          images: imagePaths,
          category: selectedActivity
        }),
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to share activity");
      }
  
      Swal.fire({
        title: "Activity shared successfully!",
        icon: "success",
        confirmButtonColor: "#6A8270",
        confirmButtonText: "ok",
      }).then((result) => {
        if (result.isConfirmed) {
          router.push("/explore");
        }
      });

      setTitle("");
      setDescription("");
      setImages([]);
      setImagesPreviews([]);
      setSelectedActivity("");
      setCategory("");
      setFileSizes([]);
      setTotalSize("");
    } catch (error) {
      console.error("Error sharing activity:", error);
      alert(error instanceof Error ? error.message : "Failed to share activity");
    } finally {
      setIsLoading(false);
    }
  };

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (files: FileList | null) => {
    if (!files) return;

    const newFiles = Array.from(files);
    
    if (images.length + newFiles.length > 3) {
      alert("Maximum 3 images allowed");
      return;
    }

    // Calculate sizes for new files
    const newFileSizes = newFiles.map(file => ({
      name: file.name,
      size: formatFileSize(file.size)
    }));

    // Calculate total size of all files (including existing ones)
    const totalBytes = [...images, ...newFiles].reduce((acc, file) => acc + file.size, 0);
    setTotalSize(formatFileSize(totalBytes));

    // Update file sizes
    setFileSizes(prev => [...prev, ...newFileSizes]);

    // Create file previews
    newFiles.forEach(file => {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagesPreviews(prev => [...prev, reader.result as string]);
      };
      reader.readAsDataURL(file);
    });

    // Update images array
    setImages(prev => [...prev, ...newFiles]);
  };

  return (
    <div className="max-w-7xl mx-auto p-8">
    <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 mb-6">
      <span>Share</span>
      <span>›</span>
      <b>
        <span className="dark:text-white">Documentation</span>
      </b>
      <span>›</span>
      <span>Voucher</span>
    </div>

    <div className="grid md:grid-cols-2 gap-8">
      {/* Left Column - Upload Section */}
      <div className="bg-white dark:bg-gray-800 rounded-[20px] p-8 shadow-sm">
        <h2 className="text-xl font-medium mb-6 text-center dark:text-white">
          Upload Documentation
        </h2>

        <div 
          className="border-2 border-dashed border-gray-200 dark:border-gray-700 rounded-[20px] p-12
          flex flex-col items-center justify-center cursor-pointer hover:border-[#6A8270] 
          dark:hover:border-[#6A8270] transition-colors dark:bg-gray-900"
          onClick={() => fileInputRef.current?.click()}
          onDrop={(e) => {
            e.preventDefault();
            handleFileSelect(e.dataTransfer.files);
          }}
          onDragOver={(e) => {
            e.preventDefault();
            e.currentTarget.classList.add('border-[#6A8270]');
          }}
          onDragLeave={(e) => {
            e.preventDefault();
            e.currentTarget.classList.remove('border-[#6A8270]');
          }}
        >
          {imagesPreviews.length === 0 ? (
            <>
              <div className="w-24 h-24 bg-[#f8f8f8] dark:bg-gray-800 rounded-full flex items-center justify-center mb-4">
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
              <p className="text-gray-600 dark:text-gray-300 mb-1">
                Click or drag and drop photo files to upload
              </p>
              <p className="text-sm text-gray-400 dark:text-gray-500">
                (max 3 photos)
              </p>
            </>
          ) : (
            <div className="w-full">
              <div className="grid grid-cols-3 gap-4 w-full">
                {imagesPreviews.map((preview, index) => (
                  <div key={index} className="relative rounded-lg overflow-hidden">
                    <img 
                      src={preview} 
                      alt={`Preview ${index + 1}`}
                      className="w-full h-24 object-cover"
                    />
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        removeImage(index);
                      }}
                      className="absolute top-2 right-2 w-6 h-6 bg-red-500 text-white rounded-full 
                      flex items-center justify-center text-sm hover:bg-red-600 transition-colors"
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
              {imagesPreviews.length > 0 && (
               <div className="mt-4 p-4 rounded-lg border border-gray-200 dark:border-gray-700 dark:bg-gray-900">
                  <div className="space-y-2">
                    {fileSizes.map((file, index) => (
                      <div key={index} className="flex justify-between text-sm text-gray-600 dark:text-gray-300">
                        <span className="truncate max-w-[200px]">{file.name}</span>
                        <span>{file.size}</span>
                      </div>
                    ))}
                    <div className="pt-2 mt-2 border-t border-gray-200 dark:border-gray-700 flex justify-between text-sm font-medium text-gray-700 dark:text-gray-200">
                      <span>Total Size:</span>
                      <span>{totalSize}</span>
                    </div>
                  </div>
                </div>
              )}
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
              className="w-full px-4 py-3 border-2 border-gray-200 dark:border-gray-700 rounded-[20px] focus:outline-none 
              focus:border-[#6A8270] bg-white dark:bg-gray-800 dark:text-white appearance-none"
              required
            >
              <option value="" key="default">
                Select an activity
              </option>
              {userActivities.map((activity) => (
                <option
                  key={activity._id}
                  value={activity.category}
                >
                  {activity.title} - {activity.category}
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
                className="w-full px-4 py-3 border-2 border-gray-200 dark:border-gray-700 rounded-[20px] focus:outline-none 
                focus:border-[#6A8270] resize-none bg-white dark:bg-gray-800 dark:text-white"
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
                className="w-full px-4 py-3 border-2 border-gray-200 dark:border-gray-700 rounded-[20px] focus:outline-none 
                focus:border-[#6A8270] resize-none bg-white dark:bg-gray-800 dark:text-white"
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
      ref={fileInputRef}
      type="file"
      multiple
      accept="image/*"
      onChange={(e) => handleFileSelect(e.target.files)}
      className="hidden"
    />
  </div>
  );
}