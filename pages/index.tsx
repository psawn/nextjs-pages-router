import { TMeetup } from "@/components/meetups/MeetupItem";
import MeetupList from "@/components/meetups/MeetupList";
import { MongoClient } from "mongodb";
import {
  GetStaticProps,
  GetStaticPaths,
  GetServerSideProps,
  GetServerSidePropsContext,
} from "next";
import Head from "next/head";

export default function HomePage(props: { meetups: TMeetup[] }) {
  return (
    <>
      <Head>
        <title>React Meetups</title>
        <meta name="description" content="Browse a huge list of highly active React meetups!" />
      </Head>
      <MeetupList meetups={props.meetups} />
    </>
  );
}

// // pre-rendering for every request
// // use when have data that change frequently
// // use when need to access to request object (authentication example)
// export async function getServerSideProps(context: GetServerSidePropsContext) {
//   const req = context.req;
//   const res = context.res;

//   return {
//     props: {
//       meetups: DUMMY_MEETUPS,
//     },
//   };
// }

// run this function fisrt then run function component -> pre-rendering -> have fully HTML code -> good for search engine
// faster than getServerSideProps because it can cached
export async function getStaticProps() {
  const client = await MongoClient.connect("mongodb://localhost:27017/meetups");

  const db = client.db();

  const meetupsCollection = db.collection("meetups");

  const meetups = await meetupsCollection.find().toArray();

  client.close();

  return {
    props: {
      meetups: meetups.map((meetup) => {
        const { _id, ...rest } = meetup;

        return { ...rest, id: _id.toString() };
      }),
    },
    revalidate: 1, // regenerate page after 1 second
  };
}
