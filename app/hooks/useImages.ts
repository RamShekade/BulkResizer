import { useQuery } from "@tanstack/react-query";
import { QUERY_KEYS } from "../constants/query-keys";
import { Image } from "@/models/Image";

export function useImages() {
  const { data: images = [] } = useQuery<Image[]>({
    queryKey: QUERY_KEYS.IMAGES.ALL,
    queryFn: () => [],
    staleTime: Infinity,
  });

  return { images };
}