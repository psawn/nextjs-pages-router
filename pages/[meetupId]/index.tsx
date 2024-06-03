import MeetupDetail from "@/components/meetups/MeetupDetail";
import { TMeetup } from "@/components/meetups/MeetupItem";
import { MongoClient, ObjectId } from "mongodb";
import { GetStaticPropsContext } from "next";
import Head from "next/head";

export default function MeetupDetails(props: { meetupData: TMeetup }) {
  return (
    <>
      <Head>
        <title>{props.meetupData.title}</title>
        <meta name="description" content={props.meetupData.description} />
      </Head>
      <MeetupDetail {...props.meetupData} />
    </>
  );
}

export async function getStaticPaths() {
  const client = await MongoClient.connect("mongodb://localhost:27017/meetups");

  const db = client.db();

  const meetupsCollection = db.collection("meetups");

  const meetups = await meetupsCollection.find({}, { projection: { _id: 1 } }).toArray();

  return {
    fallback: 'blocking',
    paths: meetups.map((meetup) => ({ params: { meetupId: meetup._id.toString() } })),
    // [
    //   {
    //     params: {
    //       meetupId: "m1",
    //     },
    //   },
    //   {
    //     params: {
    //       meetupId: "m2",
    //     },
    //   },
    // ],
  };
}

export async function getStaticProps(context: GetStaticPropsContext) {
  const meetupId = context.params?.meetupId?.toString()!;

  const client = await MongoClient.connect("mongodb://localhost:27017/meetups");

  const db = client.db();

  const meetupsCollection = db.collection("meetups");

  const meetup = await meetupsCollection.findOne({ _id: new ObjectId(meetupId) });

  const { _id, ...data } = meetup!;

  return {
    props: {
      meetupData: {
        id: meetupId,
        ...data,
      },
    },
  };
}
