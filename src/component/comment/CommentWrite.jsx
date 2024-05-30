import { Box, Button, Textarea, useToast } from "@chakra-ui/react";
import { useState } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";

export function CommentWrite({ boardId, setIsSending, isSending }) {
  const [comment, setComment] = useState("");
  const toast = useToast();
  function handleCommentSubmitClick() {
    setIsSending(true);
    axios
      .post("/api/comment/add", {
        boardId,
        comment,
      })
      .then((res) => {
        setComment("");
        toast({
          description: "댓글등록완료",
          status: "success",
          position: "top",
        });
      })
      .catch((e) => {})
      .finally(() => {
        setIsSending(false);
      });
  }

  return (
    <Box>
      <Textarea
        placeholder={"댓글을 작성해 보세요"}
        value={comment}
        onChange={(e) => setComment(e.target.value)}
      />
      <Button
        isDisabled={comment.trim().length === 0}
        isLoading={isSending}
        colorScheme={"blue"}
        onClick={handleCommentSubmitClick}
      >
        <FontAwesomeIcon icon={faPaperPlane} />
      </Button>
    </Box>
  );
}
