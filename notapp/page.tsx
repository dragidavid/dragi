"use client";
// Import your Client Component
// import HomePage from './HomePage';

import Box from "components/Box";
import MainLayout from "components/MainLayout";
import MotionMain from "components/MotionMain";
import NewGrid from "components/NewGrid";
import { motion } from "framer-motion";

// async function getPosts() {
//   const res = await fetch('https://...');
//   const posts = await res.json();
//   return posts;
// }

export default function Page() {
  // Fetch data directly in a Server Component
  // const recentPosts = await getPosts();
  // Forward fetched data to your Client Component
  return <Box title="Home" />;
}
