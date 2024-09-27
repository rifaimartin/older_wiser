"use client";
import React, { useState } from "react";
import MembershipCard from "./MembershipCard";
import ActivityButton from "./ActivityButton";
import ActivityGrid from "./ActivityGrid";
import ReviewCard from "./RiviewCard";

const Hero = () => {
  const [sortBy, setSortBy] = useState("Person");
  const reviews = [
    {
      name: "Keith K.",
      initialLetter: "K",
      rating: 5,
      daysAgo: 4,
      comment:
        "Very informative and useful! Really great site with lots of useful ideas. I have recommended it so mu...",
    },
    {
      name: "William",
      initialLetter: "W",
      rating: 4,
      daysAgo: 5,
      comment:
        "Great Website. Excellent site giving all sorts of useful information for mostly older people.",
    },
    {
      name: "Hollis",
      initialLetter: "H",
      rating: 5,
      daysAgo: 6,
      comment:
        "Fantastic and Relevant. Great website, full of interesting and informative articles and great recipes.",
    },
    {
      name: "Hollis",
      initialLetter: "H",
      rating: 5,
      daysAgo: 6,
      comment:
        "Fantastic and Relevant. Great website, full of interesting and informative articles and great recipes.",
    },
    {
      name: "Hollis",
      initialLetter: "H",
      rating: 5,
      daysAgo: 6,
      comment:
        "Fantastic and Relevant. Great website, full of interesting and informative articles and great recipes.",
    },
    {
      name: "Hollis",
      initialLetter: "H",
      rating: 5,
      daysAgo: 6,
      comment:
        "Fantastic and Relevant. Great website, full of interesting and informative articles and great recipes.",
    },
  ];
  const activities = [
    {
      title: "Lower Back Pain Exercise",
      image:
        "https://30dayfitness.app/static/60b88f3ef35667c3c0fc304c010a4f96/benefits-of-exercises-for-older-adults.jpeg",
      duration: "20 min",
      category: "Health & Wellness",
    },
    {
      title: "Restorative Yoga",
      image:
        "https://30dayfitness.app/static/60b88f3ef35667c3c0fc304c010a4f96/benefits-of-exercises-for-older-adults.jpeg",
      duration: "30 min",
      category: "Health & Wellness",
    },
    {
      title: "Yoga Chair",
      image:
        "https://30dayfitness.app/static/60b88f3ef35667c3c0fc304c010a4f96/benefits-of-exercises-for-older-adults.jpeg",
      duration: "25 min",
      category: "Health & Wellness",
    },
    {
      title: "Meditation Basics",
      image:
        "https://30dayfitness.app/static/60b88f3ef35667c3c0fc304c010a4f96/benefits-of-exercises-for-older-adults.jpeg",
      duration: "15 min",
      category: "Health & Wellness",
    },
    {
      title: "Banana Fritters",
      image:
        "https://blog.smarthealthshop.com/wp-content/uploads/2019/01/5-Ways-Healthy-Cooking-Classes-Can-Help-With-Your-Diet.jpg",
      duration: "30 min",
      category: "Cooking",
    },
    {
      title: "Chicken Yakisoba",
      image:
        "https://blog.smarthealthshop.com/wp-content/uploads/2019/01/5-Ways-Healthy-Cooking-Classes-Can-Help-With-Your-Diet.jpg",
      duration: "45 min",
      category: "Cooking",
    },
    {
      title: "Tomato Soup",
      image:
        "https://blog.smarthealthshop.com/wp-content/uploads/2019/01/5-Ways-Healthy-Cooking-Classes-Can-Help-With-Your-Diet.jpg",
      duration: "25 min",
      category: "Cooking",
    },
    {
      title: "Chicken Wontons",
      image:
        "https://blog.smarthealthshop.com/wp-content/uploads/2019/01/5-Ways-Healthy-Cooking-Classes-Can-Help-With-Your-Diet.jpg",
      duration: "40 min",
      category: "Cooking",
    },
    {
      title: "Checkered Crochet Bag",
      image:
        "https://www.bria.com.ph/wp-content/uploads/2023/01/Pottery-in-Manila.png",
      duration: "2 hours",
      category: "Art & Crafts",
    },
    {
      title: "Crepe Paper Flower",
      image:
        "https://www.bria.com.ph/wp-content/uploads/2023/01/Pottery-in-Manila.png",
      duration: "1 hour",
      category: "Art & Crafts",
    },
    {
      title: "Sunflower Vase",
      image:
        "https://www.bria.com.ph/wp-content/uploads/2023/01/Pottery-in-Manila.png",
      duration: "1.5 hours",
      category: "Art & Crafts",
    },
    {
      title: "Abstract Line Painting",
      image:
        "https://www.bria.com.ph/wp-content/uploads/2023/01/Pottery-in-Manila.png",
      duration: "1 hour",
      category: "Art & Crafts",
    },
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
          activities={activities.filter(
            (activity) => activity.category === category
          )}
        />
      ))}
      <div className="text-right mt-4">
        <button className="text-green-600 hover:text-green-700 font-semibold">
          See more...
        </button>
      </div>
      
      <div className="py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold text-center mb-6">What people say about Older Wiser</h1>
        <div className="relative">
          <div className="flex overflow-x-auto pb-4 -mx-4 px-4 space-x-4 scrollbar-hide">
            {reviews.map((review, index) => (
              <div key={index} className="flex-none w-64">
                <ReviewCard {...review} />
              </div>
            ))}
          </div>
        </div>
        <div className="text-right mt-6">
          <a href="#" className="text-blue-500 hover:underline text-sm">See more reviews...</a>
        </div>
      </div>
    </div>
      </div>
  );
};

export default Hero;
