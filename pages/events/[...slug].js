import { useRouter } from "next/router";
import useSWR from "swr";

import EventList from "@/components/events/event-list";
import ResultsTitle from "@/components/events/results-title";
import Button from "@/components/ui/button";
import ErrorAlert from "@/components/ui/error-alert";
import { getFilteredEvents } from "@/helpers/api-utils";
import { useEffect, useState } from "react";

function FilteredEventsPage(props) {
  const [loadedEvents, setLoadedEvents] = useState();

  const router = useRouter();

  const filteredData = router.query.slug;

  const { data, error } = useSWR(
    "https://udemy-next-dc7d1-default-rtdb.firebaseio.com/events.json",
    (url) => fetch(url).then((res) => res.json())
  );

  useEffect(() => {
    if (data) {
      const events = [];

      for (const key in data) {
        events.push({
          id: key,
          ...data[key],
        });
      }

      setLoadedEvents(events);
    }
  }, [data]);

  if (!loadedEvents) {
    return <p className="center">Loading...</p>;
  }

  const filteredYear = filteredData[0];
  const filteredMonth = filteredData[1];

  const numYear = +filteredYear;
  const numMonth = +filteredMonth;

  if (
    isNaN(numYear) ||
    isNaN(numMonth) ||
    numYear > 2030 ||
    numYear < 2021 ||
    numMonth < 1 ||
    numMonth > 12 ||
    error
  ) {
    return (
      <>
        <ErrorAlert>
          <p>Invalid filter. Please adjust you values!</p>
        </ErrorAlert>
        <div className="center">
          <Button link="/events">Show All Events</Button>
        </div>
      </>
    );
  }

  // Use with getServerSideProps()
  // if (props.hasError) {
  //   return (
  //     <>
  //       <ErrorAlert>
  //         <p>Invalid filter. Please adjust you values!</p>
  //       </ErrorAlert>
  //       <div className="center">
  //         <Button link="/events">Show All Events</Button>
  //       </div>
  //     </>
  //   );
  // }

  const filtedEvents = loadedEvents.filter((event) => {
    const eventDate = new Date(event.date);
    return (
      eventDate.getFullYear() === numYear &&
      eventDate.getMonth() === numMonth - 1
    );
  });

  // const filtedEvents = props.events;

  if (!filtedEvents || filtedEvents.length === 0) {
    return (
      <>
        <ErrorAlert>
          <p>No events found for the chosen filter!</p>
        </ErrorAlert>
        <div className="center">
          <Button link="/events">Show All Events</Button>
        </div>
      </>
    );
  }

  // const date = new Date(props.date.numYear, props.date.numMonth - 1);
  const date = new Date(numYear, numMonth - 1);

  return (
    <>
      <ResultsTitle date={date} />
      <EventList items={filtedEvents} />
    </>
  );
}

// 파라미터 조합이 다양한 페이지이다. 특정 페이지를 pre-fetching 하더라도 그 양이 많을 것 같다. 따라서 요청에 대해 페이지를 반환하도록 getServerSideProps()를 사용.
// 그러나 SEO가 중요한 페이지가 아니기 때문에 굳이 pre-rendering이 아니라 client side에서 생성해도 될 것 같다. 둘은 양립 할 수 없으므로 getServerSideProps를 지운다.
// export async function getServerSideProps(context) {
//   const { params } = context;

//   const filteredData = params.slug;

//   const filteredYear = filteredData[0];
//   const filteredMonth = filteredData[1];

//   const numYear = +filteredYear;
//   const numMonth = +filteredMonth;

//   if (
//     isNaN(numYear) ||
//     isNaN(numMonth) ||
//     numYear > 2030 ||
//     numYear < 2021 ||
//     numMonth < 1 ||
//     numMonth > 12
//   ) {
//     return {
//       // 아래왁 같이 에러 핸들링도 다양한 선택지가 있다. 현재 방법은 컴포넌트에서 props를 받아 처리하도록 하는 것.
//       props: { hasError: true },
//       // notFound: true,
//       // redirect: {
//       //   destination: "/error",
//       // },
//     };
//   }

//   const filtedEvents = await getFilteredEvents({
//     year: numYear,
//     month: numMonth,
//   });

//   return {
//     props: {
//       events: filtedEvents,
//       date: {
//         year: numYear,
//         month: numMonth,
//       },
//     },
//   };
// }

export default FilteredEventsPage;
