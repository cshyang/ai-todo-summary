"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import Avatar from "react-avatar";
import TaskSummary from "./TaskSummary";
import { useBoardStore } from "@/store/BoardStore";

function Header() {
  const [searchString, setSearchString] = useBoardStore((state) => [
    state.searchString,
    state.setSearchString,
  ]);
  return (
    <header>
      <div className="bg-gray-400/10 rounded-b-2xl">
        <div className="flex flex-col md:flex-row items-center md:justify-between md:container md:mx-auto p-8">
          {/* Gradient Background */}
          <div className="absolute top-0 left-0 w-full h-3/6 bg-gradient-to-br from-blue-800 to-pink-300 rounded-md filter blur-3xl opacity-50 -z-50" />
          <Image
            src="https://links.papareact.com/c2cdd5"
            alt="Trello logo"
            width={300}
            height={300}
            className="w-44 md:w-56 pb-8 md:pb-0 object-contain"
          />
          <div className="flex space-x-5 items-center">
            <form className="flex items-center space-x-5 bg-white rounded-md py-1 px-2 shadow-md flex-1 md:flex-initial">
              <MagnifyingGlassIcon className="w-6 text-gray-400" />
              <input
                type="text"
                placeholder="Search"
                className="flex-1 outline-none p-2"
                value={searchString}
                onChange={(e) => setSearchString(e.target.value)}
              />
              <button type="submit" hidden>
                Search
              </button>
            </form>
            <Avatar name="CS" githubHandle="cshyang" size="40" round="50px" />
          </div>
        </div>
      </div>
      <TaskSummary />
    </header>
  );
}

export default Header;
