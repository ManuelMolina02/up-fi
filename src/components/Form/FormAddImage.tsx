import { Box, Button, Stack, useToast } from '@chakra-ui/react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useState } from 'react';
import { useMutation, useQueryClient } from 'react-query';

import { api } from '../../services/api';
import { FileInput } from '../Input/FileInput';
import { TextInput } from '../Input/TextInput';

interface FormAddImageProps {
  closeModal: () => void;
}

type dataImage = {
  title: string;
  description: string;
  url: string;
};

export function FormAddImage({ closeModal }: FormAddImageProps): JSX.Element {
  const [imageUrl, setImageUrl] = useState('');
  const [localImageUrl, setLocalImageUrl] = useState('');

  const toast = useToast();

  const formValidations = {
    image: {
      // TODO REQUIRED, LESS THAN 10 MB AND ACCEPTED FORMATS VALIDATIONS
      required: true,
      maxLength: 10,
    },
    title: {
      // TODO REQUIRED, MIN AND MAX LENGTH VALIDATIONS
      required: true,
      minLength: 3,
      maxLength: 50,
    },
    description: {
      // TODO REQUIRED, MAX LENGTH VALIDATIONS
      required: true,
      maxLength: 500,
    },
  };

  const queryClient = useQueryClient();
  const mutation = useMutation(
    async (data: dataImage) => {
      const response = await api.post('/api/images', data);
      return response.data;
    },
    // TODO MUTATION API POST REQUEST,
    {
      // TODO ONSUCCESS MUTATION
      onSuccess: () => {
        toast({
          title: 'Image added successfully',
          status: 'success',
          duration: 9000,
        });
        closeModal();
      },
    }
  );

  const { register, handleSubmit, reset, formState, setError, trigger } =
    useForm();
  const { errors } = formState;

  const onSubmit = async (data: Record<string, unknown>): Promise<void> => {
    const dataFake = {
      url: 'https://s1.static.brasilescola.uol.com.br/be/conteudo/images/imagem-em-lente-convexa.jpg',
      title: 'titulo teste',
      description: 'descrição teste',
    };

    try {
      // TODO SHOW ERROR TOAST IF IMAGE URL DOES NOT EXISTS

      // TODO EXECUTE ASYNC MUTATION
      await mutation.mutateAsync(dataFake);
      // TODO SHOW SUCCESS TOAST
    } catch {
      toast({
        // TODO SHOW ERROR TOAST IF SUBMIT FAILED
        title: 'Erro ao adicionar imagem!',
        status: 'error',
        duration: 9000,
      });
    } finally {
      // TODO CLEAN FORM, STATES AND CLOSE MODAL
      reset();
      closeModal();
    }
  };

  return (
    <Box as="form" width="100%" onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={4}>
        <FileInput
          setImageUrl={setImageUrl}
          localImageUrl={localImageUrl}
          setLocalImageUrl={setLocalImageUrl}
          setError={setError}
          trigger={trigger}
          name="image"
        />
        <TextInput placeholder="Título da imagem..." name="title" />
        <TextInput placeholder="Descrição da imagem..." name="description" />
      </Stack>

      <Button
        my={6}
        isLoading={formState.isSubmitting}
        isDisabled={formState.isSubmitting}
        type="submit"
        w="100%"
        py={6}
      >
        Enviar
      </Button>
    </Box>
  );
}
