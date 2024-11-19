import React from 'react'
import MainLayout from '../layout/MainLayout'
import CourseGrid from '../components/CourseGrid'
import CourseData from '../data/courses.json'

export const Courses = () => {
  return (
    <>
    <MainLayout>
        <h1></h1>
        <CourseGrid courses={CourseData}/>
    </MainLayout>
    </>
  )
}
