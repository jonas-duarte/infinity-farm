export function Icon(props: { name: string }) {
  // eslint-disable-next-line @next/next/no-img-element
  return <img src={`/icons/${props.name}.svg`} alt={props.name} />;
}
