import React from 'react'
import Hero from '../components/Hero'
import CourseGrid from '../components/CourseGrid.jsx'
// import CourseData from '../data/courses.json'
import { TopCouses } from '../components/TopCouses.jsx'
import ViewCourses from '../components/ViewCourses.jsx'
import MainLayout from '../layout/MainLayout.jsx'


const Home = () => {
    const topCourses = CourseData.slice(0, 3);
    return (
        <>
            <MainLayout>
                <Hero />
                <TopCouses />
                <CourseGrid courses={topCourses} />
                <ViewCourses />
            </MainLayout>
        </>
    )
}

export default Home