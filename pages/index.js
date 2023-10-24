import Head from "next/head";

import EventList from "@/components/events/event-list";
import { getFeaturedEvents } from "@/helpers/api-utils";
import NewsletterRegistration from "@/components/input/newsletter-registration";

function HomePage(props) {
  const { featuredEvents } = props;

  return (
    <div>
      <Head>
        <title>NextJs Events</title>
        <meta
          name="description"
          content="Find a lot of great events that allow you to evolve"
        />
      </Head>
      <NewsletterRegistration />
      <EventList items={featuredEvents} />
    </div>
  );
}

// SEO가 중요한 페이지이다. 로그인이 필요한 페이지가 이니다. 모든 요청에 대해 재실행할 필요가 없다.
// 따라서 getStaticProps() 사용.
export async function getStaticProps() {
  const featuredEvents = await getFeaturedEvents();

  return {
    props: {
      featuredEvents,
    },
    revalidate: 1800, // 이를 추가하지 않으면 페이지를 다시 build해서 배포해야 업데이트된 상태를 얻을 수 있게된다. 30분에 한번씩 regenerate한다.
  };
}

export default HomePage;
