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
        <Hero />
      </section>

      <section className='bg-white'>
        <TopCategory />
      </section>

      <section className="w-full flex flex-col md:flex-row px-6 md:px-10 bg-white">
        <div className='w-full md:w-[75%]'>
          <LatestBlog />
        </div>
        <div className='w-full md:w-[25%] mt-10 md:mt-0'>
          <TrendingBlog />
        </div>
      </section>

      <section className='pt-10 bg-white'>
        <CategoryBlog />
      </section>
    </>
  )
}

export default page
