import { component$, useStore } from "@builder.io/qwik";
import { routeAction$, Form, zod$, z } from "@builder.io/qwik-city";
import Sidebar from "~/components/router-head/Sidebar";
import axios from "axios";
export const useCreateProductDetails = routeAction$(async (formData) => {
    try {

        const res = await axios.post('http://localhost:3000/course', formData, {
            headers: {
                'Content-Type': 'application/json',
            },
        });
        console.log(formData)
        return {
            success: true,
            message: 'Course created successfully',
            data: res.data
        };
    } catch (error) {
        console.error('Error submitting form:', error);
        return {
            success: false,
            message: 'Failed to create course',
        };
    }
},
    zod$({
        courseName: z.string().min(1, 'Course name is required'),
        imageLink: z.string().url('Invalid URL'),
        videoLink: z.string().url('Invalid video URL'),
        courseDetail: z.string().min(10, 'Course details should be longer'),
        courseDuration: z.string().min(1, 'Duration is required'),
        teacherName: z.string().min(1, 'Teacher name is required'),
        coursePrice: z.number().positive('Price should be a positive number'),
    })
);
export default component$(() => {

    const DAtA = useStore<{
        courseName: string;
        Image: string;
        videoLink: string;
        courseDetail: string;
        courseDuration: string;
        teacherName: string;
        Price: number;
    }>({
        courseName: "",
        Image: "",
        videoLink: "",
        courseDetail: "",
        courseDuration: "",
        teacherName: "",
        Price: 0,
    });
    const acTion = useCreateProductDetails();

    return (
        <div class="w-screen h-screen bg-gray-100 flex">
            <Sidebar></Sidebar>
            <div class="flex-1 p-6">
                <h1 class="text-2xl mb-6">Create Course</h1>
                <Form action={acTion} class="space-y-4">
                    <div>
                        <input
                            type="text"
                            placeholder="Course Name"
                            class="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                            name="courseName"
                            value={DAtA.courseName}
                            onInput$={(e) => (DAtA.courseName = (e.target as HTMLInputElement).value)}
                        />
                    </div>

                    <div>
                        <input
                            type="url"
                            placeholder="Image link"
                            class="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                            name="Image"
                            value={DAtA.Image}
                            onInput$={(e) => (DAtA.Image = (e.target as HTMLInputElement).value)}
                        />
                    </div>

                    <div>
                        <input
                            type="url"
                            placeholder="Enter Video Link"
                            class="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                            name="videoLink"
                            value={DAtA.videoLink}
                            onInput$={(e) => (DAtA.videoLink = (e.target as HTMLInputElement).value)}
                        />
                    </div>

                    <div>
                        <textarea
                            rows={4}
                            placeholder="Enter Course Detail"
                            class="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                            name="courseDetail"
                            value={DAtA.courseDetail}
                            onInput$={(e) => (DAtA.courseDetail = (e.target as HTMLTextAreaElement).value)}
                        ></textarea>
                    </div>

                    <div>
                        <input
                            type="text"
                            placeholder="Enter Course Duration"
                            class="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                            name="courseDuration"
                            value={DAtA.courseDuration}
                            onInput$={(e) => (DAtA.courseDuration = (e.target as HTMLInputElement).value)}
                        />
                    </div>

                    <div>
                        <input
                            type="text"
                            placeholder="Enter Teacher Name"
                            class="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                            name="teacherName"
                            value={DAtA.teacherName}
                            onInput$={(e) => (DAtA.teacherName = (e.target as HTMLInputElement).value)}
                        />
                    </div>

                    <div>
                        <input
                            type="number"
                            placeholder="Enter Course Price"
                            class="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                            name="Price"
                            value={DAtA.Price}
                            onInput$={(e) => (DAtA.Price = parseFloat((e.target as HTMLInputElement).value))}
                        />
                    </div>

                    <button type="submit" class="w-32 h-10 bg-blue-500 text-white ml-0 mt-3">Create</button>
                </Form>

                {acTion.value?.message && (
                    <div class={acTion.value?.success ? "text-green-600" : "text-red-600"}>
                        {acTion.value.message}
                    </div>
                )}
            </div>
        </div>
    );
});
