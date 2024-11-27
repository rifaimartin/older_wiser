"use client";
import { useState } from "react";
import { API_BASE_URL } from "@/constants";

interface ActivityFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export const ActivityFormModal = ({
  isOpen,
  onClose,
  onSuccess,
}: ActivityFormModalProps) => {
  const [formData, setFormData] = useState({
    title: "",
    category: "Art & Crafts",
    description: "",
    duration: "",
    difficulty: "Beginner",
    materials: [""],
    steps: [""],
  });
  const [image, setImage] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const categories = ["Art & Crafts", "Cooking", "Health & Wellness"];
  const difficultyLevels = ["Beginner", "Intermediate", "Advanced"];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      // Upload image first
      const imageUrl = await handleImageUpload();

      // Create activity with JSON
      const token = localStorage.getItem("token");
      const response = await fetch(`${API_BASE_URL}/activities/create`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          image: imageUrl, // Use uploaded image URL
          materials: formData.materials.filter((m) => m.trim()), // Remove empty materials
          steps: formData.steps.filter((s) => s.trim()), // Remove empty steps
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to create activity");
      }

      onSuccess();
      onClose();
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to create activity"
      );
    } finally {
      setIsLoading(false);
    }
  };

  // Separate function for image upload
  const handleImageUpload = async (): Promise<string> => {
    if (!image) {
      throw new Error("Image is required");
    }

    const formData = new FormData();
    formData.append("image", image);

    const token = localStorage.getItem("token");
    const response = await fetch(`${API_BASE_URL}/activities/upload`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    });

    if (!response.ok) {
      throw new Error("Failed to upload image");
    }

    const data = await response.json();
    return data.data.path; // Return image path from server
  };
  const addField = (field: "materials" | "steps") => {
    setFormData((prev) => ({
      ...prev,
      [field]: [...prev[field], ""],
    }));
  };

  const removeField = (field: "materials" | "steps", index: number) => {
    setFormData((prev) => ({
      ...prev,
      [field]: prev[field].filter((_, i) => i !== index),
    }));
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6 space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">Add New Activity</h2>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Title */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Title
              </label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
                }
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#6A8270] focus:ring-[#6A8270]"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Description
              </label>
              <input
                type="text"
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#6A8270] focus:ring-[#6A8270]"
                required
              />
            </div>

            {/* Category */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Category
              </label>
              <select
                value={formData.category}
                onChange={(e) =>
                  setFormData({ ...formData, category: e.target.value })
                }
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#6A8270] focus:ring-[#6A8270]"
              >
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>

            {/* Duration */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Duration
              </label>
              <input
                type="text"
                value={formData.duration}
                onChange={(e) =>
                  setFormData({ ...formData, duration: e.target.value })
                }
                placeholder="e.g., 30 minutes"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#6A8270] focus:ring-[#6A8270]"
                required
              />
            </div>

            {/* Difficulty */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Difficulty
              </label>
              <select
                value={formData.difficulty}
                onChange={(e) =>
                  setFormData({ ...formData, difficulty: e.target.value })
                }
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#6A8270] focus:ring-[#6A8270]"
              >
                {difficultyLevels.map((level) => (
                  <option key={level} value={level}>
                    {level}
                  </option>
                ))}
              </select>
            </div>

            {/* Image */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Image
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => setImage(e.target.files?.[0] || null)}
                className="mt-1 block w-full"
                required
              />
            </div>

            {/* Materials */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Materials
              </label>
              {formData.materials.map((material, index) => (
                <div key={index} className="flex gap-2 mt-2">
                  <input
                    type="text"
                    value={material}
                    onChange={(e) => {
                      const newMaterials = [...formData.materials];
                      newMaterials[index] = e.target.value;
                      setFormData({ ...formData, materials: newMaterials });
                    }}
                    className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-[#6A8270] focus:ring-[#6A8270]"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => removeField("materials", index)}
                    className="text-red-500"
                  >
                    Remove
                  </button>
                </div>
              ))}
              <button
                type="button"
                onClick={() => addField("materials")}
                className="mt-2 text-sm text-[#6A8270]"
              >
                + Add Material
              </button>
            </div>

            {/* Steps */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Steps
              </label>
              {formData.steps.map((step, index) => (
                <div key={index} className="flex gap-2 mt-2">
                  <input
                    type="text"
                    value={step}
                    onChange={(e) => {
                      const newSteps = [...formData.steps];
                      newSteps[index] = e.target.value;
                      setFormData({ ...formData, steps: newSteps });
                    }}
                    className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-[#6A8270] focus:ring-[#6A8270]"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => removeField("steps", index)}
                    className="text-red-500"
                  >
                    Remove
                  </button>
                </div>
              ))}
              <button
                type="button"
                onClick={() => addField("steps")}
                className="mt-2 text-sm text-[#6A8270]"
              >
                + Add Step
              </button>
            </div>

            {error && <div className="text-red-500 text-sm">{error}</div>}

            <div className="flex justify-end gap-3">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                disabled={isLoading}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-[#6A8270] text-white rounded-md hover:bg-[#5a7260] disabled:opacity-50"
                disabled={isLoading}
              >
                {isLoading ? "Creating..." : "Create Activity"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
