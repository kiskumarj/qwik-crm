import { $, component$, useSignal, useStore, } from "@builder.io/qwik";
import type { DocumentHead, } from "@builder.io/qwik-city";
import Navbar from "~/components/router-head/Navbar";
import { routeLoader$ } from "@builder.io/qwik-city";
import { Modal } from "~/components/router-head/Modal";
import axios from "axios";


export const useGETdata = routeLoader$(async () => {
  const Req = await axios.get("http://localhost:3000/course")
  const Res = await Req.data
  return Res
})
interface course {
  courseName: string;
  Image: string;
  videoLink: string;
  courseDetail: string;
  courseDuration: string;
  teacherName: string;
  Price: number;
}
interface Blog {
  name: string;
  details: string;
}

const BlOg: Blog[] = [
  {
    name: "JavaScript",
    details: "JavaScript is a versatile, high-level programming language primarily used for web development. It allows developers to create dynamic and interactive content for websites."
  },
  {
    name: "Python",
    details: "Python is a powerful and easy-to-learn programming language known for its readability and wide range of applications, including web development, data analysis, and machine learning."
  },
  {
    name: "Java",
    details: "Java is a class-based, object-oriented programming language designed to have as few implementation dependencies as possible, making it widely used for building cross-platform applications."
  },
  {
    name: "C++",
    details: "C++ is an extension of the C programming language, providing object-oriented features. It's commonly used in system/software development, game development, and competitive programming."
  },
  {
    name: "C#",
    details: "C# is a programming language developed by Microsoft as part of its .NET initiative. It's primarily used for building Windows applications and enterprise software."
  },
  {
    name: "Ruby",
    details: "Ruby is a dynamic, open-source programming language with a focus on simplicity and productivity. It has an elegant syntax and is popular for web development, particularly with the Ruby on Rails framework."
  },
  {
    name: "PHP",
    details: "PHP is a server-side scripting language designed for web development but also used as a general-purpose programming language. It's widely used to build dynamic websites and applications."
  },
  {
    name: "Go (Golang)",
    details: "Go is a statically typed, compiled programming language developed by Google. It's known for its simplicity, efficiency, and concurrency support, making it ideal for building scalable, fast applications."
  },
  {
    name: "Swift",
    details: "Swift is a powerful programming language developed by Apple for building iOS, macOS, watchOS, and tvOS applications. It's designed to be fast, safe, and easy to use."
  },
  {
    name: "TypeScript",
    details: "TypeScript is a superset of JavaScript that adds static types. It helps developers write safer, more maintainable code and is widely used in large-scale JavaScript applications."
  }
];
export default component$(() => {
  const DaTa = useGETdata()
  const sTore = useStore<{ data: any, selectedCourse: course | null }>({ data: DaTa.value || [], selectedCourse: null })
  const searchQuery = useSignal('');
  const showModal = useSignal(false);
  const blogStore = useStore<{ selectedBlog: any | null }>({
    selectedBlog: ''
  });
  const openModal$ = $((course: any) => {
    sTore.selectedCourse = course;
    showModal.value = true;
  });
  const openBlogModal = $((blog: Blog) => {
    blogStore.selectedBlog = blog;
    showModal.value = true;
  });
  // Function to close the modal
  const closeModal$ = $(() => {
    showModal.value = false;
    sTore.selectedCourse = null;
  });
  const handleSearchChange$ = $((event: Event) => {
    const target = event.target as HTMLInputElement;
    searchQuery.value = target.value.toLowerCase();
  });


  const filteredCourses = sTore.data.filter((course: any) =>
    course.courseName.toLowerCase().includes(searchQuery.value)
  );

  return (
    <div class="w-full h-screen">
      <Navbar />
      <div class="flex flex-col items-center justify-center mt-8">
        <h1 class="text-4xl font-thin text-gray-800 mb-6">Knowledge in your Hands...!</h1>
        <div>
          <input
            type="search"
            placeholder="Search..."
            class="w-[750px] h-12 p-4 border border-gray-300 rounded-full text-lg focus:outline-none focus:ring-2 "
            onInput$={handleSearchChange$}
          /><br></br>
        </div>
      </div>
      <br></br>
      <h1 class="text-2xl font-thin flex ml-[100px]">Courses</h1>
      <br></br>

      {/* Courses Display Section */}
      <div class="w-full flex flex-wrap justify-around">
        {filteredCourses?.map((course: any) => (
          <div key={course.id} class="w-[250px] h-[400px] bg-white rounded-2xl shadow-lg flex flex-col items-center p-4 m-4 cursor-pointer" onClick$={() => openModal$(course)}>
            {/* Course Image */}
            <img
              src={course.Image}
              alt={course.courseName}
              class="w-full h-[150px] object-cover rounded-t-lg"
              width={150} height={150}
            />
            {/* Course Name */}
            <h2 class="text-lg font-semibold mt-4">{course.courseName}</h2>
            {/* Teacher Name */}
            <p class="text-sm text-gray-600 mt-2">By {course.teacherName}</p>
            {/* Course Duration */}
            <p class="text-sm text-gray-600 mt-1">Duration: {course.courseDuration}</p>
            {/* Course Price */}
            <p class="text-lg font-bold text-green-500 mt-3">${course.Price}</p>
          </div>
        ))}
      </div><br></br>
      {showModal.value && sTore.selectedCourse && (
        <Modal onClose$={closeModal$}>
          <div q:slot="video">
            <iframe
              class="w-full h-56"
              src={sTore.selectedCourse.videoLink}
              title="Course Video"
              allowFullscreen
            ></iframe>
          </div>
          <div q:slot="details">
            <h2 class="text-2xl font-bold mt-4">{sTore.selectedCourse.courseName}</h2>
            <p class="text-sm text-gray-600 mt-2">By {sTore.selectedCourse.teacherName}</p>
            <p class="text-sm text-gray-600 mt-1">Duration: {sTore.selectedCourse.courseDuration}</p>
            <p class="text-sm text-gray-600 mt-4">{sTore.selectedCourse.courseDetail}</p>
          </div>
        </Modal>
      )}
      <div class="w-full h-fit">
        <h1 class="text-2xl font-thin ml-8 mb-4">Trending Programming Languages</h1>
        <div class="flex flex-wrap justify-center items-center gap-4 p-4">
          {BlOg.map((blog, index) => (
            <div
              class="w-[250px] h-[150px] bg-yellow-100 p-4 rounded-xl shadow-lg flex flex-col justify-center items-center cursor-pointer"
              key={index}
            >
              <h2 class="text-lg font-semibold">{blog.name}</h2>
              <button class="w-[75px] h-[35px] bg-yellow-100 hover:bg-black hover:text-white rounded-2xl border-2 border-black border-dashed"onClick$={()=>openBlogModal(blog)}>explore</button>
            </div>
          ))}
        </div>
      </div><br></br>
      {showModal.value && blogStore.selectedBlog && (
      <div class="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
        <div class="bg-white p-8 rounded-lg shadow-xl w-[400px]">
          <h2 class="text-2xl font-bold mb-4">{blogStore.selectedBlog.name}</h2>
          <p class="text-gray-600 mb-4">{blogStore.selectedBlog.details}</p>
          <button
            class="bg-red-500 text-white px-4 py-2 rounded-lg"
            onClick$={closeModal$}
          >
            Close
          </button>
        </div>
      </div>
    )}
      <div class="w-full h-fit ">
        <h1 class="text-2xl font-thin ml-8 mb-0">
          Join With Us In WorkShop
        </h1>
        <br />

        {/* Container for the workshop info and form */}
        <div class="flex justify-between items-start mx-auto w-11/12 max-w-7xl mt-8">
          {/* Left Side - Workshop Information */}
          <div class="w-1/2 p-6">
            <h2 class="text-xl font-semibold mb-4">About the Workshop</h2>
            <p class="text-gray-600 leading-relaxed">
              Join our exclusive workshop designed to help you develop new skills, network with professionals,
              and gain hands-on experience. Whether you are a beginner or have some prior experience,
              this workshop caters to all levels.
              <br /><br />
              Our expert instructors will guide you through practical sessions on topics like web development,
              data science, and digital marketing. By the end of the workshop, you'll have completed a project and
              gained valuable insights that you can apply to real-world scenarios.
              <br /><br />
              Don’t miss out on this opportunity to enhance your career prospects and become a part of a
              community of like-minded learners!
            </p>
          </div>

          {/* Right Side - Signup Form */}
          <div class="w-1/2  p-6  rounded-lg">
            <h2 class="text-xl font-semibold mb-4">Sign Up for the Workshop</h2>


            <form class="space-y-4">

              <div>
                <label class="block text-sm font-medium text-gray-700" >Name</label>
                <input
                  type="text"
                  id="name"
                  class="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter your name"
                />
              </div>

              {/* Email Input */}
              <div>
                <label class="block text-sm font-medium text-gray-700" >Email</label>
                <input
                  type="email"
                  id="email"
                  class="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter your email"
                />
              </div>

              {/* Phone Input */}
              <div>
                <label class="block text-sm font-medium text-gray-700" >Phone</label>
                <input
                  type="tel"
                  id="phone"
                  class="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter your phone number"
                />
              </div>

              {/* Submit Button */}
              <div>
                <button
                  type="submit"
                  class="w-full bg-blue-500 text-white font-semibold py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                  Sign Up
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
});

export const head: DocumentHead = {
  title: "Educa",
  meta: [
    {
      name: "description",
      content: "Qwik site description",
    },
  ],  
};
