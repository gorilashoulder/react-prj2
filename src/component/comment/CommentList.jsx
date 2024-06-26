import { useEffect, useState } from "react";
import axios from "axios";
import { Box } from "@chakra-ui/react";
import { CommentItem } from "./CommentItem.jsx";

export function CommentList({ boardId, isSending, setIsSending }) {
  const [commentList, setCommentList] = useState([]);
  useEffect(() => {
    if (!isSending) {
      axios
        .get(`/api/comment/list/${boardId}`)
        .then((res) => {
          setCommentList(res.data);
        })
        .catch((err) => console.log(err))
        .finally(() => {});
    }
  }, [isSending]);
  if (commentList.length === 0) {
    return <Box>댓글이 없습니다.</Box>;
  }
  return (
    <Box>
      {commentList.map((comment) => (
        <CommentItem
          comment={comment}
          key={comment.id}
          isSending={isSending}
          setIsSending={setIsSending}
        />
      ))}
    </Box>
  );
}
