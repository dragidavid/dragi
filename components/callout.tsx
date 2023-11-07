import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "components/primitives/alert";

import Icon, { type Icons } from "components/visual/icon";

export default function Callout({
  title,
  children,
  icon,
  ...props
}: {
  title?: string;
  children?: React.ReactNode;
  icon?: Icons;
}) {
  return (
    <Alert {...props}>
      {icon && <Icon name={icon} size={24} />}

      {title && <AlertTitle>{title}</AlertTitle>}

      <AlertDescription>{children}</AlertDescription>
    </Alert>
  );
}
