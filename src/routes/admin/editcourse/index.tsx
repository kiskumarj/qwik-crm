import { $, component$, useStore, useTask$ } from "@builder.io/qwik";
import { routeAction$, routeLoader$ } from "@builder.io/qwik-city";
import axios from "axios";
import Sidebar from "~/components/router-head/Sidebar";
interface Course {
  id: number;
  courseName: string;
  Image: string;
  videoLink: string;
  courseDetail: string;
  courseDuration: string;
  teacherName: string;
  Price: number;
}
interface EditCourseStore {
  isEditing: boolean;
  course: Course | null; 
}
export const usegeTTable = routeLoader$(async()=>{
  const res = await axios.get("http://localhost:3000/course")
  const coNtaNt = await res.data
  return coNtaNt 
})

export default component$(() => {
    const daTa = usegeTTable()
    const couRses = useStore({data: daTa.value || []})
    const editCourse = useStore<EditCourseStore>({ isEditing: false, course: null });
    const handleDelete = $(async (courseId: number) => {
      const confirmDelete = window.confirm(`Are you sure you want to delete course with ID: ${courseId}?`);
    
      if (!confirmDelete) return;
    
      try {
        const response = await axios.delete(`http://localhost:3000/course/${courseId}`, {
          headers: {
            'Content-Type': 'application/json',
          },
        });
    
        console.log('Response from server:', response); // Debugging
    
        if (response.status === 200) {
          // Update the local state to remove the deleted course
          couRses.data = couRses.data.filter((course: any) => course.id !== courseId);
          alert('Course deleted successfully');
        } else {
          throw new Error(`Failed to delete course. Status code: ${response.status}`);
        }
      } catch (error) {
        console.error('Error deleting course:', error);
        alert('Error deleting course. Please try again.');
      }
    });
      
      const handleEdit = $(async (courseId: number) => {
        const courseToEdit = couRses.data.find((course: any) => course.id === courseId);
        if (courseToEdit) {
          editCourse.course = { ...courseToEdit }; 
          editCourse.isEditing = courseToEdit; 
        }
      });
      const handleUpdate = $(async () => {
        if (editCourse.course) {
          try {
            const response = await axios.put(`http://localhost:3000/course/${editCourse.course.id}`, editCourse.course, {
              headers: {
                'Content-Type': 'application/json',
              },
            });
    
            if (response.status === 200) {
              // Update the local state with the updated course data
              const index = couRses.data.findIndex(course => course.id === editCourse.course.id);
              couRses.data[index] = response.data;
              alert('Course updated successfully');
              editCourse.isEditing = false; // Close the edit form
              editCourse.course = null; // Reset the course to null
            }
          } catch (error) {
            console.error('Error updating course:', error);
            alert('Error updating course. Please try again.');
          }
        }
      });
    
      useTask$(() => {
        if (daTa.value) {
          couRses.data = daTa.value;
        }
      });
    return(
        <div class="flex  w-screen h-screen bg-gray-100">
        {/* Sidebar */}
        <Sidebar></Sidebar>
  
        {/* Table to display the course data */}
        <div class="flex-1 p-6">
          <h1 class="text-2xl mb-6">Course List</h1>
          <table class="min-w-full table-auto border-collapse border border-gray-400">
            <thead>
              <tr class="bg-gray-200">
              <th class="border border-gray-300 px-4 py-2">Id</th>
                <th class="border border-gray-300 px-4 py-2">Course Name</th>
                <th class="border border-gray-300 px-4 py-2">Image</th>
                <th class="border border-gray-300 px-4 py-2">Video Link</th>
                <th class="border border-gray-300 px-4 py-2">Course Detail</th>
                <th class="border border-gray-300 px-4 py-2">Duration</th>
                <th class="border border-gray-300 px-4 py-2">Teacher</th>
                <th class="border border-gray-300 px-4 py-2">Price</th>
                <th class="border border-gray-300 px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {/* Looping through the course data and displaying it in table rows */}
              {daTa.value?.map((course: any) => (
                <tr key={course.id} class="hover:bg-gray-100">
                    <td class="border border-gray-300 px-4 py-2">{course.id}</td>
                  <td class="border border-gray-300 px-4 py-2">{course.courseName}</td>
                  <td class="border border-gray-300 px-4 py-2">
                    <img src={course.Image} alt={course.courseName} class="h-10 w-10 object-cover" width={100} height={100}/>
                  </td>
                  <td class="border border-gray-300 px-4 py-2">
                    <a href={course.videoLink} class="text-blue-500" target="_blank">Watch Video</a>
                  </td>
                  <td class="border border-gray-300 px-4 py-2">{course.courseDetail}</td>
                  <td class="border border-gray-300 px-4 py-2">{course.courseDuration}</td>
                  <td class="border border-gray-300 px-4 py-2">{course.teacherName}</td>
                  <td class="border border-gray-300 px-4 py-2">{course.Price}</td>
                  <td class="border border-gray-300 px-4 py-2">
                    {/* Edit Button */}
                    <button 
                      onClick$={() => handleEdit(course.id)} 
                      class="text-white bg-blue-500 hover:bg-blue-700 font-bold py-1 px-3 rounded mx-1"
                    >
                      Edit
                    </button>
                    {/* Delete Button */}
                    <button 
                      onClick$={() => handleDelete(course.id)} 
                      class="text-white bg-red-500 hover:bg-red-700 font-bold py-1 px-3 rounded"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    )
})