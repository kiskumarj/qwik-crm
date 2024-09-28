import { component$ } from "@builder.io/qwik";
import { Link } from "@builder.io/qwik-city";

export default component$(() => {
  return (
    <div class="w-1/4 h-full bg-white shadow-xl flex flex-col p-4 ">
      <ul class="space-y-4">
        <Link href="/admin/">
          <li class="text-lg font-semibold hover:bg-slate-200 p-2 rounded">Home</li>
        </Link>
        <Link href="/admin/editcourse/">
          <li class="text-lg font-semibold hover:bg-slate-200 p-2 rounded">Edit Course</li>
        </Link>
        <Link href="/admin/createproduct/">
          <li class="text-lg font-semibold hover:bg-slate-200 p-2 rounded">Create Course</li>
        </Link>
        <li class="text-lg font-semibold hover:bg-slate-200 p-2 rounded">No.Of.Enroll</li>
      </ul>
    </div>
  )
})