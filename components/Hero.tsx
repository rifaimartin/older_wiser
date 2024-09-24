'use client'
import React, { useState } from "react";
import MembershipCard from "./MembershipCard";
import ActivityButton from "./ActivityButton";
import ActivityGrid from "./ActivityGrid";

const Hero = () => {
  const [sortBy, setSortBy] = useState("Person");
  const activities = [
    { title: "Lower Back Pain Exercise", image: "https://30dayfitness.app/static/60b88f3ef35667c3c0fc304c010a4f96/benefits-of-exercises-for-older-adults.jpeg", duration: "20 min", category: "Health & Wellness" },
    { title: "Restorative Yoga", image: "https://30dayfitness.app/static/60b88f3ef35667c3c0fc304c010a4f96/benefits-of-exercises-for-older-adults.jpeg", duration: "30 min", category: "Health & Wellness" },
    { title: "Yoga Chair", image: "https://30dayfitness.app/static/60b88f3ef35667c3c0fc304c010a4f96/benefits-of-exercises-for-older-adults.jpeg", duration: "25 min", category: "Health & Wellness" },
    { title: "Meditation Basics", image: "https://30dayfitness.app/static/60b88f3ef35667c3c0fc304c010a4f96/benefits-of-exercises-for-older-adults.jpeg", duration: "15 min", category: "Health & Wellness" },
    { title: "Banana Fritters", image: "https://blog.smarthealthshop.com/wp-content/uploads/2019/01/5-Ways-Healthy-Cooking-Classes-Can-Help-With-Your-Diet.jpg", duration: "30 min", category: "Cooking" },
    { title: "Chicken Yakisoba", image: "https://blog.smarthealthshop.com/wp-content/uploads/2019/01/5-Ways-Healthy-Cooking-Classes-Can-Help-With-Your-Diet.jpg", duration: "45 min", category: "Cooking" },
    { title: "Tomato Soup", image: "https://blog.smarthealthshop.com/wp-content/uploads/2019/01/5-Ways-Healthy-Cooking-Classes-Can-Help-With-Your-Diet.jpg", duration: "25 min", category: "Cooking" },
    { title: "Chicken Wontons", image: "https://blog.smarthealthshop.com/wp-content/uploads/2019/01/5-Ways-Healthy-Cooking-Classes-Can-Help-With-Your-Diet.jpg", duration: "40 min", category: "Cooking" },
    { title: "Checkered Crochet Bag", image: "https://www.bria.com.ph/wp-content/uploads/2023/01/Pottery-in-Manila.png", duration: "2 hours", category: "Art & Crafts" },
    { title: "Crepe Paper Flower", image: "https://www.bria.com.ph/wp-content/uploads/2023/01/Pottery-in-Manila.png", duration: "1 hour", category: "Art & Crafts" },
    { title: "Sunflower Vase", image: "https://www.bria.com.ph/wp-content/uploads/2023/01/Pottery-in-Manila.png", duration: "1.5 hours", category: "Art & Crafts" },
    { title: "Abstract Line Painting", image: "https://www.bria.com.ph/wp-content/uploads/2023/01/Pottery-in-Manila.png", duration: "1 hour", category: "Art & Crafts" },
  ];

  const categories = ["Health & Wellness", "Cooking", "Art & Crafts"];

  return (
    <div className="mx-auto my-8 max-w-7xl">
      <div
        className="relative h-[500px] w-full bg-cover bg-center rounded-3xl overflow-hidden"
        style={{
          backgroundImage:
            "url('https://www.focusonthefamily.com/wp-content/uploads/2019/11/stocksy_2068719_back-in-town-1.jpg')",
          backgroundPosition: "center 10%",
        }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-40"></div>
        <div className="absolute bottom-12 left-12 max-w-xl text-white text-left">
          <h1 className="text-4xl font-bold mb-4 text-gray-300">
            Discover more.
          </h1>
          <h2 className="text-4xl font-bold mb-4 text-gray-300">
            Older Wiser.
          </h2>
          <p className="text-lg font-light mb-6 text-gray-400 leading-relaxed">
            Indonesia's digital platform that can help <br /> everyone growing.
            Remember family is <br /> everything.
          </p>
          <button className="bg-green-700 hover:bg-green-600 text-white font-bold py-2 px-6 rounded-full">
            START NOW!
          </button>
        </div>
      </div>
      <MembershipCard />
      <div className="mt-8">
        <h3 className="text-2xl font-bold mb-4 text-center">Activities</h3>
        <div className="flex justify-center space-x-4">
          {categories.map((category) => (
            <ActivityButton key={category} label={category.toUpperCase()} />
          ))}
        </div>
      </div>
      <div className="relative mt-4">
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="appearance-none bg-white border border-gray-300 rounded-full py-2 px-4 pr-8 leading-tight focus:outline-none focus:border-gray-500"
        >
          <option>Sort by: Person</option>
          <option>Sort by: Date</option>
          <option>Sort by: Popular</option>
        </select>
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
          <svg
            className="fill-current h-4 w-4"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
          >
            <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
          </svg>
        </div>
      </div>
      {categories.map((category) => (
        <ActivityGrid
          key={category}
          title={category}
          activities={activities.filter((activity) => activity.category === category)}
        />
      ))}
      <div className="text-center mt-4">
        <button className="text-green-600 hover:text-green-700 font-semibold">
          See more...
        </button>
      </div>
    </div>
  );
};

export default Hero;