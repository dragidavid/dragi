export default function SeparatedList({
  items = [],
  render,
  separator = ", ",
}: {
  items?: any[];
  render: (item: any) => any;
  separator?: string;
}): any {
  return items.map((item, index) => [index > 0 && separator, render(item)]);
}
