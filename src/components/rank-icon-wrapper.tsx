export function RankIconWrapper({ id, ...props }: any) {
  return (
    <svg {...props} fill="none" viewBox="0 0 869 875">
      <use href={`/sprite.svg#${id}`} />
    </svg>
  );
}
