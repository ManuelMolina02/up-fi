import { SimpleGrid, useDisclosure } from '@chakra-ui/react';
import { useState } from 'react';
import { Card } from './Card';
import { ModalViewImage } from './Modal/ViewImage';

interface Card {
  title: string;
  description: string;
  url: string;
  ts: number;
  id: string;
}

interface CardsProps {
  cards: Card[];
}

export function CardList({ cards }: CardsProps): JSX.Element {
  const [selectedImageModal, setSelectedImageModal] = useState({
    url: '',
    title: '',
    description: '',
  });

  const { isOpen, onOpen, onClose } = useDisclosure();

  function selectedImage(id: string): void {
    onOpen();

    const imageSelected = cards.find(card => card.id === id);

    setSelectedImageModal(imageSelected);
  }

  return (
    <>
      <SimpleGrid columns={[1, 2, 3]} spacing="40px">
        {cards.map(card => (
          <div key={card.id}>
            <Card data={card} viewImage={() => selectedImage(card.id)} />
          </div>
        ))}
      </SimpleGrid>

      <ModalViewImage
        imgUrl={selectedImageModal.url}
        isOpen={isOpen}
        onClose={() => onClose()}
      />
    </>
  );
}
