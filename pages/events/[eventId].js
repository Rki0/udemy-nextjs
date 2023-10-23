import EventSummary from "@/components/event-detail/event-summary";
import EventLogistics from "@/components/event-detail/event-logistics";
import EventContent from "@/components/event-detail/event-content";
import ErrorAlert from "@/components/ui/error-alert";
import { getEventById, getFeaturedEvents } from "@/helpers/api-utils";

function EventDetailPage(props) {
  const event = props.selectedEvent;

  // fallback content이므로 Error 보다는 Loading 화면을 보여주는게 좋다고 판단!
  if (!event) {
    return (
      <div className="center">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <>
      <EventSummary title={event.title} />
      <EventLogistics
        date={event.date}
        address={event.location}
        image={event.image}
        imageAlt={event.title}
      />
      <EventContent>
        <p>{event.description}</p>
      </EventContent>
    </>
  );
}

// SEO가 중요한 페이지이다. 로그인이 필요하지 않다. 매 요처엥 따라 재생성할 필요가 없다.
export async function getStaticProps(context) {
  const eventId = context.params.eventId;
  const event = await getEventById(eventId);

  return {
    props: {
      selectedEvent: event,
    },
    revalidate: 30, // 이를 추가하지 않으면 변경이 발생해도 페이지에 바로 반영되지 않는다. build하고 다시 배포해야 반영을 바로 확인할 수 있게 되므로, regenerate를 해주자. 이 페이지는 상세 정보가 업데이트되는게 중요하므로 페이지가 마지막으로 생성된지 30초가 지나면 다시 생성하도록 한다.
  };
}

// 또한 동적 페이지이므로 무엇을 pre-rendering 해야할지 알려줘야한다.
// 실무에서는 몇 백, 몇 천개의 페이지가 있으므로, 특정 페이지를 솎아내는게 중요하다. 방문율이 높은 페이지를 pre-rendering 하는게 좋을 것 같다. 이 프로젝트에서는 랜딩 페이지에서 주요 이벤트를 보여주므로 그 이벤트들을 pre-fetching하면 되겠다.
// 그런데 pre-fetching 되지 않은 페이지가 있으면 fallback : false로 설정되었을 때 그 페이지에 접속하면 404 문제가 발생하므로, fallback을 true로 설정해서 준비된 페이지보다 더 많이 fetching이 필요하게 될 것이라는 것을 알려주자.
// 혹은 fallback에 blocking을 입력해서 fallback content가 필요없게 해도 된다. 로딩이 완료될 때까지 페이지가 멈춰있으니까.
export async function getStaticPaths() {
  const events = await getFeaturedEvents();
  const paths = events.map((event) => ({ params: { eventId: event.id } }));

  return {
    paths,
    fallback: true,
  };
}

export default EventDetailPage;
