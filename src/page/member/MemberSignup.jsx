import {
  Box,
  Button,
  FormControl,
  FormHelperText,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  useToast,
} from "@chakra-ui/react";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export function MemberSignup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordCheck, setPasswordCheck] = useState("");
  const [nickName, setNickName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const toast = useToast();
  const navigate = useNavigate();

  function handleClick() {
    setIsLoading(true);
    axios
      .post("/api/member/signup", { email, password, nickName })
      .then((res) => {
        toast({
          status: "success",
          description: "회원가입완료",
          position: "top",
        });
        navigate("/");
      })
      .catch((err) => {
        if (err.response.status === 400) {
          toast({
            status: "error",
            description: "입력값을 확인해 주세요",
            position: "top",
          });
        }
        toast({
          status: "error",
          description: "회원가입 오류",
          position: "top",
        });
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  function handleCheckEmail() {
    axios
      .get(`/api/member/check?email=${email}`)
      .then((res) => {
        toast({
          status: "error",
          description: "사용할수 없는 이메일입니다",
          position: "top",
        });
      })
      .catch((err) => {
        if (err.response.status === 404) {
          toast({
            status: "success",
            description: "사용 가능한 이메일입니다",
            position: "top",
          });
        }
      })
      .finally();
  }

  function handleCheckNickName() {
    axios
      .get(`/api/member/check?nickName=${nickName}`)
      .then((res) => {
        toast({
          status: "error",
          description: "사용할수 없는 닉네임입니다",
          position: "top",
        });
      })
      .catch((err) => {
        if (err.response.status === 404) {
          toast({
            status: "success",
            description: "사용 가능한 닉네임입니다",
            position: "top",
          });
        }
      })
      .finally();
  }
  const isCheckedPassword = password === passwordCheck;
  return (
    <Box>
      <Box>회원가입</Box>
      <Box>
        <Box>
          <FormControl>
            <FormLabel>이메일</FormLabel>
            <InputGroup>
              <Input onChange={(e) => setEmail(e.target.value)} />
              <InputRightElement w={"75px"} mr={1}>
                <Button size={"sm"} onClick={handleCheckEmail}>
                  중복확인
                </Button>
              </InputRightElement>
            </InputGroup>
          </FormControl>
        </Box>
        <Box>
          <FormControl>
            <FormLabel>비밀번호</FormLabel>
            <Input onChange={(e) => setPassword(e.target.value)} />
          </FormControl>
        </Box>
        <Box>
          <FormControl>
            <FormLabel>비밀번호 확인</FormLabel>
            <Input onChange={(e) => setPasswordCheck(e.target.value)} />
            {isCheckedPassword || (
              <FormHelperText>암호가 일치하지 않습니다</FormHelperText>
            )}
          </FormControl>
        </Box>
        <Box>
          <FormControl>
            <FormLabel>닉네임</FormLabel>
            <InputGroup>
              <Input onChange={(e) => setNickName(e.target.value)} />
              <InputRightElement w={"75px"} mr={1}>
                <Button size="sm" color="blue" onClick={handleCheckNickName}>
                  중복확인
                </Button>
              </InputRightElement>
            </InputGroup>
          </FormControl>
        </Box>
        <Box>
          <Button
            isLoading={isLoading}
            colorScheme={"blue"}
            onClick={handleClick}
          >
            가입
          </Button>
        </Box>
      </Box>
    </Box>
  );
}
