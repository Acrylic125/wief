import { withPageAuth } from "@supabase/auth-helpers-nextjs";
import type { GetServerSideProps, NextPage } from "next";

const Page: NextPage = () => {
  return <div>Hello</div>;
};

export default Page;

export const getServerSideProps: GetServerSideProps = withPageAuth({
  redirectTo: "/",
});
