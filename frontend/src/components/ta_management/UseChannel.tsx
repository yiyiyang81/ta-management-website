import React, { useEffect, useState } from "react";
import "../../style/userTable.css";
import { Container } from "react-bootstrap";
import { Post } from "../../classes/Post";
import TextArea from "../../common/TextArea";
import LabeledInput from "../../common/LabeledInput";
import Button from "../../common/Button";
import { createBackendUrl, callBackend } from "../../apiConfig";
import PostRow from "./PostRow";
import CheckIcon from "../../assets/images/check-icon.png";
import ErrorBox from "../../common/ErrorBox";

const UseChannel = (props: {
    handleAddPost: React.Dispatch<React.SetStateAction<any>>;
    handleTitle: React.Dispatch<React.SetStateAction<any>>;
    handleContent: React.Dispatch<React.SetStateAction<any>>;
    postSuccess: boolean;
    courseName: string;
    title: string;
    content: string;
    postError: boolean;

}) => {

    const [allPosts, setAllPosts] = React.useState<Array<Post>>([]);
    const [typedContent, setTypedContent] = useState("");

    const handleContentChange = (event: {
      target: { value: React.SetStateAction<string> };
    }) => {
      setTypedContent(event.target.value);
  };

    const fetchPostsData = async () => {
      try {
        const channelURL = createBackendUrl("/api/channel/create?course_number=" + props.courseName.split(" ")[0].toString());

        const creationRes = await fetch(channelURL, {
          method: "POST",
          headers: {
          "Content-Type": "application/json",
          },
          body: JSON.stringify({
          course_number: props.courseName.split(" ")[0].toString(),
          }),
        });

        const courseData = "course_number=" + props.courseName.split(" ")[0].toString();
        const url = createBackendUrl("/api/channel/allposts?" + courseData);
        const res = await callBackend(url);
        const data = await res.json();

        let coursePosts = new Array();
        data.posts.forEach(p => {
          let item = {
            author_name: p.author_name,
            title: p.title,
            content: p.content,
            time_date: p.time_date,
          }
          coursePosts.push(item);
        })

        setAllPosts(coursePosts);
            
      }  catch (err) {
          console.error(err);
      }
    };

  useEffect(() => {
    fetchPostsData();
  }, [props.courseName, props.postSuccess]);

  useEffect(() => {
    props.handleContent(typedContent);
  }, [typedContent]) 

  return (
    <div>
      <Container className="mt-3">
        <div className="mb-4">
        <h1> Discussion Channel </h1>
        Communicate with the teaching staff.
        </div>

        
        <div style={{ overflow: "scroll", height: "300px" }}>
          <table className="table table-striped">
          <thead>
            <tr>
              <th className="column0"></th>
              <th className="column1">Author</th>
              <th className="column2">Title</th>
              <th className="column3">Content</th>
              <th className="column4">Date & Time</th>
            </tr>
          </thead>
          <tbody>
            {allPosts.map((post: Post, i: number) => (
              <PostRow key={i} post={post} fetchPostsData={fetchPostsData} />
            ))}
          </tbody>
        </table>
        </div>
        
        <LabeledInput
          label="Title"
          required={true}
          type="text"
          name="title"
          id="title"
          placeholder="Give your post a title..."
          value={props.title}
          handleChange={props.handleTitle}
        ></LabeledInput>

        <TextArea
            label="Post"
            required={true}
            cols={29}
            rows={5}
            placeholder="Write your post..."
            maxLength={255}
            id="content"
            value={typedContent}
            handleChange={handleContentChange}
        ></TextArea>

        {props.postError && (
          <div className="mb-2">
            <ErrorBox errorMessage="* Please fill in all required fields."></ErrorBox>
          </div>
        )}

        <form onSubmit={props.handleAddPost}>
        <div className="rate-ta-button-container">
          <Button value="Post to Channel" type="submit-button"></Button>
        </div>
        </form>

        {props.postSuccess && (
            <div className="d-flex align-items-center mb-4">
                <img src={CheckIcon} height="20"></img>
                <div className="review-submitted-text">
                <b>Your post was saved!</b>
                </div>
            </div>
        )}
      </Container>
  
    </div>
  );
};

export default UseChannel;