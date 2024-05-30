import { useEffect, useState } from "react";
import axios from "axios";
import { Box, Flex, Spacer } from "@chakra-ui/react";

export function CommentList({ boardId }) {
  const [commentList, setCommentList] = useState([]);
  useEffect(() => {
    axios
      .get(`/api/comment/list/${boardId}`)
      .then(() => {
        setCommentList(res.data);
      })
      .catch(() => {})
      .finally(() => {});
  }, []);
  if (commentList.length === 0) {
    return <Box>댓글이 없습니다.</Box>;
  }
  return (
    <Box>
      {commentList.map((comment) => (
        <Box key={comment.id} border={"1px solid blakc"} my={3}>
          <Flex>
            <Box>{comment.memberId}</Box>
            <Spacer />
            <Box>{comment.inserted}</Box>
          </Flex>
          <Box>{comment.comment}</Box>
        </Box>
      ))}
    </Box>
  );
}
