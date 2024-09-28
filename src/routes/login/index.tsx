import { component$, useStore, $ } from '@builder.io/qwik';
import { auth } from '../../firebase-config';
import { signInWithEmailAndPassword } from 'firebase/auth';

export default component$(() => {
  const state = useStore<{ email: string; password: string; error: string; uid: string | null }>({
    email: '',
    password: '',
    error: '',
    uid: null,
  });

  const login = $(async () => {
    try {
      state.error = '';
      const userCredential = await signInWithEmailAndPassword(auth, state.email, state.password);
      state.uid = userCredential.user.uid; // Store only the UID or other serializable data

      // Redirect to admin page if login is successful
      if (state.uid) {
        window.location.href = '/admin';
      }
    } catch (error) {
      state.error = (error as Error).message;
    }
  });

  return (
    <div class="w-full h-screen bg-gray-100 flex justify-center items-center">
      <div class="w-[700px] h-96 bg-white flex justify-center items-center shadow-md ">
        <form preventdefault:submit class="flex flex-col">
          <h1 class="text-2xl mb-6 ml-14">Login</h1>

          <input
            type="email"
            placeholder="E-mail"
            onInput$={(event) => (state.email = (event.target as HTMLInputElement).value)}
            class="w-56 h-10 mb-4 border-b-2 border-gray-300 focus:outline-none"
          />
          <input
            type="password"
            placeholder="Password"
            onInput$={(event) => (state.password = (event.target as HTMLInputElement).value)}
            class="w-56 h-10 mb-4 border-b-2 border-gray-300 focus:outline-none"
          />
          <button
            type="button"
            onClick$={login}
            class="w-48 h-10 bg-blue-500 text-white ml-4"
          >
            Login
          </button>

          {state.error && (
            <p class="text-red-500 mt-4">{state.error}</p>
          )}
        </form>
      </div>
    </div>
  );
});
