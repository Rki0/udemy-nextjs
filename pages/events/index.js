import { getAllEvents } from "@/dummy-data";
import EventList from "@/components/events/event-list";
import EventSearch from "@/components/events/event-search";
import { useRouter } from "next/router";

function AllEventsPage() {
  const events = getAllEvents();
  const router = useRouter();

  const findEventsHandler = (year, month) => {
    router.push({
      pathname: "/events/[year]/[month]",
      query: { year, month },
    });
  };

  if (!events) {
    return <p>No events found!!</p>;
  }

  return (
    <div>
      <EventSearch onSearch={findEventsHandler} />
      <EventList items={events} />
    </div>
  );
}

export default AllEventsPage;
