"use client";
import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { API_BASE_URL } from "@/constants";
import { useParams } from "next/navigation";

interface ActivityDetail {
  id: string;
  title: string;
  image: string;
  duration: string;
  category: string;
  description: string;
  difficulty: string;
  email: string;
  materials: string[];
  steps: string[];
  createdBy: {
    name: string;
    imageUrl?: string;
  };
  likes: number;
  createdAt: string;
}

export default function ActivityDetailPage() {
  const params = useParams();
  const [activity, setActivity] = useState<ActivityDetail | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [imageSize, setImageSize] = useState<string>("");
  const [isDownloading, setIsDownloading] = useState(false);

  // Fungsi untuk konversi bytes ke MB
  const formatBytes = (bytes: number): string => {
    const mb = bytes / (1024 * 1024);
    return `${mb.toFixed(2)} MB`;
  };

  const handleDownload = async () => {
    if (!activity) return; // Early return if activity is null

    try {
      setIsDownloading(true);

      // Get filename from image URL
      const filename = activity.image.split("/").pop();

      const response = await fetch(
        `${API_BASE_URL}/activities/download/${filename}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (!response.ok) throw new Error("Download failed");

      response.headers.forEach((value, key) => {
        console.log(`${key}: ${value}`);
      });

      const headerObj = Object.fromEntries(response.headers);
      console.log("Headers as object:", headerObj);

      console.log("Content-Length:", response.headers.get("content-length"));
      console.log("X-File-Size:", response.headers.get("x-file-size"));

      // use content length if x file size is null
      const fileSize =
        response.headers.get("content-length") ||
        response.headers.get("x-file-size");

      if (fileSize) {
        const sizeInMB = formatBytes(parseInt(fileSize));
        setImageSize(sizeInMB);
      }
      // Download file
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `${activity.title
        .toLowerCase()
        .replace(/\s+/g, "-")}.jpg`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Download error:", error);
    } finally {
      setIsDownloading(false);
    }
  };
  useEffect(() => {
    const fetchActivityDetail = async () => {
      try {
        const response = await fetch(
          `${API_BASE_URL}/activities/${params.id}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        if (!response.ok) throw new Error("Failed to fetch activity");

        const data = await response.json();
        setActivity(data.data);
      } catch (error) {
        setError("Failed to load activity details");
        console.error("Error:", error);
      } finally {
        setIsLoading(false);
      }
    };

    if (params.id) {
      fetchActivityDetail();
    }
  }, [params.id]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#6A8270]" />
      </div>
    );
  }

  if (error || !activity) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-red-500">{error || "Activity not found"}</div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Hero Section */}
      <div className="relative aspect-video w-full mb-8">
        <Image
          src={`${API_BASE_URL}${activity.image}`}
          alt={activity.title}
          fill
          className="object-cover rounded-2xl"
        />
 
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-6">
          <div className="flex items-center justify-between text-white">
            <div>
              <span className="inline-block px-3 py-1 bg-[#6A8270] rounded-full text-sm mb-2">
                {activity.category}
              </span>
              <h1 className="text-3xl font-bold">{activity.title}</h1>
            </div>
            <button className="flex items-center space-x-1 bg-white/20 px-4 py-2 rounded-full hover:bg-white/30 transition-all">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
              </svg>
              <span>{activity.likes}</span>
            </button>
          </div>
        </div>
      </div>
 
      {/* Creator Info & Download Button */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 rounded-full overflow-hidden bg-gray-200">
            {activity.createdBy.imageUrl ? (
              <Image
                src={`${API_BASE_URL}${activity.createdBy.imageUrl}`}
                alt={activity.createdBy.name}
                width={48}
                height={48}
                className="object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-lg font-semibold text-gray-600">
                {activity.email}
              </div>
            )}
          </div>
          <div>
            <h3 className="font-medium">{activity.createdBy.name}</h3>
            <p className="text-sm text-gray-500">
              {new Date(activity.createdAt).toLocaleDateString()}
            </p>
          </div>
        </div>
 
        <div className="flex items-center gap-4">
          {imageSize && (
            <span className="text-sm text-gray-500">Size: {imageSize}</span>
          )}
          <button
            onClick={handleDownload}
            disabled={isDownloading}
            className="flex items-center gap-2 px-4 py-2 bg-[#6A8270] text-white rounded-full hover:bg-[#5a7260] disabled:opacity-50"
          >
            {isDownloading ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                Downloading...
              </>
            ) : (
              <>
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                  />
                </svg>
                Download
              </>
            )}
          </button>
        </div>
      </div>
 
      {/* Activity Info */}
      <div className="grid grid-cols-2 gap-4 mb-8">
        <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
          <h3 className="font-medium mb-2 dark:text-white">Duration</h3>
          <p className="text-gray-600 dark:text-gray-300">
            {activity.duration}
          </p>
        </div>
        <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
          <h3 className="font-medium mb-2 dark:text-white">Difficulty</h3>
          <p className="text-gray-600 dark:text-gray-300">
            {activity.difficulty}
          </p>
        </div>
      </div>
 
      {/* Description */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4 dark:text-white">
          Description
        </h2>
        <p className="text-gray-600 dark:text-gray-300">
          {activity.description}
        </p>
      </div>
 
      {/* Materials */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4 dark:text-white">
          Materials Needed
        </h2>
        <ul className="list-disc list-inside space-y-2">
          {activity.materials.map((material, index) => (
            <li key={index} className="text-gray-600 dark:text-gray-300">
              {material}
            </li>
          ))}
        </ul>
      </div>
 
      {/* Steps */}
      <div>
        <h2 className="text-xl font-semibold mb-4 dark:text-white">Steps</h2>
        <div className="space-y-4">
          {activity.steps.map((step, index) => (
            <div key={index} className="flex space-x-4">
              <div className="w-8 h-8 bg-[#6A8270] text-white rounded-full flex items-center justify-center flex-shrink-0">
                {index + 1}
              </div>
              <p className="text-gray-600 dark:text-gray-300 pt-1">{step}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
