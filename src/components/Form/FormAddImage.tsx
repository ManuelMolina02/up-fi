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
      required: 'Imagem obrigatória',
    },
    title: {
      required: 'Título obrigatório',
      maxLength: {
        value: 10,
        message: 'Máximo de 10 caracteres',
      },
      minLength: {
        value: 3,
        message: 'Mínimo de 3 caracteres',
      },
    },
    description: {
      required: 'Descrição obrigatória',
      maxLength: {
        value: 30,
        message: 'Máximo de 30 caracteres',
      },
    },
  };

  const queryClient = useQueryClient();
  const mutation = useMutation(
    async (data: dataImage) => {
      const response = await api.post('/api/images', {
        ...data,
        url: imageUrl,
      });
      return response.data;
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries('images');
      },
    }
  );

  const { register, handleSubmit, reset, formState, setError, trigger } =
    useForm();
  const { errors } = formState;

  const onSubmit = async (data: dataImage): Promise<void> => {
    if (!imageUrl) {
      toast({
        title: 'Nenhuma imagem foi inserida no campo.',
        status: 'error',
        duration: 7000,
      });
      return;
    }

    try {
      await mutation.mutateAsync(data);

      toast({
        title: 'Imagem cadastrada com sucesso!',
        status: 'success',
        duration: 7000,
      });
    } catch {
      toast({
        title: 'Erro ao adicionar imagem!',
        status: 'error',
        duration: 9000,
      });
    } finally {
      setImageUrl('');
      setLocalImageUrl('');
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
          error={errors.image}
          {...register('image', formValidations.image)}
        />
        <TextInput
          placeholder="Título da imagem..."
          name="title"
          error={errors.title}
          {...register('title', formValidations.title)}
        />

        <TextInput
          placeholder="Descrição da imagem..."
          name="description"
          error={errors.description}
          {...register('description', formValidations.description)}
        />
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
