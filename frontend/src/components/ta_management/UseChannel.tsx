import React, { useEffect, useState } from "react";
import "../../style/userTable.css";
import { Container } from "react-bootstrap";
import { Post } from "../../classes/Post";

const UseChannel = (props: {
    termYear: string;
    courseName: string;
}) => {

    const [allPosts, setAllPosts] = React.useState<Array<Post>>([]);

    const fetchPostData = async () => {
        try {
            const courseData = "term_year=" + props.termYear +  "&course_number=" + props.courseName.split(" ")[0].toString();
            const res = await fetch("http://127.0.0.1:3000/api/channel/allposts?" + courseData);
            const data = await res.json();
            const coursePosts = new Array();

            data.posts.forEach(p => {
                coursePosts.push(p);
            });

            setAllPosts(coursePosts);
            
        }  catch (err) {
            console.error(err);
        }
    };

  useEffect(() => {
    //fetchPostData();
  }, []);

  return (
    <div>
      <Container className="mt-3">
        <h1> Discussion Channel </h1>
        Communicate with the teaching staff.
      </Container>
    </div>
  );
};

export default UseChannel;