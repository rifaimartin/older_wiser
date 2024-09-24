import React from "react";

const MembershipCard = () => {
  return (
    <div className="mx-auto my-8 p-8 border-2 border-green-800 rounded-3xl ">
      <div className="flex flex-col md:flex-row justify-between items-center">
        <div className="mb-4 md:mb-0">
          <h2 className="text-2xl font-semibold mb-2">Become a member for</h2>
          <h3 className="text-3xl font-bold">Unlimited Access</h3>
          <button className="bg-green-700 hover:bg-green-600 text-white font-semibold py-2 px-6 rounded-full">
            Join now!
          </button>
        </div>
      </div>
      <div className="mt-6 text-right">
        <p className="text-gray-600 italic">
          "Thank you so much - I love the site, it has been so helpful and I'm
          glad I joined!"
        </p>
        <p className="text-gray-500 mt-2">Kalee Wijiaya</p>
      </div>
    </div>
  );
};

export default MembershipCard;
