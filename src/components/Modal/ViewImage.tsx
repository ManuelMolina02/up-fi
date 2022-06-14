import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  Image,
  Link,
  VStack,
} from '@chakra-ui/react';

interface ModalViewImageProps {
  isOpen: boolean;
  onClose: () => void;
  imgUrl: string;
}

export function ModalViewImage({
  isOpen,
  onClose,
  imgUrl,
}: ModalViewImageProps): JSX.Element {
  return (
    <Modal isCentered isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent bg="#353431" borderRadius="8px">
        <ModalBody p="0" m="0">
          <VStack spacing={4} alignItems="start">
            <Image
              src={imgUrl}
              alt="image"
              maxW="900px"
              maxH="600px"
              w="100%"
              objectFit="cover"
              borderRadius="8px 8px 0 0"
            />

            <Link
              href={imgUrl}
              isExternal
              mb={4}
              ps="10px"
              _focus={{ boxShadow: 'none' }}
            >
              Abrir original
            </Link>
          </VStack>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
