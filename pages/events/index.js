import Head from "next/head";
import { useRouter } from "next/router";

import EventList from "@/components/events/event-list";
import EventSearch from "@/components/events/event-search";
import { getAllEvents } from "@/helpers/api-utils";

function AllEventsPage(props) {
  const { events } = props;
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
    <>
      <Head>
        {/* 여러 개의 Head를 병합되며, 중복되는 속성들이 있는 경우 가장 나중의 것을 사용한다. */}
        <title>All my events</title>
      </Head>
      <Head>
        <title>All Events</title>
        <meta
          name="description"
          content="Find a lot of great events that allow you to evolve"
        />
      </Head>

      <EventSearch onSearch={findEventsHandler} />
      <EventList items={events} />
    </>
  );
}

export async function getStaticProps() {
  const events = await getAllEvents();

  return {
    props: {
      events,
    },
    revalidate: 60,
  };
}

export default AllEventsPage;
