import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  useToast,
} from "@chakra-ui/react";
import { useContext, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { LoginContext } from "../../component/LoginProvider.jsx";

export function MemberLogin() {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const toast = useToast();
  const navigate = useNavigate();
  const account = useContext(LoginContext);

  function handleLogin() {
    axios
      .post("/api/member/token", { email, password })
      .then((res) => {
        account.login(res.data.token);
        toast({
          status: "success",
          description: "로그인 되었습니다.",
          position: "top",
        });
        navigate("/");
      })
      .catch(() => {
        account.logout();
        toast({
          status: "error",
          description: "로그인 실패",
          position: "top",
        });
      });
  }

  return (
    <Box>
      <Box>로그인</Box>
      <Box>
        <Box>
          <FormControl>
            <FormLabel>이메일</FormLabel>
            <Input onChange={(e) => setEmail(e.target.value)} />
          </FormControl>
        </Box>
        <Box>
          <FormControl>
            <FormLabel>패스워드</FormLabel>
            <Input onChange={(e) => setPassword(e.target.value)} />
          </FormControl>
        </Box>
        <Box>
          <Button colorScheme={"blue"} onClick={handleLogin}>
            로그인
          </Button>
        </Box>
      </Box>
    </Box>
  );
}
