import { useForm, Controller } from "react-hook-form";
import Input from "../../components/Input";
import Link from "next/link";
import Head from "next/head";
import { CheckIcon, SelectorIcon } from "@heroicons/react/solid";
import { useState, Fragment } from "react";
import InputCombobox from "../../components/InputCombobox";

export default function Register() {
  const { register, handleSubmit, control } = useForm();

  const people = [
    { id: 1, name: "Doctor" },
    { id: 2, name: "Patient" },
    { id: 3, name: "Guest" },
  ];
  const [selected, setSelected] = useState(people[0]);
  const [query, setQuery] = useState("");

  const filteredPeople =
    query === ""
      ? people
      : people.filter((person) =>
          person.name
            .toLowerCase()
            .replace(/\s+/g, "")
            .includes(query.toLowerCase().replace(/\s+/g, ""))
        );

  function handlRegister(data) {
    console.log(data);
  }

  return (
    <>
      <Head>
        <title>Register</title>
      </Head>
      <div className="h-screen flex bg-gray-50">
        <div className="w-full max-w-4xl border bg-white">
          <Link href="/">
            <h2 className="cursor-pointer text-lg text-center pt-3">
              Heal App
            </h2>
          </Link>
        </div>

        <div className="flex w-full items-center px-12">
          <div className="max-w-sm w-full bg-white shadow p-4">
            <h4 className="text-gray-700 mb-3 text-center font-semibold text-lg border-b border-b-3 border-blue-400">
              Register
            </h4>

            <form onSubmit={handleSubmit(handlRegister)}>
              <div className="mb-4">
                <label className="block text-gray-500 font-normal leading-loose text-sm uppercase mb-2">
                  Register as ?
                </label>

                <InputCombobox
                  label="user_type"
                  displayValue="name"
                  register={register}
                  options={people}
                />
              </div>

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

              <div className="mb-4">
                <label className="block text-gray-500 font-normal leading-loose text-sm uppercase mb-2">
                  Confirm Password
                </label>

                <Input
                  label="password_confirmation"
                  register={register}
                  type="password"
                />
              </div>

              <div>
                <button className="w-full bg-blue-400 rounded px-3 py-2 text-white">
                  Register
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
