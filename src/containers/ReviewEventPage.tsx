import { withManagerAccess } from "../utils/withManagerAccess";

function ReviewEventPage(props: any) {
  console.log(props);
  // find where eventId is in props
  // check if logged in user is in the Managers group

  return <h1>review event</h1>;
}

export default withManagerAccess(ReviewEventPage);
