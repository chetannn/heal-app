import { useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { parseCookies } from "nookies";
import { logout } from "../../services/auth";
import { useRouter } from "next/router";
import useSWR from "swr";
import api from "../../services/api";
import { getAPIClient } from "../../services/axios";
import Head from "next/head";
import AppLayout from "../../layouts/app";

export default function Dashboard({ doctors }) {
  const { user } = useContext(AuthContext);
  const router = useRouter();

  // TODO: Example of client side rendering using SWR

  // const {
  //   data: doctors,
  //   error,
  //   mutate,
  // } = useSWR(
  //   "/api/doctors",
  //   () => api.get("/api/doctors").then((res) => res.data),
  //   { revalidateOnFocus: false }
  // );

  return (
    <AppLayout>
      <h2 className=" text-2xl text-gray-600 mb-4 border-b border-b-4  border-b-blue-500">
        Hello, {user?.name} 👋🏼
      </h2>

      {doctors?.map((doctor) => {
        return (
          <div className="border shadow-md mb-4 p-3" key={doctor.id}>
            <div className="flex items-center">
              <img
                className="rounded-full object-fit"
                src="https://i.pravatar.cc/80"
              />
              <div className="ml-3">
                <h3 className="text-gray-800">
                  {doctor.first_name} {doctor.last_name}
                </h3>
                <p className="text-gray-500">{doctor.email}</p>
              </div>
            </div>
          </div>
        );
      })}
    </AppLayout>
  );
}

// TODO: Example of server side rendering using (getServerSideProps)
export const getServerSideProps = async (ctx) => {
  const { ["nextauth.token"]: token } = parseCookies(ctx);

  if (!token) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  const client = getAPIClient(ctx);

  let { data: doctors } = await client.get("/api/doctors");

  return {
    props: {
      doctors,
    },
  };
};
