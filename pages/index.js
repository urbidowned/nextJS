import MeetupList from "../components/meetups/MeetupList";
import {MongoClient} from 'mongodb';
import Head from "next/head";
import { Fragment } from "react";
function HomePage(props) {
  return(
  <Fragment> 
  <Head>
    <title>Title Meetups</title>
    <meta  name="destcription" content="Browse a huge list of highly active React meetups!"/>
  </Head>
  <MeetupList meetups={props.meetups} />
  </Fragment>
  );
}

// export async function getServerSideProps(context) {      // RUNS AFTER DEPLOYMENT
//     const req = context.req;
//     const res = context.res;
//    
//     return {
//         props: {
//            meetups: DUMMY_MEETIUPS
//         }
//     };
// }
export async function getStaticProps() {           //  RUNS WITH THE BUILD
  
    const client = await MongoClient.connect('mongodb+srv://urbidowned:Sossos11@myfirstmongodb.bwnnx5e.mongodb.net/?retryWrites=true&w=majority');

    const db = client.db();
    const meetupsCollection = db.collection('meetups');

    const meetups = await meetupsCollection.find().toArray();
    client.close;
    return {
    props: {
      meetups: meetups.map(meetup => ({
        title: meetup.title,
        address:meetup.address,
        image: meetup.image,
        id:meetup._id.toString(),
        
      })),
    },
    revalidate: 10,
  };
}

export default HomePage;
