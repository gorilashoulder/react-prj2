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
  const [isCheckedEmail, setIsCheckedEmail] = useState(false);
  const [isCheckedNickName, setIsCheckedNickName] = useState(false);
  const [isValidEmail, setIsValidEmail] = useState(false);

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
          setIsCheckedEmail(true);
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
          setIsCheckedNickName(true);
        }
      })
      .finally();
  }
  const isCheckedPassword = password === passwordCheck;
  let isDisabled = false;
  if (!isCheckedPassword) {
    isDisabled = true;
  }
  if (
    !(
      email.trim().length > 0 &&
      password.trim().length > 0 &&
      nickName.trim().length > 0
    )
  ) {
    isDisabled = true;
  }

  if (!isCheckedEmail) {
    isDisabled = true;
  }
  if (!isCheckedNickName) {
    isDisabled = true;
  }
  if (!isValidEmail) {
    isDisabled = true;
  }
  return (
    <Box>
      <Box>회원가입</Box>
      <Box>
        <Box>
          <FormControl>
            <FormLabel>이메일</FormLabel>
            <InputGroup>
              <Input
                type="email"
                onChange={(e) => {
                  setEmail(e.target.value);
                  setIsCheckedEmail(false);
                  setIsValidEmail(!e.target.validity.typeMismatch);
                }}
              />
              <InputRightElement w={"75px"} mr={1}>
                <Button
                  isDisabled={!isValidEmail || email.trim().length == 0}
                  size={"sm"}
                  onClick={handleCheckEmail}
                  color={"blue"}
                >
                  중복확인
                </Button>
              </InputRightElement>
            </InputGroup>
            {isCheckedEmail || (
              <FormHelperText>이메일 중복확인해주세요</FormHelperText>
            )}
            {isValidEmail || (
              <FormHelperText>
                올바른 이메일 형식으로 작성해주세요
              </FormHelperText>
            )}
          </FormControl>
        </Box>
        <Box>
          <FormControl>
            <FormLabel>비밀번호</FormLabel>
            <Input
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
          </FormControl>
        </Box>
        <Box>
          <FormControl>
            <FormLabel>비밀번호 확인</FormLabel>
            <Input
              onChange={(e) => {
                setPasswordCheck(e.target.value);
                setIsCheckedEmail(false);
              }}
            />
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
                <Button
                  isDisabled={nickName.trim().length == 0}
                  size="sm"
                  color="blue"
                  onClick={handleCheckNickName}
                >
                  중복확인
                </Button>
              </InputRightElement>
            </InputGroup>
            {isCheckedNickName || (
              <FormHelperText>닉네임 중복확인해주세요</FormHelperText>
            )}
          </FormControl>
        </Box>
        <Box>
          <Button
            isLoading={isLoading}
            colorScheme={"blue"}
            onClick={handleClick}
            isDisabled={isDisabled}
          >
            가입
          </Button>
        </Box>
      </Box>
    </Box>
  );
}
