import { component$, useStore, $, useTask$ } from "@builder.io/qwik";
import { auth } from '../../firebase-config';
import { useNavigate } from '@builder.io/qwik-city';
import { signOut, onAuthStateChanged } from 'firebase/auth';
import Sidebar from "~/components/router-head/Sidebar";
export default component$(() => {
  const nav = useNavigate();
  const state = useStore<{ user: any; error: string | null; uid: string | null }>({
    user: auth.currentUser,
    error: null,
    uid: auth.currentUser?.uid || null,
  });
  const logout = $(async () => {
    try {
      state.error = null;
      await signOut(auth); // Firebase sign out function
      state.user = null; // Clear user state
      state.uid = null;
      nav('/login'); // Redirect to the login page after successful logout
    } catch (error) {
      state.error = (error as Error).message; // Handle error if sign out fails
    }
  });
  return (
    <div class="w-screen h-screen bg-gray-100 flex">
    <Sidebar></Sidebar>
      <div class="flex-1 p-6">
        <h1 class="text-2xl font-bold">Welcome to the Dashboard</h1>
        <p class="mt-4">Select an option from the sidebar to get started.</p>
        {state.error && <p class="text-red-500 mt-4">{state.error}</p>}
        <button class="w-32 h-10 bg-blue-500 text-white ml-0 mt-3" onClick$={logout}>
          Logout
        </button>
      </div>
    </div>
  );
});
