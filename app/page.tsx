import EventCard from "@/components/EventCard";
import ExploreButton from "@/components/exploreButton";
import events from "@/lib/Constants";

const Page = () => {
  return (
    <section>
      <h1 className="text-center">
        THE HUB FOR EVERY DEVELOPER <br />
        EVENT YOU CANT MISS
      </h1>
      <p className="text-center mt-5">Hackerton, Meetup and collaboration </p>
      <ExploreButton />
      <div className="mt-20 space-y-7">
        <h3>Feature Events</h3>

        <ul className="events">
          {events.map((event) => (
            <li key={event.title} className="list-none">
              <EventCard {...event} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default Page;
