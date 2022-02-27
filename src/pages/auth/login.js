import Head from "next/head";
import Link from "next/link";
import { useContext } from "react";
import { useForm } from "react-hook-form";
import Input from "../../components/Input";
import { AuthContext } from "../../contexts/AuthContext";

export default function Login() {
  const { register, handleSubmit } = useForm();
  const { signIn } = useContext(AuthContext);

  async function handlSignIn(data) {
    await signIn(data);
  }

  return (
    <>
    <Head>
      <title>Login</title>
    </Head>
    
    <div className="h-screen flex bg-gray-50">
      <div className="w-full max-w-4xl border bg-white">
        <Link href="/">
          <h2 className="cursor-pointer text-lg text-center pt-3">Heal App</h2>
        </Link>
      </div>

      <div className="flex w-full items-center px-12">
        <div className="max-w-sm w-full bg-white shadow p-4">

        <h4 className="text-gray-700 mb-3 text-center font-semibold text-lg border-b border-b-3 border-blue-400">
            Login
          </h4>

          <form onSubmit={handleSubmit(handlSignIn)}>
            <div className="mb-4">
              <label className="block text-gray-500 font-normal leading-loose text-sm uppercase mb-2">
                Email
              </label>

              <Input
                label="email"
                register={register}
                type="email"
                placeholder="eg. me@example.com"
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-500 font-normal leading-loose text-sm uppercase mb-2">
                Password
              </label>

              <Input label="password" register={register} type="password" />
            </div>

            <div>
              <button className="w-full bg-blue-400 rounded px-3 py-2 text-white">
                Log In
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
    </>
  );
}
