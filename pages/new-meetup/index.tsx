import NewMeetupForm, { TMeetupData } from "@/components/meetups/NewMeetupForm";

export default function NewMeetupPage() {
  function addMeetupHandler(enterMeetupData: TMeetupData) {
    console.log(enterMeetupData);
  }

  return <NewMeetupForm onAddMeetup={addMeetupHandler} />;
}
