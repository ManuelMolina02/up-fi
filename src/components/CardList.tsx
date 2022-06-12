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
  const [isOpen, setIsOpen] = useState(false);
  const [selectedImageModal, setSelectedImageModal] = useState({
    url: '',
    title: '',
    description: '',
  });

  // TODO MODAL USEDISCLOSURE

  // TODO SELECTED IMAGE URL STATE
  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  function selectedImage(id) {
    setIsOpen(true);

    const imageSelected = cards.find(card => card.id === id);

    setSelectedImageModal(imageSelected);
  }

  // TODO FUNCTION HANDLE VIEW IMAGE

  return (
    <>
      {/* TODO CARD GRID */}
      <SimpleGrid columns={[1, 1, 2, 3]} spacing={8}>
        {cards.map(card => (
          <div key={card.id}>
            <Card data={card} viewImage={() => selectedImage(card.id)} />
          </div>
        ))}
      </SimpleGrid>

      {/* TODO MODALVIEWIMAGE */}
      <ModalViewImage
        imgUrl={selectedImageModal.url}
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
      />
    </>
  );
}
