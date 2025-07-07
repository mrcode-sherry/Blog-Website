import React from 'react'
import Hero from "@/components/Hero";
import LatestBlog from "@/components/LatestBlog";
import TrendingBlog from "@/components/TrendingBlog";
import CategoryBlog from "@/components/CategoryBlog";
import TopCategory from "@/components/TopCategory";

const page = () => {
  return (
    <>
    <section className='mt-20'>
      <Hero/>
    </section>
    <section>
      <TopCategory/>
    </section>
    <section className="w-full flex flex-col md:flex-row md:px-14">
      <LatestBlog />
      <TrendingBlog />
    </section>
    <section className='mt-10'>
      <CategoryBlog/>
    </section>
    </>
  )
}

export default page
