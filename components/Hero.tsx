"use client";
import React, { useState } from "react";
import MembershipCard from "./MembershipCard";
import ActivityButton from "./ActivityButton";
import ActivityGrid from "./ActivityGrid";
import ReviewCard from "./RiviewCard";

import dynamic from 'next/dynamic';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Hero = () => {
  const Slider = dynamic(() => import('react-slick'), { ssr: false });
  const [sortBy, setSortBy] = useState("Person");
  const reviews = [
    {
      name: "Keith K.",
      initialLetter: "K",
      rating: 5,
      daysAgo: 4,
      avatarUrl: "", // Optional
      titleComment: "Very informative and useful!",
      comment:
        "Really great site with lots of useful ideas. I have recommended it so mu...",
    },
    {
      name: "William",
      initialLetter: "W",
      rating: 4,
      daysAgo: 5,
      titleComment: "Great Website.",
      comment:
        "Excellent site giving all sorts of useful information for mostly older people.",
    },
    {
      name: "Hollis",
      initialLetter: "H",
      rating: 5,
      daysAgo: 6,
      titleComment: "Fantastic and Relevant.",
      comment:
        "Great website, full of interesting and informative articles and great recipes.",
    },
  ];
  const activities = [
    {
      title: "Pull Up Exercise",
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
      title: "Sunflower Vase",
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

  const slides = [
    // Slide 1 - Main Hero
    <div className="relative h-[400px] w-full bg-cover rounded-3xl overflow-hidden">
      <img
        src="https://www.focusonthefamily.com/wp-content/uploads/2019/11/stocksy_2068719_back-in-town-1.jpg"
        alt="Family"
        className="w-full h-full object-cover object-top" // Ubah object-center ke object-top
      />
      <div className="absolute inset-0 bg-black bg-opacity-30" />
      <div className="absolute bottom-16 left-12 max-w-xl">
        {" "}
        <h1 className="text-4xl font-bold mb-3 text-white">
          {" "}
          Discover more.
        </h1>
        <h1 className="text-4xl font-bold mb-3 text-white">
          {" "}
          Older Wiser.
        </h1>
       
        {/* <button className="bg-[#6A8270] hover:bg-[#7c9884] text-white font-semibold py-2 px-6 rounded-full text-sm">
          {" "}
          START NOW!
        </button> */}
      </div>
    </div>,

    // Slide 2 - Membership
    <div className="relative h-[400px] w-full bg-cover bg-center rounded-3xl overflow-hidden">
      <img
        src="https://www.lv8bali.com/wp-content/uploads/2021/09/FAMTASTIC.jpg"
        alt="Membership"
        className="w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-black bg-opacity-40" />

      {/* Content Container with divider */}
      <div className="absolute inset-0 flex items-center">
        {/* Left Content */}
        <div className="flex-1 pl-12">
          <div className="text-yellow-400 text-6xl mb-6">
            {" "}
            {/* Increased icon size */}
            👑
          </div>
          <h2 className="text-2xl font-normal text-white mb-2">
            Become a member for
          </h2>
          <h3 className="text-4xl font-bold text-white">Unlimited Access</h3>
          <button className="bg-[#6A8270] hover:bg-[#7c9884] text-white font-semibold py-2 px-6 rounded-full text-sm mt-6">
            JOIN NOW!
          </button>
        </div>

        {/* Center Divider */}
        <div className="w-px h-60 bg-white/50 mx-8" />

        {/* Right Content */}
        <div className="flex-1 pr-12">
          <h4 className="text-4xl font-bold text-white mb-6">
            Rp 39.000<span className="text-xl font-normal">/month</span>
          </h4>
          <ul className="text-white space-y-3 text-lg">
            <li>• Unlock more exciting activities.</li>
            <li>• Gain more points from finishing activities.</li>
            <li>• Claim points to get Exclusive Voucher.</li>
            <li>• Upgrade your "Member" badges.</li>
          </ul>
        </div>
      </div>
    </div>,

    // Slide 3 - Weekly Activity
    <div className="relative h-[400px] w-full bg-cover bg-center rounded-3xl overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-white/90">
        {" "}
        {/* Gradient overlay */}
        <img
          src="https://w0.peakpx.com/wallpaper/127/305/HD-wallpaper-white-flowers-branches-in-white-background-white-aesthetic.jpg"
          alt="Weekly Activity"
          className="w-full h-full object-cover object-left" // Align image to left
        />
      </div>

      {/* Content - Aligned to right */}
      <div className="absolute right-12 top-1/2 -translate-y-1/2 text-right">
        <h2 className="text-3xl font-bold text-black mb-2">
          Weekly Top Activity :
        </h2>
        <h3 className="text-4xl font-bold text-black mb-8">
          Crepe Paper Flower
        </h3>
        <button
          className="bg-[#6A8270] hover:bg-[#7c9884] text-white font-semibold 
     py-2 px-8 rounded-full text-sm inline-flex items-center gap-2"
        >
          <svg
            className="w-4 h-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.347a1.125 1.125 0 0 1 0 1.972l-11.54 6.347c-.75.412-1.667-.13-1.667-.986V5.653Z"
            />
          </svg>
          PLAY
        </button>
      </div>
    </div>,
  ];

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    fade: true,
  };

  const categories = ["Health & Wellness", "Cooking", "Art & Crafts"];

  return (
    <div className="mx-auto my-8 max-w-7xl px-4">
      <Slider {...settings}>
        {slides.map((slide, index) => (
          <div key={`slide-${index}`}>
            {" "}
            {/* Tambahkan key yang unik */}
            {slide}
          </div>
        ))}
      </Slider>

      {/* <MembershipCard /> */}
      <div className="flex flex-col items-center gap-8 my-8">
        <h2 className="text-2xl font-semibold dark:text-white">
          Activity Categories
        </h2>

        <div className="flex justify-center gap-4">
          {categories.map((category) => (
            <button
              key={category}
              className="px-8 py-2 rounded-full border-2 border-[#6A8270] text-[#6A8270] hover:bg-[#6A8270] hover:text-white transition-colors"
            >
              {category.toUpperCase()}
            </button>
          ))}
        </div>
      </div>
      <div className="space-y-12 px-4 mt-8">
        {/* Sort dropdown */}
        <div className="flex justify-end">
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="appearance-none bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 
     rounded-full py-2 px-4 pr-8 leading-tight focus:outline-none focus:border-gray-500 
     dark:text-white transition-colors duration-200"
          >
            <option>Sort by: Person</option>
            <option>Sort by: Date</option>
            <option>Sort by: Popular</option>
          </select>
        </div>
      </div>

      {categories.map((category) => (
        <div key={category}>
          <ActivityGrid
            title={category}
            activities={activities.filter(
              (activity) => activity.category === category
            )}
          />
        </div>
      ))}

      <div className="py-8">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold text-center mb-6 dark:text-white">
            What people say about Older Wiser
          </h1>
          <div className="relative">
            <div className="grid grid-cols-3 gap-6 max-w-6xl mx-auto px-4">
              {reviews.map((review, index) => (
                <div key={index}>
                  <ReviewCard {...review} />
                </div>
              ))}
            </div>
          </div>
          <div className="text-right mt-6">
            <a
              href="#"
              className="text-blue-500 dark:text-blue-400 hover:underline text-sm transition-colors duration-200"
            >
              See more reviews...
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
