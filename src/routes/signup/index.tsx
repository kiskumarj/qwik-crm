import { component$, useStore, $ } from '@builder.io/qwik';
import { auth, db } from '../../firebase-config';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';

export default component$(() => {
  const state = useStore<{ email: string; password: string; name: string; user: { uid: string; email: string } | null; error: string }>({
    email: '',
    password: '',
    name: '',
    user: null,
    error: '',
  });

  const signUp = $(async () => {
    try {
      state.error = '';
      const userCredential = await createUserWithEmailAndPassword(auth, state.email, state.password);

      // Only store serializable parts of the user
      state.user = {
        uid: userCredential.user.uid,
        email: userCredential.user.email!,
      };

      // Save user data in Firestore
      await setDoc(doc(db, 'users', state.user.uid), {
        uid: state.user.uid,
        email: state.user.email,
        name: state.name,
      });
    } catch (error) {
      state.error = (error as Error).message;
    }
  });

  return (
    <div class="w-full h-screen bg-gray-100 flex justify-center items-center">
      {state.user ? (
        <div>
          <p>Welcome, {state.name}</p>
          <p>Your account has been created.</p>
        </div>
      ) : (
        <div class="w-[700px] h-96 bg-white flex justify-center items-center shadow-md">
          <form>
            <h1 class="text-2xl mt-3 ml-14">Create User!</h1>
            {state.error && <p style={{ color: 'red' }}>{state.error}</p>}
            <input
              type="text"
              placeholder="Username"
              onInput$={(event) => (state.name = (event.target as HTMLInputElement).value)}
              class="w-56 h-10 mt-3 border-b-2 border-gray-300 focus:outline-none"
            />
            <br />
            <input
              type="email"
              placeholder="E-mail"
              onInput$={(event) => (state.email = (event.target as HTMLInputElement).value)}
              class="w-56 h-10 mt-3 border-b-2 border-gray-300 focus:outline-none"
            />
            <br />
            <input
              type="password"
              placeholder="Password"
              onInput$={(event) => (state.password = (event.target as HTMLInputElement).value)}
              class="w-56 h-10 mt-3 border-b-2 border-gray-300 focus:outline-none"
            />
            <br />
            <button
              type="button"
              class="w-48 h-10 mt-3 bg-blue-500 text-white ml-3"
              onClick$={signUp}
            >
              Register!
            </button>
          </form>
        </div>
      )}
    </div>
  );
});
