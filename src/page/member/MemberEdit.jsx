import {
  Box,
  Button,
  FormControl,
  FormHelperText,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

export function MemberEdit() {
  const [member, setMember] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const { id } = useParams();
  const toast = useToast();
  const navigate = useNavigate();
  const { onClose, onOpen, isOpen } = useDisclosure();
  useEffect(() => {
    axios
      .get(`/api/member/${id}`)
      .then((res) => {
        const member1 = res.data;
        setMember({ ...member1, password: "" });
      })
      .catch(() => {
        toast({
          status: "error",
          description: "회원 정보 조회 중 문제가 발생하였습니다",
          position: "top",
        });
        navigate("/");
      });
  }, []);

  function handleClickSave() {
    axios
      .put(`/api/member/modify`, { ...member, oldPassword })
      .then((res) => {})
      .catch(() => {})
      .finally(() => {});
  }

  return (
    <Box>
      <Box>회원정보수정</Box>
      <Box>
        <Box>
          <FormControl>
            <FormLabel>이메일</FormLabel>
            <Input readOnly value={member.email} />
          </FormControl>
        </Box>
        <Box>
          <FormControl>
            <FormLabel>암호</FormLabel>
            <Input
              placeholder={"암호를 변경하려면 입력하세요"}
              onChange={(e) =>
                setMember({
                  ...member,
                  password: e.target.value,
                })
              }
            />
            <FormHelperText>
              입력하지 않으면 기존 암호를 변경하지 않습니다
            </FormHelperText>
          </FormControl>
        </Box>
        <Box>
          <FormControl>
            <FormLabel>암호확인</FormLabel>
            <Input />
          </FormControl>
        </Box>
        <Box>
          <FormControl>
            <FormLabel>별명</FormLabel>
            <Input
              value={member.nickName}
              onChange={(e) =>
                setMember({
                  ...member,
                  nickName: e.target.value,
                })
              }
            />
          </FormControl>
        </Box>
        <Box>
          <Button colorScheme={"blue"} onClick={onOpen}>
            저장
          </Button>
        </Box>
      </Box>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>기존암호확인</ModalHeader>
          <ModalBody>
            <FormControl>
              <FormLabel>기존암호</FormLabel>
              <Input onChange={(e) => setOldPassword(e.target.value)} />
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme={"red"} onClick={onClose}>
              취소
            </Button>
            <Button colorScheme={"blue"} onClick={handleClickSave}>
              확인
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
}
