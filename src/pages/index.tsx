import { Button, Box, Text } from '@chakra-ui/react';
import { useMemo } from 'react';
import { useInfiniteQuery } from 'react-query';

import { Header } from '../components/Header';
import { CardList } from '../components/CardList';
import { api } from '../services/api';
import { Loading } from '../components/Loading';
import { Error } from '../components/Error';

interface getDataProps {
  pages: any;
  pageParams: any;
}

export default function Home(): JSX.Element {
  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  const getData = ({ pageParam = 0 }) => {
    const response = api.get(`/api/images?after=${pageParam}`);
    return response;
  };

  const {
    data,
    isLoading,
    isError,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
  } = useInfiniteQuery(
    'images',
    getData,
    {
      getNextPageParam: response => {
        return response || null;
      },
    }
    // TODO GET AND RETURN NEXT PAGE PARAM
  );

  const formattedData = useMemo(() => {
    let resultData: any = [];

    if (data) {
      resultData = data.pages;

      if (resultData.length > 0) {
        resultData = resultData.map(page => {
          return page.data.data;
        });
      }

      resultData = resultData.flat();
    }

    return resultData;
  }, [data]);

  // TODO RENDER LOADING SCREEN
  if (isLoading) {
    return <Loading />;
  }

  // TODO RENDER ERROR SCREEN
  if (isError) {
    return <Error />;
  }

  return (
    <>
      <Header />

      <Box maxW={1120} px={20} mx="auto" my={20}>
        <CardList cards={formattedData} />
      </Box>
    </>
  );
}
