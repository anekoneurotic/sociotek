export function chunk<T>(array: ReadonlyArray<T>, chunkSize: number) {
  const chunkCount: ArrayLike<any> = {
    length: Math.ceil(array.length / chunkSize),
  };

  return Array.from(chunkCount, (_, chunkIndex) =>
    array.slice(chunkIndex * chunkSize, chunkIndex * chunkSize + chunkSize),
  );
}
