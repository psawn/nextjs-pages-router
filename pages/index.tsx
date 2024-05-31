import { TMeetup } from "@/components/meetups/MeetupItem";
import MeetupList from "@/components/meetups/MeetupList";
import {
  GetStaticProps,
  GetStaticPaths,
  GetServerSideProps,
  GetServerSidePropsContext,
} from "next";

const DUMMY_MEETUPS: TMeetup[] = [
  {
    id: "m1",
    title: "A First Meetup",
    image:
      "https://martinroll.com/wp-content/uploads/Singapore-Airlines-%E2%80%93-An-Excellent-Iconic-Asian-Brand-Martin-Roll.jpg",
    address: "Some address",
    description: "This is a first meetup!",
  },
  {
    id: "m2",
    title: "A First Meetup",
    image:
      "https://martinroll.com/wp-content/uploads/Singapore-Airlines-%E2%80%93-An-Excellent-Iconic-Asian-Brand-Martin-Roll.jpg",
    address: "Some address",
    description: "This is a first meetup!",
  },
  {
    id: "m3",
    title: "A First Meetup",
    image:
      "https://martinroll.com/wp-content/uploads/Singapore-Airlines-%E2%80%93-An-Excellent-Iconic-Asian-Brand-Martin-Roll.jpg",
    address: "Some address",
    description: "This is a first meetup!",
  },
];

export default function HomePage(props: { meetups: TMeetup[] }) {
  return (
    <>
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
  return {
    props: {
      meetups: DUMMY_MEETUPS,
    },
    revalidate: 1, // regenerate page after 1 second
  };
}
